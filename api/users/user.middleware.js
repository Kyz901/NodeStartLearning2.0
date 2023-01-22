const {
    NotFound,
    BadRequest,
} = require('../../errors/Errors');
const { findUserByParams } = require('./user.service');

const getUserByProperties = (property, reqScope, dbField = property) => async (req, res, next) => {
    try {
        const searchedField = req[reqScope][property];
        const user = await findUserByParams({ [dbField]: searchedField });

        if (!user) {
            throw new NotFound('User not found');
        }

        req.internal = { ...req.internal, user };

        next();
    } catch (e) {
        next(e);
    }
};

const isUserExistsByProperties = (property, reqScope, dbField = property) => async (req, res, next) => {
    try {
        const searchedField = req[reqScope][property];
        const user = await findUserByParams({ [dbField]: searchedField });

        if (user) {
            throw new BadRequest(`User with such ${property} already exists`);
        }

        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getUserByProperties,
    isUserExistsByProperties
};
