const simplecrypt = require('simplecrypt');
const crypto = simplecrypt();
const jwt = require('jsonwebtoken');

const { BadRequest, Unauthorized } = require("../../errors/Errors");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION} = require("../../configs/config");
const { ACCESS_TOKEN } = require("../../configs/enums/column.fields.enum");

// todo: fix bcrypt install problem
const hashPassword = (password) => crypto.encrypt(password);

const comparePasswordsForLogin = async (currentPass, inputPass) => {

    // todo: crypto problem is after restart of service it could return different hash for input pass
    const isPasswordsEquals = inputPass === currentPass;

    if (!isPasswordsEquals) {
        throw new BadRequest('Email or password is wrong');
    }
};

const generateAccessTokenPair = async (encodeData) => {
    const accessToken = jwt.sign(encodeData, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
    const refreshToken = jwt.sign(encodeData, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });

    return {
        accessToken,
        refreshToken
    };
};

const validateToken = async (token = '', tokenType) => {
    try {

        return jwt.verify(
            token,
            tokenType === ACCESS_TOKEN ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET
        );
    } catch (e) {
        throw new Unauthorized(e.message || 'Invalid token');
    }
};

module.exports = {
    hashPassword,
    comparePasswordsForLogin,
    generateAccessTokenPair,
    validateToken,
};
