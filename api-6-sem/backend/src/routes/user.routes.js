const express = require('express');
const UserController = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/', UserController.createUser);
userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:id', UserController.getUserById);
userRouter.put('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

module.exports = userRouter;
