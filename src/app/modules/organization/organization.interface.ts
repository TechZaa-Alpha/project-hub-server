import { Types } from "mongoose";

export type T_Organization = {
  organizationName: string;
  organizationAdminName: string;
  accountId: Types.ObjectId;
};
