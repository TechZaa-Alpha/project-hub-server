import { model, Schema } from "mongoose";
import { TAccount } from "./auth.interface";

const authSchema = new Schema<TAccount>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "USER" },
    profile: { type: Schema.Types.ObjectId },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Account_Model = model("account", authSchema);
