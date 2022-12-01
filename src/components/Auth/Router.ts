import { Router } from "express";
import { protect } from "../../services/AuthService";
import AuthController from "./Controller";

const AuthControllerInstance = new AuthController();
const authRouter: Router = Router();

authRouter.post("/register", AuthControllerInstance.register);
authRouter.post("/login", AuthControllerInstance.login);

authRouter.get(
    "/me",
    protect,
    AuthControllerInstance.getMe,
    AuthControllerInstance.getUser
);

export default authRouter;