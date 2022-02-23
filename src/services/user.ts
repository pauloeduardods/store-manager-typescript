import dotenv from 'dotenv';
import { sign, SignOptions } from 'jsonwebtoken';
import { User, UserLogin, UserInfo, UserPayload } from '../interfaces/user';
import { create as createUser, getByUsername } from '../models/user';
import { userValidation, loginValidation } from '../validations/user';
import { ServicesResponse } from '../interfaces/servicesResponse';
import { ServiceError, StatusCode } from '../utils/errorUtils';
import { StatusCodeInterface } from '../interfaces/statusCode';

dotenv.config();

const options:SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const TOKEN:string = process.env.JWT_SECRET || 'secret';

export async function create(user: User): Promise<ServicesResponse> {
  const validation = userValidation.validate(user);
  if (validation.error) {
    throw new ServiceError(
      validation.error.details[0].type as keyof StatusCodeInterface,
      validation.error.details[0].message,
    );
  }
  if (typeof user.level !== 'number') {
    throw new ServiceError('UNPROCCESSABLE_ENTITY', 'Level must be a number');
  }
  const userId = await createUser(user);
  const payload: UserPayload = {
    id: userId,
    username: user.username,
  };
  const token: string = sign(payload, TOKEN, options);
  return { code: StatusCode.CREATED, data: { token } };
}

export async function login(user: UserLogin): Promise<ServicesResponse> {
  const validation = loginValidation.validate(user);
  if (validation.error) {
    throw new ServiceError(
      validation.error.details[0].type as keyof StatusCodeInterface,
      validation.error.details[0].message,
    );
  }
  const userInfo: UserInfo = await getByUsername(user.username);
  if (!userInfo || userInfo.password !== user.password) {
    throw new ServiceError('UNAUTHORIZED', 'Username or password invalid');
  }
  const payload: UserPayload = {
    id: userInfo.id,
    username: user.username,
  };
  const token: string = sign(payload, TOKEN, options);
  return { code: StatusCode.OK, data: { token } };
}
