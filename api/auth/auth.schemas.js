const Joi = require('joi');
const {
    EMAIL_REGEX,
} = require("../../configs/enums/regex.enum");

const loginSchema = {
    body: Joi.object().keys({
        email: Joi.string()
            .regex(EMAIL_REGEX)
            .lowercase()
            .trim()
            .error(new Error("'email' is not valid")),
        password: Joi.string()
            .error(new Error("'password' in not valid")),
    }).required(),
};

const tokenSchema = {
    headers: Joi.object().keys({
        authorization: Joi.string()
            .min(2).max(256)
            .error(new Error("Invalid token")),
    }).unknown(),
};

module.exports = {
    loginSchema,
    tokenSchema,
};
