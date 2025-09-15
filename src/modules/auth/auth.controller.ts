import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service.js';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto/auth.dto.js';
import { ApiResponse } from '../../shared/interfaces/api-response.interface.js';
import { logger } from '../../shared/utils/logger.js';
import { AppError } from '../../shared/utils/app-error.js';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * User login
   */
  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const loginData: LoginDto = req.body;
      const result = await this.authService.login(loginData);
      
      const response: ApiResponse = {
        success: true,
        message: 'Login successful',
        data: result
      };
      
      res.status(200).json(response);
      logger.info(`User logged in: ${loginData.email}`);
    } catch (error) {
      next(error);
    }
  };

  /**
   * User registration
   */
  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const registerData: RegisterDto = req.body;
      const result = await this.authService.register(registerData);
      
      const response: ApiResponse = {
        success: true,
        message: 'User registered successfully',
        data: result
      };
      
      res.status(201).json(response);
      logger.info(`New user registered: ${registerData.email}`);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Refresh token
   */
  refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.body as RefreshTokenDto;
      const result = await this.authService.refreshToken(refreshToken);
      
      const response: ApiResponse = {
        success: true,
        message: 'Token refreshed successfully',
        data: result
      };
      
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * User logout
   */
  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      await this.authService.logout(refreshToken);
      
      const response: ApiResponse = {
        success: true,
        message: 'Logout successful'
      };
      
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get current user profile
   */
  getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('Not authenticated', 401);
      }
      const result = await this.authService.getProfile(userId);
      
      const response: ApiResponse = {
        success: true,
        message: 'Profile retrieved successfully',
        data: result
      };
      
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
