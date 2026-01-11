import { Types } from "mongoose";

export type T_Project = {
  orderId: string;
  projectName: string;
  profileName: string;
  price: number;
  assignDate: Date;
  expectedDeliveryDate: Date;
  actualDeliveryDate: Date;
  status: "RUNNING" | "DELIVERED" | "CANCELED" | "REVISION";
  progress: number;
  figmaLink: string;
  frontendLiveLink: string;
  backendLiveLink: string;
  aiLiveLink: string;
  erdLink: string;
  frontendGitRepoLink: string;
  backendGitRepoLink: string;
  aiGitRepoLink: string;
  notes: string;

  // access info
  orgIdAccountId:Types.ObjectId;
  assignedUsers: Types.ObjectId[];
};
