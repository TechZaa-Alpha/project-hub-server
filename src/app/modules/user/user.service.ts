import { Request } from "express";
import uploadCloud from "../../utils/cloudinary";
import { Account_Model } from "../auth/auth.schema";
import { project_model } from "../project/project.schema";
import { User_Model } from "./user.schema";

const update_profile_into_db = async (req: Request) => {
  // upload file and get link
  if (req.file) {
    const uploadedImage = await uploadCloud(req.file);
    req.body.photo = uploadedImage?.secure_url;
  }

  const isExistUser = await Account_Model.findOne({
    email: req?.user?.email,
  }).lean();
  const result = await User_Model.findOneAndUpdate(
    { accountId: isExistUser!._id },
    req?.body
  );
  return result;
};

const get_user_overview_from_db = async (req: Request) => {
  const userAccountId = req.user!.accountId;

  const now = new Date();
  const startOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0)
  );
  const startOfNextMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0)
  );

  const result = await project_model.aggregate([
    {
      $match: {
        assignedUsers: { $in: [userAccountId] },
      },
    },
    {
      $facet: {
        thisMonthTarget: [
          {
            $match: {
              expectedDeliveryDate: {
                $gte: startOfMonth,
                $lt: startOfNextMonth,
              },
              status: { $in: ["RUNNING", "REVISION"] },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$price" },
            },
          },
        ],

        alreadyDelivered: [
          {
            $match: {
              actualDeliveryDate: {
                $gte: startOfMonth,
                $lt: startOfNextMonth,
              },
              status: "DELIVERED",
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$price" },
            },
          },
        ],
      },
    },
  ]);

  const recentDelivery = await project_model
    .find({
      assignedUsers: { $in: [userAccountId] },
      status: "DELIVERED",
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  return {
    thisMonthTarget: result[0]?.thisMonthTarget[0]?.total ?? 0,
    alreadyDelivered: result[0]?.alreadyDelivered[0]?.total ?? 0,
    needToDeliver:
      (result[0]?.thisMonthTarget[0]?.total ?? 0) -
      (result[0]?.alreadyDelivered[0]?.total ?? 0),
    recentDelivery,
  };
};

const get_all_user_assigned_project_from_db = async (req: Request) => {
  const { searchTerm = "", status = "" } = req.query;
  const accountId = req?.user?.accountId;
  const query: Record<string, any> = {};
  query.assignedUsers = { $in: [accountId] };
  if (searchTerm) {
    query.$or = [
      { projectName: { $regex: searchTerm, $options: "i" } },
      { orderId: { $regex: searchTerm, $options: "i" } },
      { profileName: { $regex: searchTerm, $options: "i" } },
    ];
  }
  if (status) {
    query.status = status;
  }
  const result = await project_model.find(query).lean();
  return result;
};

const update_assigned_user_project_into_db = async (req: Request) => {
  const accountId = req?.user!.accountId;
  const body = req?.body;
  const projectId = req?.params?.projectId;
  const result = await project_model.findOneAndUpdate(
    {
      _id: projectId,
      assignedUsers: { $in: [accountId] },
    },
    body,
    { new: true }
  );
  return result;
};

export const user_services = {
  update_profile_into_db,
  get_user_overview_from_db,
  get_all_user_assigned_project_from_db,
  update_assigned_user_project_into_db
};
