import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { project_service } from "./project.service";

const save_new_project = catchAsync(async (req, res) => {
  const result = await project_service.save_new_project_into_db(req);
  manageResponse(res, {
    statusCode: 201,
    success: true,
    message: "New project saved successfully!",
    data: result,
  });
});
const get_all_project = catchAsync(async (req, res) => {
  const result = await project_service.get_all_project_from_db(req);
  manageResponse(res, {
    statusCode: 200,
    success: true,
    message: "Projects fetched successfully!",
    data: result?.data,
    meta: result?.meta,
  });
});
const get_single_project = catchAsync(async (req, res) => {
  const result = await project_service.get_single_project_from_db(req);
  manageResponse(res, {
    statusCode: 200,
    success: true,
    message: "Projects fetched successfully!",
    data: result,
  });
});
const update_project = catchAsync(async (req, res) => {
  const result = await project_service.update_project_into_db(req);
  manageResponse(res, {
    statusCode: 200,
    success: true,
    message: "Projects updated successfully!",
    data: result,
  });
});
const assigned_member_into_group = catchAsync(async (req, res) => {
  const result = await project_service.assigned_member_into_group_into_db(req);
  manageResponse(res, {
    statusCode: 200,
    success: true,
    message: "Member assigned successfully!",
    data: result,
  });
});
const remove_member_from_group = catchAsync(async (req, res) => {
  const result = await project_service.remove_member_from_group_from_db(req);
  manageResponse(res, {
    statusCode: 200,
    success: true,
    message: "Member removed successfully!",
    data: result,
  });
});
const delete_project = catchAsync(async (req, res) => {
  const result = await project_service.delete_project_from_db(req);
  manageResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project deleted successfully!",
    data: result,
  });
});

export const project_controller = {
  save_new_project,
  get_all_project,
  get_single_project,
  update_project,
  assigned_member_into_group,
  remove_member_from_group,
  delete_project,
};
