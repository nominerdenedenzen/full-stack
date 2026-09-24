import { Router } from "express";
import {
  loginController,
  signUpController,
} from "../../controller/auth/auth.js";

export const authRouter = Router();

authRouter.post(
  "/login",
  validateEmailAndPassword,
  checkIfUserExist,
  loginController,
);

authRouter.post(
  "/login",
  validateEmailAndPassword,
  loginController,
  validateEmailAndPassword,
);
authRouter.post("/sign-up", validateEmailAndPassword, signUpController);
