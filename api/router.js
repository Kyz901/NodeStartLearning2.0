const router = require('express').Router();

const userRouter = require('./users/user.router');
const authRouter = require('./auth/auth.router');

router.use('/v1/users', userRouter);
router.use('/v1/auth', authRouter);

module.exports = router;
