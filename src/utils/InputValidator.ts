import { pick } from "./Pick";
import Joi from 'joi';
import { BAD_REQUEST } from "./StatusCodes";
import { NextFunction, Request, Response } from "express";

export const inputValidator = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: "key" } })
        .validate(object);

    if (error) {
        let errorMessage = "";
        for (const err of error.details) {
            errorMessage += " [ " + err.path.join(" > ") + err.message.slice(err.message.lastIndexOf('"') + 1) + " ] ";
        }
        return res.status(BAD_REQUEST.code).json({
            status: BAD_REQUEST.status,
            statusCode: BAD_REQUEST.code,
            message: null,
            error: errorMessage,
        });
    }
    Object.assign(req, value);
    return next();
};