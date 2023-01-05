const User = require('../../db/User');
const {
    NotFound,
    BadRequest,
} = require('../../errors/Errors');
const { findUserByEmail } = require('./user.service');
const {
    MIN_USER_DATA_LENGTH,
    MIN_PASS_LENGTH,
    MAX_USER_DATA_LENGTH, MIN_USER_AGE, MAX_USER_AGE,
} = require("../../configs/constats");

const isPresentDataValid = (body) => {
    if (body?.age && (body?.age <= MIN_USER_AGE || body?.age >= MAX_USER_AGE)) {
        throw new BadRequest('Age is not valid');
    }
    if (body?.firstName?.length <= MIN_USER_DATA_LENGTH || body?.firstName?.length >= MAX_USER_DATA_LENGTH) {
        throw new BadRequest('First name is not valid');
    }
    if (body?.lastName?.length <= MIN_USER_DATA_LENGTH || body?.lastName?.length >= MAX_USER_DATA_LENGTH) {
        throw new BadRequest('Last name is not valid');
    }
    if (body?.email?.length <= MIN_USER_DATA_LENGTH) {
        throw new BadRequest('Email is not valid');
    }
    if (body?.password?.length <= MIN_PASS_LENGTH) {
        throw new BadRequest('Password should be more than ' + MIN_PASS_LENGTH + 'symbols');
    }
}

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

const isValidCreateData = (req, res, next) => {
    try {
        if(!req.body) {
            throw new BadRequest('Body is empty');
        }
        if(!req.body.email) {
            throw new BadRequest('Email is required');
        }
        if(!req.body.password) {
            throw new BadRequest('Password is required');
        }
        isPresentDataValid(req.body);

        next();
    } catch (e) {
        next(e);
    }
};

const isValidUpdateData = (req, res, next) => {
    try {
        isPresentDataValid(req.body);

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    isUserExist,
    isEmailExist,
    isValidCreateData,
    isValidUpdateData,
};
