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

router.get('/', getAllUsers);
router.post('/', middlewares.isValidCreateData, middlewares.isEmailExist, createUser );

router.use('/:userId', middlewares.isUserExist);
router.get('/:userId', getUserById);
router.put('/:userId', middlewares.isValidUpdateData, updateUserById);
router.delete('/:userId', deleteUserById);

module.exports = router;
