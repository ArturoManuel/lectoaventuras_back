import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { validateRequest } from '../../shared/middleware/validation.middleware.js';
import { authenticateToken } from '../../shared/middleware/auth.middleware.js';
import { loginSchema, registerSchema, refreshTokenSchema } from './validators/auth.validator.js';

const router = Router();
const authController = new AuthController();
router.post('/login', validateRequest(loginSchema), authController.login);
router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/refresh', validateRequest(refreshTokenSchema), authController.refreshToken);
router.post('/logout', validateRequest(refreshTokenSchema), authController.logout);
router.get('/profile', authenticateToken, authController.getProfile);

export { router as authRoutes };
