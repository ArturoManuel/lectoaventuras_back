import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/app-error.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(new AppError('Authentication token is missing', 401));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    req.user = {
      id: payload.userId,
      email: payload.email,
      role: payload.role,
    };
    next();
  } catch (error) {
    return next(new AppError('Invalid or expired token', 401));
  }
}
