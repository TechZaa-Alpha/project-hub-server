import { NextFunction, Request, Response } from "express";
import { configs } from "../configs";
import { Account_Model } from "../modules/auth/auth.schema";
import { AppError } from "../utils/app_error";
import { jwtHelpers, JwtPayloadType } from "../utils/JWT";

type Role = "ADMIN" | "USER" | "ORGANIZATION";

const auth = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization || req.cookies.accessToken;
      if (!token) {
        throw new AppError("You are not authorize!!", 401);
      }
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        configs.jwt.access_token as string
      );
      if (!roles.length || !roles.includes(verifiedUser.role)) {
        throw new AppError("You are not authorize!!", 401);
      }
      // check user
      const isUserExist = await Account_Model.findOne({
        email: verifiedUser?.email,
      }).lean();
      if (!isUserExist) {
        throw new AppError("Account not found !", 404);
      }
      req.user = verifiedUser as JwtPayloadType;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
