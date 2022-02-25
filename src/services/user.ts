import { getRepository } from 'typeorm';
import User from '../entity/User';

import { UserLogin, UserInfo, UserPayload, IUser } from '../interfaces/user';
import { userValidation, loginValidation } from '../validations/user';
import { ServicesResponse } from '../interfaces/servicesResponse';
import { ServiceError, StatusCode } from '../utils/errorUtils';
import { StatusCodeInterface } from '../interfaces/statusCode';
import { generateToken } from '../auth/token';

export async function create(user: IUser): Promise<ServicesResponse> {
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
  const result = await getRepository(User).insert(user);
  const userId = result.raw.insertId;
  const payload: UserPayload = {
    id: userId,
    username: user.username,
  };
  const token = generateToken(payload);
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
  const userInfo: UserInfo | undefined = await getRepository(User)
    .findOne({ where: { username: user.username } });
  if (!userInfo || userInfo.password !== user.password) {
    throw new ServiceError('UNAUTHORIZED', 'Username or password invalid');
  }
  const payload: UserPayload = {
    id: userInfo.id,
    username: user.username,
  };
  const token = generateToken(payload);
  return { code: StatusCode.OK, data: { token } };
}
