import { z } from "zod";

const create = z.object({
  orderId: z.string().optional(),
  projectName: z.string().optional(),
  profileName: z.string().optional(),
  price: z.number().optional(),

  assignDate: z.coerce.date().optional(),
  expectedDeliveryDate: z.coerce.date().optional(),
  actualDeliveryDate: z.coerce.date().optional(),

  status: z.enum(["RUNNING", "DELIVERED", "CANCELED", "REVISION"]).optional(),

  progress: z.number().min(0).max(100).optional(),

  figmaLink: z.string().optional(),
  frontendLiveLink: z.string().optional(),
  backendLiveLink: z.string().optional(),
  aiLiveLink: z.string().optional(),
  erdLink: z.string().optional(),

  frontendGitRepoLink: z.string().optional(),
  backendGitRepoLink: z.string().optional(),
  aiGitRepoLink: z.string().optional(),

  notes: z.string().optional(),

  // access info
  orgIdAccountId: z.string().optional(),
  assignedUsers: z.array(z.string()).optional(),
});

const member = z.object({
  members: z.array(z.string()),
});

export const project_validations = { create, member };
