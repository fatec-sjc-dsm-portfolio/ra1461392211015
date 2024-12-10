const express = require('express');
const AuthController = require('../controllers/authController');
const JwtMiddleware = require('../middlewares/jwt');
const authRouter = express.Router();

authRouter.post('/login', AuthController.login);
authRouter.get('/me', JwtMiddleware, AuthController.me);

module.exports = authRouter;
