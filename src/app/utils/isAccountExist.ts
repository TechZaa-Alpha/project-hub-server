import httpStatus from "http-status";
import { Account_Model } from "../modules/auth/auth.schema";
import { AppError } from "./app_error";

export const isAccountExist = async (email: string, populateField?: string) => {
  let isExistAccount;
  if (populateField) {
    isExistAccount = await Account_Model.findOne({ email }).populate(
      populateField
    );
  } else {
    isExistAccount = await Account_Model.findOne({ email });
  }
  // check account
  if (!isExistAccount) {
    throw new AppError("Account not found!!", httpStatus.NOT_FOUND);
  }
  return isExistAccount;
};
