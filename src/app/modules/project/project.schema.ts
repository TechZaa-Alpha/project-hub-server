import { Schema, model } from "mongoose";
import { T_Project } from "./project.interface";

const project_schema = new Schema<T_Project>(
  {
    orderId: { type: String },
    projectName: { type: String },
    profileName: { type: String },
    price: { type: Number },

    assignDate: { type: Date },
    expectedDeliveryDate: { type: Date },
    actualDeliveryDate: { type: Date },

    status: {
      type: String,
      enum: ["RUNNING", "DELIVERED", "CANCELED", "REVISION"],
    },

    progress: {
      type: Number,
      min: 0,
      max: 100,
    },

    figmaLink: { type: String },
    frontendLiveLink: { type: String },
    backendLiveLink: { type: String },
    aiLiveLink: { type: String },
    erdLink: { type: String },

    frontendGitRepoLink: { type: String },
    backendGitRepoLink: { type: String },
    aiGitRepoLink: { type: String },

    notes: { type: String },

    // access info
    orgIdAccountId: {
      type: Schema.Types.ObjectId,
      ref: "account",
    },

    assignedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "account",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const project_model = model("project", project_schema);
