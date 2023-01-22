const userService = require('./user.service');
const { CREATED, OK } = require("../../configs/enums/success.codes.enum");

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers(req.query);

        res.status(OK).json(users);
    } catch (e) {
        next(e);
    }
};

const getUserById = (req, res, next) => {
    try {

        res.status(OK).json(req.internal.user);
    } catch (e) {
        next(e);
    }
};

const createUser = async (req, res, next) => {
    try {
        const newUser = await userService.createUser(req.body);

        res.status(CREATED).json(newUser);
    } catch (e) {
        next(e);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        await userService.deleteUserById(req.internal.user._id);

        res.status(OK).json("success");
    } catch (e) {
        next(e);
    }
};

const updateUserById = async (req, res, next) => {
    try {
        const updatedUser = await userService.updateUser(req.internal.user, req.body);

        res.status(OK).json(updatedUser);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUserById,
    updateUserById,
};
