import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from '../utils/app-error.js';

export function validateRequest(schema: Joi.ObjectSchema, source: 'body' | 'query' | 'params' = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = source === 'body' ? req.body : source === 'query' ? req.query : req.params;
    const { error, value } = schema.validate(data, { abortEarly: false, stripUnknown: true });
    if (error) {
      const message = error.details.map((d: Joi.ValidationErrorItem) => d.message).join(', ');
      return next(new AppError(message, 400));
    }
    if (source === 'body') req.body = value;
    if (source === 'query') req.query = value as any;
    if (source === 'params') req.params = value as any;
    next();
  };
}
