import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import { project_controller } from "./project.controller";
import { project_validations } from "./project.validation";

const project_router = Router();

project_router.post(
  "/save-project",
  auth("ORGANIZATION"),
  RequestValidator(project_validations.create),
  project_controller.save_new_project
);
project_router.get(
  "/get-project",
  auth("ORGANIZATION"),
  project_controller.get_all_project
);
project_router.get(
  "/get-project/:projectId",
  auth("ORGANIZATION"),
  project_controller.get_single_project
);
project_router.put(
  "/update-project/:projectId",
  auth("ORGANIZATION"),
  RequestValidator(project_validations.create),
  project_controller.update_project
);
project_router.put(
  "/assign-member/:projectId",
  auth("ORGANIZATION"),
  RequestValidator(project_validations.member),
  project_controller.assigned_member_into_group
);
project_router.put(
  "/remove-member/:projectId",
  auth("ORGANIZATION"),
  RequestValidator(project_validations.member),
  project_controller.remove_member_from_group
);
project_router.delete(
  "/delete-project/:projectId",
  auth("ORGANIZATION"),
  project_controller.delete_project
);

export default project_router;
