import { z } from "zod";

const create = z.object({
  name: z.string({ message: "Name is required" }),
  email: z.string({ message: "Email is required" }).email(),
  password: z.string({ message: "Password is required" }),
});

export const organization_validations = { create };
