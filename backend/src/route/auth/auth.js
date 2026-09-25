import { Router } from "express";
import {
  loginController,
  signUpController,
} from "../../controller/auth/auth.js";
import {
  validateEmailAndPassword,
  requireToken,
  requireAdmin,
  validateEmail,
  checkIfUserExist,
} from "../../middleware/auth-middleware.js";

export const authRouter = Router();

authRouter.post(
  "/login",
  validateEmailAndPassword,
  checkIfUserExist,
  loginController,
);
authRouter.post(
  "/sign-up",
  validateEmailAndPassword,
  validateEmail,
  signUpController,
);
