import { Schema, model } from "mongoose";
import { T_Organization } from "./organization.interface";

const organization_schema = new Schema<T_Organization>({
  organizationName: { type: String, required: true },
  organizationAdminName: { type: String, required: true },
  accountId: { type: Schema.Types.ObjectId, required: true, ref: "account" },
});

export const organization_model = model("organization", organization_schema);
