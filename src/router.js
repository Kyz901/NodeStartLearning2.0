const router = require('express').Router();

const userRouter = require('./users/user.router');

router.use('/v1/users', userRouter);

module.exports = router;
