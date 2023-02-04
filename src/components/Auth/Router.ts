import { Router } from "express";
import { protect } from "../../services/AuthService";
import { inputValidator } from "../../utils/InputValidator";
import UserMongoRepository from "../users/repositories/UserMongoRepository";
import AuthController from "./Controller";
import AuthService from "./Service";
import { inputForgotPassword, inputLogin, inputRegister, inputResetPassword, inputUpdatePassword } from './ValidationSchema'

const UserMongoRepositoryIsctance = new UserMongoRepository();
const AuthServiceInstance = new AuthService(UserMongoRepositoryIsctance);
const AuthControllerInstance = new AuthController(AuthServiceInstance);

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