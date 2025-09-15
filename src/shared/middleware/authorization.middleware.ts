import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error.js';

export function authorizeRoles(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      return next(new AppError('Forbidden: insufficient permissions', 403));
    }
    next();
  };
}
