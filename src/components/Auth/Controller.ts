import { NextFunction, Request, Response } from "express";
import { createAndSendToken } from "../../services/AuthService";
import catchAsync from "../../utils/catchAsync";
import AuthService from "./Service";
export default class AuthController {


    constructor(private readonly userService: AuthService) { }

    public getMe = (req: any, res: Response, next: NextFunction) => {
        req.params.id = req.user.id;
        next();
    };

    public getUser = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {

            const result = await this.userService.getUser({ id: req.params.id })

            res.status(200).json({
                status: "success",
                data: {
                    result,
                },
            });


        }
    );

    public register = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {

            const result = this.userService.register(req.body);
            res.status(201).json({
                status: "success",
                data: {
                    user: result,
                },
            });


        }
    );

    public login = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {

            const user = this.userService.login(req.body);

            createAndSendToken(user, 200, res);

        }
    );

    public updatePassword = catchAsync(
        async (req: any, res: Response, next: NextFunction) => {

            const user = this.userService.updatePassword({
                userId: req.user.id,
                passwordCurrect: req.body.passwordCurrect,
                password: req.body.password
            })

            createAndSendToken(user, 200, res);

        }
    );

    public forgotPassword = catchAsync(async (req: any, res: Response, next: NextFunction) => {

        const sendForgotPasswordEmail = await this.userService.forgotPassword({
            email: req.body.email
        });
        res.status(200).send({
            success: true,
            message: "ایمیل فراموشی پسورد ارسال شد",
        });


    });

    public resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


        const user = await this.userService.resetPassword({
            token: req.params.token,
            password: req.body.password
        })

        createAndSendToken(user, 200, res);

    });





}