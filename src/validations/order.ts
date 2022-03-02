import Joi from 'joi';

import { orderProductsMessages } from '../utils/errorUtils';

export default Joi.array().items(Joi.number()).min(1).required()
  .messages({
    'array.base': orderProductsMessages.type,
    'array.min': orderProductsMessages.min,
    'any.required': orderProductsMessages.required,
  });