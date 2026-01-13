import { NextFunction, Request, Response, Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import uploader from "../../middlewares/uploader";
import { project_validations } from "../project/project.validation";
import { user_controllers } from "./user.controller";
import { user_validations } from "./user.validation";

const userRoute = Router();

userRoute.patch(
  "/update-profile",
  auth("USER"),
  uploader.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = user_validations.update_user.parse(JSON.parse(req?.body?.data));
    user_controllers.update_profile(req, res, next);
  }
);
userRoute.get(
  "/get-overview",
  auth("USER"),
  user_controllers.get_user_overview
);
userRoute.get(
  "/get-all-project",
  auth("USER"),
  user_controllers.get_all_user_assigned_project
);
userRoute.put(
  "/update-project/:projectId",
  auth("USER"),
  RequestValidator(project_validations.create),
  user_controllers.update_assigned_user_project
);

export default userRoute;
