import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error.js';
import { logger } from '../utils/logger.js';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const isAppError = err instanceof AppError;
  const status = isAppError ? err.statusCode : 500;
  const message = isAppError ? err.message : 'Internal Server Error';

  logger.error(`${req.method} ${req.originalUrl} - ${status} - ${message}`);
  if (!isAppError) {
    logger.error(err?.stack || String(err));
  }

  res.status(status).json({
    success: false,
    error: message,
  });
}
