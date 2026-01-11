import { Types } from "mongoose";

export type TAccount = {
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "ORGANIZATION";
  profile: Types.ObjectId;
};

export interface TRegisterPayload extends TAccount {
  organizationName: string;
  organizationAdminName: string;
}

export type TLoginPayload = {
  email: string;
  password: string;
};

export type TJwtUser = {
  email: string;
  role?: "USER" | "ADMIN";
};
