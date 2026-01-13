import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import { organization_controller } from "./organization.controller";
import { organization_validations } from "./organization.validation";

const organization_router = Router();

organization_router.put(
  "/add-member",
  auth("ORGANIZATION"),
  RequestValidator(organization_validations.create),
  organization_controller.add_new_member_into_organization
);
organization_router.get(
  "/get-member",
  auth("ORGANIZATION"),
  organization_controller.get_all_organization_user
);
organization_router.delete(
  "/remove-member/:userId",
  auth("ORGANIZATION"),
  organization_controller.remove_member_from_organization
);

export default organization_router;
