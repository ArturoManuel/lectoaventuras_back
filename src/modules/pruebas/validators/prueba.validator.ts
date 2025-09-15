import Joi from 'joi';

export const createPruebaSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional().allow(''),
  aulaId: Joi.string().required(),
});

export const updatePruebaSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().max(500).optional().allow(''),
  isActive: Joi.boolean().optional(),
});
