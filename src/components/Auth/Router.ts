import { Router } from "express";
import { protect } from "../../services/AuthService";
import { inputValidator } from "../../utils/InputValidator";
import AuthController from "./Controller";
import { inputForgotPassword, inputLogin, inputRegister, inputResetPassword, inputUpdatePassword } from './ValidationSchema'
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
authRouter.patch(
    "/updatePassword",
    protect,
    inputValidator(inputUpdatePassword),
    AuthControllerInstance.updatePassword
);

authRouter.post("/forgot-password", inputValidator(inputForgotPassword), AuthControllerInstance.forgotPassword);
authRouter.post("/rest-password/:token", inputValidator(inputResetPassword), AuthControllerInstance.resetPassword);


export default authRouter;