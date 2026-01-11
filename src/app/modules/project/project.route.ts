import { Router } from "express";
import RequestValidator from "../../middlewares/request_validator";
import { project_controller } from "./project.controller";
import { project_validations } from "./project.validation";

const project_router = Router();

project_router.post(
  "/create",
  RequestValidator(project_validations.create),
  project_controller.create_new_project
);

export default project_router;
