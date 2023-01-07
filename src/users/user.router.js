const express = require('express');
const {
    getAllUsers,
    getUserById,
    updateUserById,
    createUser,
    deleteUserById,
} = require('./user.controller');
const router = express.Router();
const middlewares = require('../users/user.middleware');
const { updateUserSchema, createUserSchema } = require("./user.schemas");
const { validate } = require("../../validation/validation");

router.get('/', getAllUsers);
router.post('/', validate(createUserSchema), middlewares.isEmailExist, createUser);

router.use('/:userId', middlewares.isUserExist);
router.get('/:userId', getUserById);
router.put('/:userId', validate(updateUserSchema), updateUserById);
router.delete('/:userId', deleteUserById);

module.exports = router;
