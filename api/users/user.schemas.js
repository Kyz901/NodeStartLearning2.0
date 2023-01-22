const Joi = require('joi');

const {
    EMAIL_REGEX,
    PASSWORD_REGEX,
    PHONE_NUMBER_REGEX,
    DATE_REGEX
} = require("../../configs/enums/regex.enum");
const {
    MIN_USER_DATA_LENGTH,
    MAX_USER_DATA_LENGTH,
    MIN_USER_AGE,
    MAX_USER_AGE
} = require("../../configs/constats");
const { ROLE_USER } = require("../../configs/enums/roles.enum");
const {
    ID,
    AGE,
    CREATED_AT,
    UPDATED_AT,
    FIRST_NAME,
    EMAIL,
    LAST_NAME,
    ROLE,
    PHONE_NUMBER
} = require("../../configs/enums/column.fields.enum");

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
    }).required(),
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

const getUsersSchema = {
    query: Joi.object()
        .keys({
            page: Joi.number()
                .default(1),
            limit: Joi.number()
                .default(1),
            sortBy: Joi.string()
                .valid(ID, AGE, CREATED_AT, UPDATED_AT, EMAIL, FIRST_NAME, LAST_NAME, PHONE_NUMBER, ROLE)
                .default('_id'),
            order: Joi.string()
                .valid('ASC', 'DESC')
                .default('ASC'),
            age_gte: Joi.string().alphanum(),
            age_lte: Joi.string().alphanum(),
            createdDate_gte: Joi.string().alphanum().regex(DATE_REGEX),
            createdDate_lte: Joi.string().alphanum().regex(DATE_REGEX),
            updatedDate_gte: Joi.string().alphanum().regex(DATE_REGEX),
            updatedDate_lte: Joi.string().alphanum().regex(DATE_REGEX),
            nameSearch: Joi.string().alphanum(),
        })
        .unknown(false)
        .required(),
}

module.exports = {
    getUsersSchema,
    createUserSchema,
    updateUserSchema,
};
