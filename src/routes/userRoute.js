const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/tokenMiddleware');

const userRouter = express.Router();

userRouter.post('/', userController.createUser);

userRouter.get('/:id', verifyToken, userController.getById);

userRouter.get('/', verifyToken, userController.getAll);

module.exports = userRouter;