import httpStatus from "http-status";
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { organization_service } from "./organization.service";

const add_new_member_into_organization = catchAsync(async (req, res) => {
  const result =
    await organization_service.add_new_member_into_organization_into_db(req);
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member added successfully!",
    data: result,
  });
});
const get_all_organization_user = catchAsync(async (req, res) => {
  const result = await organization_service.get_all_organization_user_from_db(
    req
  );
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member fetched successfully!",
    data: result,
  });
});
const remove_member_from_organization = catchAsync(async (req, res) => {
  const result = await organization_service.remove_member_from_organization_into_db(
    req
  );
  manageResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member removed successfully!",
    data: result,
  });
});

export const organization_controller = {
  add_new_member_into_organization,
  get_all_organization_user,
  remove_member_from_organization
};
