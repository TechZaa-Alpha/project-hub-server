import bcrypt from "bcrypt";
import { configs } from "../configs";
import { Account_Model } from "../modules/auth/auth.schema";
import { User_Model } from "../modules/user/user.schema";

export const makeDefaultAdmin = async () => {
  const isAdminExist = await Account_Model.findOne({
    role: "ADMIN"
  });
  if (isAdminExist) {
    console.log("Admin already exist!!");
    return;
  }

  const session = await Account_Model.startSession();
  session.startTransaction();
  try {
    const accountRes = await Account_Model.create(
      [
        {
          email: configs.admin.email,
          password: bcrypt.hashSync(configs.admin.password as string, 10),
          role: "ADMIN",
        },
      ],
      { session }
    );

    const profileRes = await User_Model.create(
      [
        {
          name: "Md Abumahid Islam",
          accountId: accountRes[0]._id,
          photo:
            "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
        },
      ],
      { session }
    );
    await Account_Model.findByIdAndUpdate(
      accountRes[0]._id,
      { profile: profileRes[0]._id },
      { session }
    );

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
