/* eslint-disable no-unused-vars */
import { Response } from "express";
import jwt from "jsonwebtoken";

const signToken = (id: string) => {
    return jwt.sign(
        {
            id,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );
};

export const createAndSendToken = (
    user: any,
    statusCode: any,
    res: Response
) => {
    const token = signToken(user._id);

    user.password = undefined;

    res.status(statusCode).send({
        status: "success",
        token,
    });
};

