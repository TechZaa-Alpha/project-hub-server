import { Request } from "express";
import { Types } from "mongoose";
import { AppError } from "../../utils/app_error";
import { T_Project } from "./project.interface";
import { project_model } from "./project.schema";

const save_new_project_into_db = async (req: Request) => {
  const accountId = req?.user?.accountId as any;
  // make payload
  const payload: T_Project = req?.body;
  payload.orgIdAccountId = accountId;
  const result = await project_model.create(payload);
  return result;
};

const get_all_project_from_db = async (req: Request) => {
  const accountId = req?.user?.accountId;
  const {
    searchTerm = "",
    page = "1",
    limit = "10",
    status = "",
  } = req.query as Record<string, string>;

  const pageNumber = Math.max(Number(page), 1);
  const limitNumber = Math.max(Number(limit), 1);
  const skip = (pageNumber - 1) * limitNumber;

  const andConditions: any[] = [];

  // org based access
  if (accountId) {
    andConditions.push({
      orgIdAccountId: new Types.ObjectId(accountId),
    });
  }

  // search filter
  if (searchTerm) {
    andConditions.push({
      $or: [
        { projectName: { $regex: searchTerm, $options: "i" } },
        { orderId: { $regex: searchTerm, $options: "i" } },
        { profileName: { $regex: searchTerm, $options: "i" } },
      ],
    });
  }

  // status filter
  if (status) {
    andConditions.push({
      status,
    });
  }

  const filterCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const [result, total] = await Promise.all([
    project_model
      .find(filterCondition)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)
      .lean(),
    project_model.countDocuments(filterCondition),
  ]);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPage: Math.ceil(total / limitNumber),
    },
    data: result,
  };
};

const get_single_project_from_db = async (req: Request) => {
  const projectId = req?.params?.projectId;
  const result = await project_model.findById(projectId).lean();
  return result;
};

const update_project_into_db = async (req: Request) => {
  const accountId = req?.user?.accountId;
  const projectId = req?.params?.projectId;
  const body = req?.body;
  const result = await project_model.findOneAndUpdate(
    { orgIdAccountId: accountId, _id: projectId },
    body,
    { new: true }
  );
  return result;
};

const assigned_member_into_group_into_db = async (req: Request) => {
  const accountId = req?.user?.accountId;
  const projectId = req?.params?.projectId;
  const members = req?.body?.members;
  if (!Array.isArray(members)) {
    throw new Error("Members must be an array");
  }

  const objectIds = members.map((id) => new Types.ObjectId(id));

  const result = await project_model.findOneAndUpdate(
    {
      _id: projectId,
      orgIdAccountId: new Types.ObjectId(accountId),
    },
    {
      $set: {
        assignedUsers: objectIds,
      },
    },
    { new: true }
  );

  return result;
};

const remove_member_from_group_from_db = async (req: Request) => {
  const accountId = req?.user?.accountId;
  const projectId = req?.params?.projectId;
  const members = req?.body?.members;

  if (!Array.isArray(members) || members.length === 0) {
    throw new Error("Members must be a non-empty array");
  }

  const result = await project_model.findOneAndUpdate(
    {
      _id: projectId,
      orgIdAccountId: new Types.ObjectId(accountId),
    },
    {
      $pull: {
        assignedUsers: {
          $in: members.map((id: string) => new Types.ObjectId(id)),
        },
      },
    },
    { new: true }
  );
  return result;
};

const delete_project_from_db = async (req: Request) => {
  const accountId = req?.user?.accountId;
  const projectId = req?.params?.projectId;
  const result = await project_model.findOneAndDelete({
    _id: projectId,
    orgIdAccountId: accountId,
  });

  if (!result) {
    throw new AppError("Project not found", 404);
  }

  return result;
};

export const project_service = {
  save_new_project_into_db,
  get_all_project_from_db,
  get_single_project_from_db,
  update_project_into_db,
  assigned_member_into_group_into_db,
  remove_member_from_group_from_db,
  delete_project_from_db,
};
