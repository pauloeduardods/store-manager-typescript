import dotenv from 'dotenv';
import { sign, SignOptions } from 'jsonwebtoken';
import { User } from '../interfaces/user';
import { create as createUser } from '../models/user';
import { userValidation } from '../validations/user';
import { ServicesResponse } from '../interfaces/servicesResponse';
import { ServiceError } from '../utils/errorUtils';
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
  const payload = {
    id: userId,
    username: user.username,
  };
  const token: string = sign(payload, TOKEN, options);
  return { code: 201, data: { token } };
}

export function sla(): void {

}
