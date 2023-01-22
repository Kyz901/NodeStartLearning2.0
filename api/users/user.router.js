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
const { updateUserSchema, createUserSchema, getUsersSchema } = require("./user.schemas");
const { validate } = require("../../validation/validation");
const { EMAIL, ID, ACCESS_TOKEN} = require("../../configs/enums/column.fields.enum");
const { validateTokenByScope } = require("../auth/auth.middlewares");

router.get('/',
    validate(getUsersSchema),
    getAllUsers
);
router.post('/',
    validate(createUserSchema),
    middlewares.isUserExistsByProperties(EMAIL, 'body'),
    createUser
);

router.use('/:userId',
    validateTokenByScope(ACCESS_TOKEN),
    middlewares.getUserByProperties('userId', 'params', ID)
);
router.get('/:userId', getUserById);
router.put('/:userId',
    validate(updateUserSchema),
    middlewares.isUserExistsByProperties(EMAIL, 'body'),
    updateUserById
);
router.delete('/:userId', deleteUserById);

module.exports = router;
