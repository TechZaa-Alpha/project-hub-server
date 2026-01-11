import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import httpStatus from "http-status";
import { organization_service } from "./organization.service";

const create_new_organization = catchAsync(async (req, res) => {
  const result = await organization_service.create_new_organization_into_db();
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New organization created successfully!",
    data: result,
  });
});

export const organization_controller = { create_new_organization };
