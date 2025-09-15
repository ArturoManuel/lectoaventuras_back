import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validateRequest } from '../../shared/middleware/validation.middleware';
import { authenticateToken } from '../../shared/middleware/auth.middleware';
import { loginSchema, registerSchema, refreshTokenSchema } from './validators/auth.validator';

const router = Router();
const authController = new AuthController();

/**
 * @route   POST /api/auth/login
 * @desc    User login
 * @access  Public
 */
router.post('/login', validateRequest(loginSchema), authController.login);

/**
 * @route   POST /api/auth/register
 * @desc    User registration
 * @access  Public
 */
router.post('/register', validateRequest(registerSchema), authController.register);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post('/refresh', validateRequest(refreshTokenSchema), authController.refreshToken);

/**
 * @route   POST /api/auth/logout
 * @desc    User logout
 * @access  Private
 */
router.post('/logout', validateRequest(refreshTokenSchema), authController.logout);

/**
 * @route   GET /api/auth/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', authenticateToken, authController.getProfile);

export { router as authRoutes };
