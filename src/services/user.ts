import { getRepository } from 'typeorm';
import User from '../entity/User';

import {
  ILogin,
  IUser,
  IUserCreate,
  IUserPayload,
  IServicesResponse,
  IStatusCode,
} from '../interfaces';
import { userValidation, loginValidation } from '../validations/user';
import { ServiceError, StatusCode } from '../utils/errorUtils';
import { generateToken } from '../auth/token';

export function validateNewUser(user: IUserCreate):void {
  const validation = userValidation.validate(user);
  if (validation.error) {
    throw new ServiceError(
      validation.error.details[0].type as keyof IStatusCode,
      validation.error.details[0].message,
    );
  }
  if (typeof user.level !== 'number') {
    throw new ServiceError('UNPROCCESSABLE_ENTITY', 'Level must be a number');
  }
}

export async function create(user: IUserCreate): Promise<IServicesResponse> {
  const result = await getRepository(User).insert(user);
  const userId = result.raw.insertId;
  const payload: IUserPayload = {
    id: userId,
    username: user.username,
  };
  const token = generateToken(payload);
  return { code: StatusCode.CREATED, data: { token } };
}

export async function login(user: ILogin): Promise<IServicesResponse> {
  const validation = loginValidation.validate(user);
  if (validation.error) {
    throw new ServiceError(
      validation.error.details[0].type as keyof IStatusCode,
      validation.error.details[0].message,
    );
  }
  const userInfo: IUser | undefined = await getRepository(User)
    .findOne({ where: { username: user.username } });
  if (!userInfo || userInfo.password !== user.password) {
    throw new ServiceError('UNAUTHORIZED', 'Username or password invalid');
  }
  const payload: IUserPayload = {
    id: userInfo.id,
    username: user.username,
  };
  const token = generateToken(payload);
  return { code: StatusCode.OK, data: { token } };
}
