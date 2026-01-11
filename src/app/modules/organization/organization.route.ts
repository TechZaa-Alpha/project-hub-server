import { Router } from "express";
import RequestValidator from "../../middlewares/request_validator";
import { organization_controller } from "./organization.controller";
import { organization_validations } from "./organization.validation";

const organization_router = Router();

organization_router.post(
  "/create",
  RequestValidator(organization_validations.create),
  organization_controller.create_new_organization
);

export default organization_router;
