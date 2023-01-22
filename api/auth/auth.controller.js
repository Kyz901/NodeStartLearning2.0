const authService = require('./auth.service');
const tokenService = require('./token.service');
const { AUTHORIZATION } = require("../../configs/constats");
const { NO_CONTENT } = require("../../configs/enums/error.codes.enum");

const loginUser = async (req, res, next) => {
    try {
        const providedUserByEmail = req.internal.user;

        await tokenService.comparePasswordsForLogin(providedUserByEmail.password, req.body.password);
        const tokenPair = await tokenService.generateAccessTokenPair({ ...providedUserByEmail._id });

        await authService.storeTokens({ ...tokenPair, user: providedUserByEmail._id });

        res.json({
            ...tokenPair,
            providedUserByEmail
        });
    } catch (e) {
        next(e);
    }
};

const logoutUser = async (req, res, next) => {
    try {
        const accessToken = req.get(AUTHORIZATION);
        await authService.deleteAuthSessionByParams({ accessToken });

        res.status(NO_CONTENT).json();
    } catch (e) {
        next(e);
    }
};

const logoutAllAuthorizedSessions = async (req, res, next) => {
    try {
        await authService.deleteAllAuthSessionsByParams({ user: req.user._id });

        res.status(NO_CONTENT).json();
    } catch (e) {
        next(e);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const user = req.user;
        const refreshToken = req.get(AUTHORIZATION);

        await authService.deleteAuthSessionByParams({ refreshToken });
        const tokenPair = await tokenService.generateAccessTokenPair({ ...user._id });
        await authService.storeTokens({ ...tokenPair, user: user._id });

        res.json({ ...tokenPair, user });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    loginUser,
    logoutUser,
    refreshToken,
    logoutAllAuthorizedSessions
};
