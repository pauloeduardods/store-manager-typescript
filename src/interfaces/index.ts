// Entity

export interface IOrder {
  id: number;
  userId: number;
}

export interface IUser {
  id: number;
  password: string;
  username: string;
  classe: string;
  level: number;
}

export interface IProduct {
  id: number;
  name: string;
  amount: string;
  orderId: number;
}

// Status Code

export interface IStatusCode {
  readonly OK: number;
  readonly CREATED: number;
  readonly NO_CONTENT: number;
  readonly BAD_REQUEST: number;
  readonly UNAUTHORIZED: number;
  readonly NOT_FOUND: number;
  readonly CONFLICT: number;
  readonly UNPROCCESSABLE_ENTITY: number;
  readonly INTERNAL_SERVER_ERROR: number;
  readonly 'string.empty': number;
  readonly 'string.min': number;
  readonly 'string.base': number;
  readonly 'number.base': number;
  readonly 'number.min': number;
  readonly 'any.required': number;
  readonly 'array.base': number;
  readonly 'array.min': number;
}

// Error

export interface IError {
  type: keyof IStatusCode;
  message: string;
}

// Service Response

export interface IServicesResponse {
  code: number;
  data: unknown;
}

// User 

export interface ILogin {
  username: string;
  password: string;
}

export interface IUserCreate extends ILogin {
  level: number;
  classe: string;
}

export interface IUserPayload {
  id: number;
  username: string;
}

// Product

export interface IProductCreate {
  name: string;
  amount: string;
}