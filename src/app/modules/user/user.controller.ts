import httpStatus from "http-status";
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { user_services } from "./user.service";

const update_profile = catchAsync(async (req, res) => {
  const result = await user_services.update_profile_into_db(req);
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile update successful.",
    data: result,
  });
});
const get_user_overview = catchAsync(async (req, res) => {
  const result = await user_services.get_user_overview_from_db(req);
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Overview fetched successful.",
    data: result,
  });
});
const get_all_user_assigned_project = catchAsync(async (req, res) => {
  const result = await user_services.get_all_user_assigned_project_from_db(req);
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Projects fetched successful.",
    data: result,
  });
});
const update_assigned_user_project = catchAsync(async (req, res) => {
  const result = await user_services.update_assigned_user_project_into_db(req);
  manageResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Projects update successful.",
    data: result,
  });
});

export const user_controllers = {
  update_profile,
  get_user_overview,
  get_all_user_assigned_project,
  update_assigned_user_project
};
