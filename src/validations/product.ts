import Joi from 'joi';

import { productNameMessages, productAmountMessages } from '../utils/errorUtils';

export default Joi.object().keys({
  name: Joi.string().min(3).required().messages({
    'any.required': productNameMessages.required,
    'string.min': productNameMessages.min,
    'string.base': productNameMessages.type,
  }),
  amount: Joi.string().min(3).required().messages({
    'any.required': productAmountMessages.required,
    'string.min': productAmountMessages.min,
    'string.base': productAmountMessages.type,
  }),
});