const { AUTHORIZATION } = require("../../configs/constats");
const { Unauthorized } = require("../../errors/Errors");
const { getUserByParams } = require("./auth.service");
const { ACCESS_TOKEN } = require("../../configs/enums/column.fields.enum");
const { validateToken } = require("./token.service");

const validateTokenByScope = (scope = ACCESS_TOKEN) => async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);

        if (!token) {
            throw new Unauthorized('Token wasn`t provided!');
        }

        await validateToken(token, scope);
        const tokenWithUser = await getUserByParams({ [scope]: token });

        if (!tokenWithUser) {
            throw new Unauthorized('Invalid token!');
        }

        req.user = tokenWithUser.user;
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    validateTokenByScope
};
