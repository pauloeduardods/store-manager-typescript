import Joi from 'joi';
import {
  usernameMessages,
  passwordMessages,
  levelMessages,
  classeMessages,
} from '../utils/errorUtils';

const username = Joi.string().min(3).required().messages({
  'string.base': usernameMessages.type,
  'any.required': usernameMessages.required,
  'string.min': usernameMessages.min,
});
const password = Joi.string().min(8).required().messages({
  'string.base': passwordMessages.type,
  'any.required': passwordMessages.required,
  'string.min': passwordMessages.min,
});
const level = Joi.number().integer().min(1).required()
  .messages({
    'any.required': levelMessages.required,
    'number.min': levelMessages.min,
  });
const classe = Joi.string().min(3).required().messages({
  'string.base': classeMessages.type,
  'any.required': classeMessages.required,
  'string.min': classeMessages.min,
});

export const userValidation = Joi.object().keys({
  username,
  password,
  level,
  classe,
});

export const loginValidation = Joi.object().keys({
  username,
  password,
});