import { NextFunction, Request, Response } from "express";
import { controller, httpGet, httpPatch, httpPost } from "inversify-express-utils";
import { createAndSendToken, getMe, protect } from "../../services/AuthService";
import AuthService from "./Service";
@controller('/api/v1/auth')
export default class AuthController {


    constructor(private readonly userService: AuthService) { }




    @httpGet('/me', protect(), getMe())
    public async getUser(req: Request, res: Response, next: NextFunction) {

        const result = await this.userService.getUser({ id: req.params.id })

        res.status(200).json({
            status: "success",
            data: {
                result,
            },
        });

    }

    @httpPost('/register')
    public async register(req: Request, res: Response, next: NextFunction) {

        const result = this.userService.register(req.body);
        res.status(201).json({
            status: "success",
            data: {
                user: result,
            },
        });



    }

    @httpPost('/login')
    public async login(req: Request, res: Response, next: NextFunction) {

        const user = this.userService.login(req.body);

        createAndSendToken(user, 200, res);
    }

    @httpPatch("/update-password")
    public async updatePassword(req: any, res: Response, next: NextFunction) {

        const user = this.userService.updatePassword({
            userId: req.user.id,
            passwordCurrect: req.body.passwordCurrect,
            password: req.body.password
        })

        createAndSendToken(user, 200, res);

    }



    @httpPost('/forgot-password')
    public async forgotPassword(req: Request, res: Response, next: NextFunction) {

        const sendForgotPasswordEmail = await this.userService.forgotPassword({
            email: req.body.email
        });
        res.status(200).send({
            success: true,
            message: "ایمیل فراموشی پسورد ارسال شد",
        });



    }

    @httpPost("/rest-password/:token")
    public async resetPassword(req: Request, res: Response, next: NextFunction) {

        const user = await this.userService.resetPassword({
            token: req.params.token,
            password: req.body.password
        })

        createAndSendToken(user, 200, res);


    }





}