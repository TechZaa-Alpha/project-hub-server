import bcrypt from "bcrypt";
import { Request } from "express";
import httpStatus from "http-status";
import { JwtPayload, Secret } from "jsonwebtoken";
import mongoose from "mongoose";
import { configs } from "../../configs";
import { welcome } from "../../templates/welcom";
import { AppError } from "../../utils/app_error";
import { isAccountExist } from "../../utils/isAccountExist";
import { jwtHelpers } from "../../utils/JWT";
import sendMail from "../../utils/mail_sender";
import { T_Organization } from "../organization/organization.interface";
import { organization_model } from "../organization/organization.schema";
import { User_Model } from "../user/user.schema";
import { TAccount, TLoginPayload, TRegisterPayload } from "./auth.interface";
import { Account_Model } from "./auth.schema";
// register user
const register_user_into_db = async (payload: TRegisterPayload) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Check if the account already exists
    const isExistAccount = await Account_Model.findOne(
      { email: payload?.email },
      null,
      { session }
    );
    if (isExistAccount) {
      throw new AppError("Organization already exists", httpStatus.BAD_REQUEST);
    }

    // Hash the password
    const hashPassword = bcrypt.hashSync(payload?.password, 10);

    // Create account
    const accountPayload: Partial<TAccount> = {
      email: payload.email,
      password: hashPassword,
      role: "ORGANIZATION",
    };
    const newAccount = await Account_Model.create([accountPayload], {
      session,
    });

    // Create user
    const organizationPayload: Partial<T_Organization> = {
      organizationName: payload?.organizationName,
      organizationAdminName: payload?.organizationAdminName,
      accountId: newAccount[0]._id,
    };
    const profileRes = await organization_model.create([organizationPayload], {
      session,
    });
    await Account_Model.findByIdAndUpdate(
      newAccount[0]._id,
      {
        profile: profileRes[0]._id,
      },
      { session }
    );
    await session.commitTransaction();
    await sendMail({
      to: payload.email,
      subject: "Account created successfully!",
      textBody: "Your account is successfully created.",
      htmlBody: welcome(
        `${payload?.organizationName} (${payload?.organizationAdminName})`
      ),
    });
    return newAccount;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

// login user
const login_user_from_db = async (payload: TLoginPayload) => {
  // check account info
  const isExistAccount = await isAccountExist(payload?.email);

  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    isExistAccount.password
  );
  if (!isPasswordMatch) {
    throw new AppError("Invalid password", httpStatus.UNAUTHORIZED);
  }
  const accessToken = jwtHelpers.generateToken(
    {
      email: isExistAccount.email,
      role: isExistAccount.role,
    },
    configs.jwt.access_token as Secret,
    configs.jwt.access_expires as string
  );

  return {
    accessToken: accessToken,
    role: isExistAccount.role,
  };
};

const get_my_profile_from_db = async (req: Request) => {
  const email = req?.user?.email;
  const role = req?.user?.role;
  const isExistAccount = await isAccountExist(email as string);
  let accountProfile;
  if (role === "ORGANIZATION") {
    accountProfile = await organization_model.findById(isExistAccount.profile);
  }
  if (role === "USER" || role === "ADMIN") {
    accountProfile = await User_Model.findById(isExistAccount.profile);
  }
  isExistAccount.password = "";
  return {
    account: isExistAccount,
    profile: accountProfile,
  };
};

const change_password_from_db = async (
  user: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  }
) => {
  const isExistAccount = await isAccountExist(user?.email);

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    isExistAccount.password
  );

  if (!isCorrectPassword) {
    throw new AppError("Old password is incorrect", httpStatus.UNAUTHORIZED);
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 10);
  await Account_Model.findOneAndUpdate(
    { email: isExistAccount.email },
    {
      password: hashedPassword,
      lastPasswordChange: Date(),
    }
  );
  return "Password changed successful.";
};

const forget_password_from_db = async (email: string) => {
  const isAccountExists = await isAccountExist(email);
  const resetToken = jwtHelpers.generateToken(
    {
      email: isAccountExists.email,
      role: isAccountExists.role,
    },
    configs.jwt.reset_secret as Secret,
    configs.jwt.reset_expires as string
  );

  const resetPasswordLink = `${configs.jwt.front_end_url}/reset?token=${resetToken}&email=${isAccountExists.email}`;
  const emailTemplate = `<p>Click the link below to reset your password:</p><a href="${resetPasswordLink}">Reset Password</a>`;

  await sendMail({
    to: email,
    subject: "Password reset successful!",
    textBody: "Your password is successfully reset.",
    htmlBody: emailTemplate,
  });

  return "Check your email for reset link";
};

const reset_password_into_db = async (
  token: string,
  email: string,
  newPassword: string
) => {
  let decodedData: JwtPayload;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      configs.jwt.reset_secret as Secret
    );
  } catch (err) {
    throw new AppError(
      "Your reset link is expire. Submit new link request!!",
      httpStatus.UNAUTHORIZED
    );
  }

  const isAccountExists = await isAccountExist(email);

  const hashedPassword: string = await bcrypt.hash(newPassword, 10);

  await Account_Model.findOneAndUpdate(
    { email: isAccountExists.email },
    {
      password: hashedPassword,
      lastPasswordChange: Date(),
    }
  );
  return "Password reset successfully!";
};

export const auth_services = {
  register_user_into_db,
  login_user_from_db,
  get_my_profile_from_db,
  change_password_from_db,
  forget_password_from_db,
  reset_password_into_db,
};
