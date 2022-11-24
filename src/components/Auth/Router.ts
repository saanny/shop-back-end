import { NextFunction, Request, Response, Router } from "express";
import AuthController from "./Controller";

const AuthControllerInstance = new AuthController();
const authRouter: Router = Router();

authRouter.post("/register", AuthControllerInstance.register);
authRouter.post("/login", AuthControllerInstance.login);

export default authRouter;