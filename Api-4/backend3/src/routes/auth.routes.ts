import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const AuthRoutes = Router();

AuthRoutes.post('/register', AuthController.register);
AuthRoutes.post('/login', AuthController.login);

export default AuthRoutes;
