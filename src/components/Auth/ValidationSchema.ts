import Joi from "joi";

const inputRegister = {
    body: {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).required()
    },
};

const inputLogin = {
    body: {
        email: Joi.string().required(),
        password: Joi.string().min(8).required()
    },
};

const inputResetPassword = {
    params: {
        token: Joi.string().required(),
    },
};
const inputUpdatePassword = {
    body: {
        currentPassword: Joi.string().min(8).required(),
        password: Joi.string().min(8).required(),
    },
};
const inputForgotPassword = {
    body: {
        email: Joi.string().required(),
    },
};
export {
    inputLogin,
    inputRegister,
    inputResetPassword,
    inputUpdatePassword,
    inputForgotPassword
}