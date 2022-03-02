import { IStatusCode } from '../interfaces';

export class ServiceError extends Error {
  type: keyof IStatusCode;

  message: string;

  constructor(type: keyof IStatusCode, message: string) {
    super();
    this.type = type;
    this.message = message;
  }
}

export const StatusCode: IStatusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  'string.empty': 422,
  'string.min': 422,
  'string.base': 422,
  'any.required': 400,
  'number.base': 422,
  'number.min': 422,
  'array.base': 422,
  'array.min': 422,
};

export const usernameMessages = {
  required: 'Username is required',
  min: 'Username must be longer than 2 characters',
  type: 'Username must be a string',
};

export const passwordMessages = {
  required: 'Password is required',
  min: 'Password must be longer than 7 characters',
  type: 'Password must be a string',
};

export const levelMessages = {
  required: 'Level is required',
  min: 'Level must be greater than 0',
  type: 'Level must be a number',
};

export const classeMessages = {
  required: 'Classe is required',
  min: 'Classe must be longer than 2 characters',
  type: 'Classe must be a string',
};

export const productNameMessages = {
  required: 'Name is required',
  min: 'Name must be longer than 2 characters',
  type: 'Name must be a string',
};

export const productAmountMessages = {
  required: 'Amount is required',
  min: 'Amount must be longer than 2 characters',
  type: 'Amount must be a string',
};

export const orderProductsMessages = {
  required: 'Products is required',
  min: 'Products can\'t be empty',
  type: 'Products must be an array of numbers',
};

export const messages = {
  INTERNAL_SERVER_ERROR: 'Internal server error',
  TOKEN_NOT_FOUND: 'Token not found',
  INVALID_TOKEN: 'Invalid token',
};