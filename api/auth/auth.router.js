const authRouter = require('express').Router();

const { validate } = require("../../validation/validation");
const { loginUser, logoutUser, refreshToken, logoutAllAuthorizedSessions } = require("./auth.controller");
const { loginSchema, tokenSchema } = require("./auth.schemas");
const { getUserByProperties } = require("../users/user.middleware");
const { validateTokenByScope } = require("./auth.middlewares");
const { ACCESS_TOKEN, REFRESH_TOKEN } = require("../../configs/enums/column.fields.enum");

authRouter.post('/',
    validate(loginSchema),
    getUserByProperties('email', 'body'),
    loginUser
);
authRouter.post('/logout',
    validate(tokenSchema),
    validateTokenByScope(ACCESS_TOKEN),
    logoutUser
);
authRouter.post('/disable-all-sessions',
    validate(tokenSchema),
    validateTokenByScope(ACCESS_TOKEN),
    logoutAllAuthorizedSessions
);
authRouter.post('/refresh',
    validate(tokenSchema),
    validateTokenByScope(REFRESH_TOKEN),
    refreshToken
);

module.exports = authRouter;
