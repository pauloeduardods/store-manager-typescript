import dotenv from 'dotenv';
import { sign, SignOptions } from 'jsonwebtoken';
import { User } from '../interfaces/user';
import { create as createUser } from '../models/user';
import UserCreateSchema from '../validations/userCreate';
import { ServicesResponse } from '../interfaces/servicesResponse';

dotenv.config();

const options:SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const TOKEN:string = process.env.JWT_SECRET || 'secret';

export async function create(user: User): Promise<ServicesResponse> {
  const UserSchema = new UserCreateSchema(user.username, user.password, user.level, user.classe);
  const validation: ServicesResponse | boolean = UserSchema.validateUser();
  if ((validation as ServicesResponse).code) {
    return validation as ServicesResponse;
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
