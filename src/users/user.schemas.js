const Joi = require('joi');
const { EMAIL_REGEX, PASSWORD_REGEX, PHONE_NUMBER_REGEX} = require("../../configs/regex.enum");
const {
    MIN_USER_DATA_LENGTH,
    MAX_USER_DATA_LENGTH,
    MIN_USER_AGE,
    MAX_USER_AGE
} = require("../../configs/constats");
const { ROLE_USER } = require("../../configs/roles.enum");

const createUserSchema = {
    body: Joi.object().keys({
        firstName: Joi.string()
            .alphanum()
            .min(MIN_USER_DATA_LENGTH).max(MAX_USER_DATA_LENGTH)
            .trim()
            .error(new Error("'firstName' is not valid")),
        lastName: Joi.string()
            .alphanum()
            .min(MIN_USER_DATA_LENGTH).max(MAX_USER_DATA_LENGTH)
            .trim()
            .error(new Error("'lastName' is not valid")),
        age: Joi.number()
            .integer()
            .min(MIN_USER_AGE).max(MAX_USER_AGE)
            .error(new Error("'age' is not valid")),
        role: Joi.string().valid(ROLE_USER),
        phoneNumber: Joi.string()
            .regex(PHONE_NUMBER_REGEX)
            .lowercase()
            .trim()
            .required()
            .error(new Error("'phoneNumber' is not valid")),
        email: Joi.string()
            .regex(EMAIL_REGEX)
            .lowercase()
            .trim()
            .required()
            .error(new Error("'email' is not valid")),
        password: Joi.string()
            .regex(PASSWORD_REGEX)
            .required()
            .error(new Error("'password' is not valid")),
    })
};

const updateUserSchema = {
    params: Joi.object()
        .keys({
            userId: Joi.string().alphanum().required(),
        })
        .required(),

    body: Joi.object().keys({
        firstName: Joi.string()
            .alphanum()
            .min(MIN_USER_DATA_LENGTH).max(MAX_USER_DATA_LENGTH)
            .trim()
            .error(new Error("'firstName' is not valid")),
        lastName: Joi.string()
            .alphanum()
            .min(MIN_USER_DATA_LENGTH).max(MAX_USER_DATA_LENGTH)
            .trim()
            .error(new Error("'lastName' is not valid")),
        age: Joi.number()
            .integer()
            .min(MIN_USER_AGE).max(MAX_USER_AGE)
            .error(new Error("'age' is not valid")),
        phoneNumber: Joi.string()
            .regex(PHONE_NUMBER_REGEX)
            .lowercase()
            .trim()
            .required()
            .error(new Error("'phoneNumber' is not valid")),
        password: Joi.string()
            .regex(PASSWORD_REGEX)
            .error(new Error("'password' in not valid")),
    }),
};

module.exports = {
    createUserSchema,
    updateUserSchema,
};
