import bcrypt from "bcrypt";
import { Request } from "express";
import mongoose from "mongoose";
import { invitation } from "../../templates/invitation";
import { AppError } from "../../utils/app_error";
import sendMail from "../../utils/mail_sender";
import { Account_Model } from "../auth/auth.schema";
import { User_Model } from "../user/user.schema";
import { organization_model } from "./organization.schema";

const add_new_member_into_organization_into_db = async (req: Request) => {
  const accountId = req.user!.accountId;
  const { email, password, name } = req.body;
  // check email already exist or not
  const isEmailExist = await Account_Model.findOne({ email }).lean();
  if (isEmailExist) {
    throw new AppError("Email already exist", 400);
  }
  const session = await mongoose.startSession();

  try {
    const { organization, account } = await session.withTransaction(
      async () => {
        // 1) Find organization
        const organization = await organization_model
          .findOne({ accountId })
          .session(session)
          .lean();

        if (!organization) throw new AppError("Organization not found", 404);

        // 2) Hash password (async)
        const hashedPassword = await bcrypt.hash(password, 10);
        // 3) Create account (create() returns a doc when you pass an object)
        const account = await Account_Model.create(
          [
            {
              email,
              password: hashedPassword,
              role: "USER",
            },
          ],
          { session }
        ).then((docs) => docs[0]);

        // 4) Create profile
        const profile = await User_Model.create(
          [
            {
              name,
              accountId: account._id,
              orgAccountId: accountId,
            },
          ],
          { session }
        ).then((docs) => docs[0]);

        // 5) Link profileId -> account
        await Account_Model.updateOne(
          { _id: account._id },
          { $set: { profileId: profile._id } },
          { session }
        );

        return { organization, account };
      }
    );

    // Send email after transaction succeeds
    await sendMail({
      to: email,
      subject: `You're invited to join ${organization.organizationName} on ProjectHub`,
      textBody: `Hello, Your account has been successfully created for ${organization.organizationName} on ProjectHub.`,
      htmlBody: invitation({
        orgName: organization.organizationName as string,
        email,
        password,
        name,
      }),
    });

    return account;
  } finally {
    session.endSession();
  }
};

const get_all_organization_user_from_db = async (req: Request) => {
  const { searchTerm = "" } = req.query;
  const query: Record<string, any> = {};

  if (searchTerm) {
    query.$or = [
      { name: { $regex: searchTerm, $options: "i" } },
      { email: { $regex: searchTerm, $options: "i" } },
    ];
  }
  const accountId = req?.user?.accountId;
  const result = await User_Model.find({ orgAccountId: accountId })
    .populate("accountId", "email")
    .lean();
  return result;
};

const remove_member_from_organization_into_db = async (req: Request) => {
  const accountId = req?.user?.accountId;
  const userId = req?.params?.userId;
  const result = await User_Model.findOneAndDelete({
    accountId: userId,
    orgAccountId: accountId,
  });
  await Account_Model.findOneAndDelete({ _id: userId });
  return result;
};

export const organization_service = {
  add_new_member_into_organization_into_db,
  get_all_organization_user_from_db,
  remove_member_from_organization_into_db
};
