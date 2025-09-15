import bcrypt from 'bcrypt';
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import { User } from './models/user.model.js';
import { LoginDto, RegisterDto } from './dto/auth.dto.js';
import { AuthResponse, RefreshTokenPayload } from './interfaces/auth.interface.js';
import { AppError } from '../../shared/utils/app-error.js';
import { logger } from '../../shared/utils/logger.js';

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
  private readonly JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
  private readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
  private readonly JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

  /**
   * User login
   */
  async login(loginData: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginData;

    // TODO: Replace with actual database query
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    // Generate tokens
    const tokens = this.generateTokens(user);

    // TODO: Save refresh token to database
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    const { password: _ignoredPassword, ...userProfile } = user;

    return {
      user: userProfile,
      ...tokens
    };
  }

  /**
   * User registration
   */
  async register(registerData: RegisterDto): Promise<AuthResponse> {
    const { email, password, firstName, lastName, role } = registerData;

    // Check if user already exists
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new AppError('User already exists with this email', 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // TODO: Replace with actual database creation
    const newUser = await this.createUser({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: role || 'student'
    });

    // Generate tokens
    const tokens = this.generateTokens(newUser);

    // TODO: Save refresh token to database
    await this.saveRefreshToken(newUser.id, tokens.refreshToken);

    const { password: _ignoredPassword2, ...newUserProfile } = newUser;

    return {
      user: newUserProfile,
      ...tokens
    };
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const decoded = jwt.verify(refreshToken, this.JWT_REFRESH_SECRET) as RefreshTokenPayload;
      
      // TODO: Verify refresh token exists in database
      const isValidRefreshToken = await this.verifyRefreshToken(decoded.userId, refreshToken);
      if (!isValidRefreshToken) {
        throw new AppError('Invalid refresh token', 401);
      }

      const user = await this.findUserById(decoded.userId);
      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Generate new tokens
      const tokens = this.generateTokens(user);

      // TODO: Update refresh token in database
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return tokens;
    } catch (error) {
      throw new AppError('Invalid refresh token', 401);
    }
  }

  /**
   * User logout
   */
  async logout(refreshToken: string): Promise<void> {
    try {
      const decoded = jwt.verify(refreshToken, this.JWT_REFRESH_SECRET) as RefreshTokenPayload;
      
      // TODO: Remove refresh token from database
      await this.removeRefreshToken(decoded.userId, refreshToken);
    } catch (error) {
      logger.warn('Invalid refresh token during logout');
    }
  }

  /**
   * Get user profile
   */
  async getProfile(userId: string): Promise<Omit<User, 'password'>> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const { password, ...userProfile } = user;
    return userProfile;
  }

  /**
   * Generate JWT tokens
   */
  private generateTokens(user: User): { accessToken: string; refreshToken: string } {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    const accessToken = jwt.sign(payload, this.JWT_SECRET as Secret, {
      expiresIn: this.JWT_EXPIRES_IN,
    } as SignOptions);

    const refreshToken = jwt.sign(
      { userId: user.id },
      this.JWT_REFRESH_SECRET as Secret,
      { expiresIn: this.JWT_REFRESH_EXPIRES_IN } as SignOptions,
    );

    return { accessToken, refreshToken };
  }

  // TODO: Replace these methods with actual database operations
  private async findUserByEmail(email: string): Promise<User | null> {
    // Placeholder - replace with actual database query
    return null;
  }

  private async findUserById(id: string): Promise<User | null> {
    // Placeholder - replace with actual database query
    return null;
  }

  private async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    // Placeholder - replace with actual database creation
    return {
      id: 'temp-id',
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  private async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    // Placeholder - replace with actual database operation
  }

  private async verifyRefreshToken(userId: string, refreshToken: string): Promise<boolean> {
    // Placeholder - replace with actual database verification
    return true;
  }

  private async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    // Placeholder - replace with actual database operation
  }

  private async removeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    // Placeholder - replace with actual database operation
  }
}
