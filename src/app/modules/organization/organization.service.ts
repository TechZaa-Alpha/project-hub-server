import bcrypt from "bcrypt";
import { Request } from "express";
import mongoose, { Types } from "mongoose";
import { invitation } from "../../templates/invitation";
import { AppError } from "../../utils/app_error";
import sendMail from "../../utils/mail_sender";
import { Account_Model } from "../auth/auth.schema";
import { project_model } from "../project/project.schema";
import { User_Model } from "../user/user.schema";
import { organization_model } from "./organization.schema";

const add_new_member_into_organization_into_db = async (req: Request) => {
  const accountId = req.user!.accountId;
  const { email, password, name } = req.body;
  // check email already exist or not
  const isEmailExist = await Account_Model.findOne({ email }).lean();
  if (isEmailExist) {
    throw new AppError("Email already exist", 400);
  }
  const session = await mongoose.startSession();

  try {
    const { organization, account } = await session.withTransaction(
      async () => {
        // 1) Find organization
        const organization = await organization_model
          .findOne({ accountId })
          .session(session)
          .lean();

        if (!organization) throw new AppError("Organization not found", 404);

        // 2) Hash password (async)
        const hashedPassword = await bcrypt.hash(password, 10);
        // 3) Create account (create() returns a doc when you pass an object)
        const account = await Account_Model.create(
          [
            {
              email,
              password: hashedPassword,
              role: "USER",
            },
          ],
          { session }
        );

        // 4) Create profile
        const profile = await User_Model.create(
          [
            {
              name,
              accountId: account[0]._id,
              orgAccountId: accountId,
            },
          ],
          { session }
        );

        // 5) Link profileId -> account
        await Account_Model.findOneAndUpdate(
          { _id: account[0]._id },
          { profile: profile[0]._id },
          { session }
        );

        return { organization, account };
      }
    );

    // Send email after transaction succeeds
    await sendMail({
      to: email,
      subject: `You're invited to join ${organization.organizationName} on ProjectHub`,
      textBody: `Hello, Your account has been successfully created for ${organization.organizationName} on ProjectHub.`,
      htmlBody: invitation({
        orgName: organization.organizationName as string,
        email,
        password,
        name,
      }),
    });

    return account;
  } finally {
    session.endSession();
  }
};

const get_all_organization_user_from_db = async (req: Request) => {
  const { searchTerm = "" } = req.query;
  const query: Record<string, any> = {};

  if (searchTerm) {
    query.$or = [
      { name: { $regex: searchTerm, $options: "i" } },
      { email: { $regex: searchTerm, $options: "i" } },
    ];
  }
  const accountId = req?.user?.accountId;
  const result = await User_Model.find({ orgAccountId: accountId })
    .populate("accountId", "email")
    .lean();
  return result;
};

const remove_member_from_organization_into_db = async (req: Request) => {
  const accountId = req?.user?.accountId;
  const userId = req?.params?.userId;
  const result = await User_Model.findOneAndDelete({
    accountId: userId,
    orgAccountId: accountId,
  });
  await Account_Model.findOneAndDelete({ _id: userId });
  return result;
};

const get_dashboard_overview_from_db = async (req: Request) => {
  const accountId = req.user!.accountId;
  const orgObjectId = new Types.ObjectId(accountId);

  // Month range (UTC-safe)
  const now = new Date();
  const startOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0)
  );
  const startOfNextMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0)
  );

  // In parallel: user count + projects aggregation
  const [totalUsers, projectAgg] = await Promise.all([
    User_Model.countDocuments({ orgAccountId: accountId }),
    project_model.aggregate([
      {
        $match: {
          orgIdAccountId: orgObjectId,
        },
      },
      {
        $facet: {
          // Card numbers
          stats: [
            {
              $group: {
                _id: null,

                // Total projects
                totalProjects: { $sum: 1 },

                // This Month Target: sum of price for projects expected in this month
                thisMonthTarget: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          { $gte: ["$expectedDeliveryDate", startOfMonth] },
                          { $lt: ["$expectedDeliveryDate", startOfNextMonth] },
                        ],
                      },
                      "$price",
                      0,
                    ],
                  },
                },

                // Already Delivered (this month): sum of price where status DELIVERED and actualDeliveryDate within month
                alreadyDelivered: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          { $eq: ["$status", "DELIVERED"] },
                          { $gte: ["$actualDeliveryDate", startOfMonth] },
                          { $lt: ["$actualDeliveryDate", startOfNextMonth] },
                        ],
                      },
                      "$price",
                      0,
                    ],
                  },
                },

                // Need to Deliver (this month): expected this month but not delivered
                needToDeliver: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          { $ne: ["$status", "DELIVERED"] },
                          { $gte: ["$expectedDeliveryDate", startOfMonth] },
                          { $lt: ["$expectedDeliveryDate", startOfNextMonth] },
                        ],
                      },
                      "$price",
                      0,
                    ],
                  },
                },
              },
            },
          ],

          // Table: Recently Delivered Projects
          recentDeliveredProjects: [
            { $match: { status: "DELIVERED" } },
            { $sort: { actualDeliveryDate: -1, updatedAt: -1 } },
            { $limit: 10 },
            {
              $project: {
                _id: 1,
                orderId: 1,
                projectName: 1,
                expectedDeliveryDate: 1,
                actualDeliveryDate: 1,
                price: 1,
                status: 1,
              },
            },
          ],
        },
      },
    ]),
  ]);

  const stats = projectAgg?.[0]?.stats?.[0] ?? {
    totalProjects: 0,
    thisMonthTarget: 0,
    alreadyDelivered: 0,
    needToDeliver: 0,
  };

  const recentDeliveredProjects =
    projectAgg?.[0]?.recentDeliveredProjects ?? [];

  return {
    thisMonthTarget: Number(stats.thisMonthTarget || 0),
    alreadyDelivered: Number(stats.alreadyDelivered || 0),
    needToDeliver: Number(stats.needToDeliver || 0),
    totalUsers,
    totalProjects: Number(stats.totalProjects || 0),
    recentDeliveredProjects,
  };
};

const get_all_common_project_for_user_organization_from_db = async (
  req: Request
) => {
  const accountId = req?.user!.accountId;
  const role = req?.user?.role;

  let result;
  if (role === "ORGANIZATION") {
    result = await project_model
      .find({
        orgAccountId: accountId,
        status: { $in: ["RUNNING", "REVISION"] },
      })
      .lean();
  } else {
    result = await project_model
      .find({
        assignedUsers: { $in: [accountId] },
        status: { $in: ["RUNNING", "REVISION"] },
      })
      .lean();
  }
  return result;
};

export const organization_service = {
  add_new_member_into_organization_into_db,
  get_all_organization_user_from_db,
  remove_member_from_organization_into_db,
  get_dashboard_overview_from_db,
  get_all_common_project_for_user_organization_from_db
};
