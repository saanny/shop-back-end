import { Router } from "express";
import { protect } from "../../services/AuthService";
import { inputValidator } from "../../utils/InputValidator";
import AuthController from "./Controller";
import { inputLogin, inputRegister } from './ValidationSchema'
const AuthControllerInstance = new AuthController();
const authRouter: Router = Router();

authRouter.post("/register", inputValidator(inputRegister), AuthControllerInstance.register);
authRouter.post("/login", inputValidator(inputLogin), AuthControllerInstance.login);

authRouter.get(
    "/me",
    protect,
    AuthControllerInstance.getMe,
    AuthControllerInstance.getUser
);

export default authRouter;