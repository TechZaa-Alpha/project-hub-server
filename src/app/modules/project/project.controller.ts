import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import httpStatus from "http-status";
import { project_service } from "./project.service";

const create_new_project = catchAsync(async (req, res) => {
  const result = await project_service.create_new_project_into_db();
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New project created successfully!",
    data: result,
  });
});

export const project_controller = { create_new_project };
