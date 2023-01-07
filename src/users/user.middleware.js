const User = require('../../db/User');
const {
    NotFound,
    BadRequest,
} = require('../../errors/Errors');
const { findUserByEmail } = require('./user.service');

const isUserExist = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            throw new NotFound('User not found');
        }

        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
};

const isEmailExist = async (req, res, next) => {
    try {
        const mightBeExistedUser = await findUserByEmail(req.body.email);

        if (mightBeExistedUser[0]?.email && mightBeExistedUser[0]?.email === req.body?.email) {
            throw new BadRequest('User with this email already exists');
        }

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    isUserExist,
    isEmailExist,
};
