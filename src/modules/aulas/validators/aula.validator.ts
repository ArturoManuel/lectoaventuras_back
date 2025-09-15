import Joi from 'joi';

export const createAulaSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Classroom name must be at least 3 characters long',
      'string.max': 'Classroom name cannot exceed 100 characters',
      'any.required': 'Classroom name is required'
    }),
  description: Joi.string()
    .max(500)
    .optional()
    .messages({
      'string.max': 'Description cannot exceed 500 characters'
    }),
  subject: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.min': 'Subject must be at least 2 characters long',
      'string.max': 'Subject cannot exceed 50 characters',
      'any.required': 'Subject is required'
    }),
  grade: Joi.string()
    .min(1)
    .max(20)
    .required()
    .messages({
      'string.min': 'Grade must be at least 1 character long',
      'string.max': 'Grade cannot exceed 20 characters',
      'any.required': 'Grade is required'
    }),
  maxStudents: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .optional()
    .messages({
      'number.base': 'Max students must be a number',
      'number.integer': 'Max students must be an integer',
      'number.min': 'Max students must be at least 1',
      'number.max': 'Max students cannot exceed 100'
    })
});

export const updateAulaSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .optional()
    .messages({
      'string.min': 'Classroom name must be at least 3 characters long',
      'string.max': 'Classroom name cannot exceed 100 characters'
    }),
  description: Joi.string()
    .max(500)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Description cannot exceed 500 characters'
    }),
  subject: Joi.string()
    .min(2)
    .max(50)
    .optional()
    .messages({
      'string.min': 'Subject must be at least 2 characters long',
      'string.max': 'Subject cannot exceed 50 characters'
    }),
  grade: Joi.string()
    .min(1)
    .max(20)
    .optional()
    .messages({
      'string.min': 'Grade must be at least 1 character long',
      'string.max': 'Grade cannot exceed 20 characters'
    }),
  maxStudents: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .optional()
    .messages({
      'number.base': 'Max students must be a number',
      'number.integer': 'Max students must be an integer',
      'number.min': 'Max students must be at least 1',
      'number.max': 'Max students cannot exceed 100'
    }),
  isActive: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': 'isActive must be a boolean value'
    })
});

export const aulaQuerySchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .optional()
    .default(1)
    .messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be an integer',
      'number.min': 'Page must be at least 1'
    }),
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .optional()
    .default(10)
    .messages({
      'number.base': 'Limit must be a number',
      'number.integer': 'Limit must be an integer',
      'number.min': 'Limit must be at least 1',
      'number.max': 'Limit cannot exceed 100'
    }),
  search: Joi.string()
    .max(100)
    .optional()
    .messages({
      'string.max': 'Search term cannot exceed 100 characters'
    }),
  subject: Joi.string()
    .max(50)
    .optional()
    .messages({
      'string.max': 'Subject filter cannot exceed 50 characters'
    }),
  grade: Joi.string()
    .max(20)
    .optional()
    .messages({
      'string.max': 'Grade filter cannot exceed 20 characters'
    }),
  isActive: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': 'isActive filter must be a boolean value'
    })
});

export const addStudentSchema = Joi.object({
  studentId: Joi.string()
    .required()
    .messages({
      'any.required': 'Student ID is required',
      'string.empty': 'Student ID cannot be empty'
    })
});
