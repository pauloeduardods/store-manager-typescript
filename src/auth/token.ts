import dotenv from 'dotenv';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import { UserPayload } from '../interfaces/user';

dotenv.config();

const options: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const TOKEN: string = process.env.JWT_SECRET || 'secret';

export const generateToken = (payload: UserPayload): string => {
  const token: string = sign(payload, TOKEN, options);
  return token;
};

export const verifyToken = (token: string): UserPayload | boolean => {
  try {
    const payload = verify(token, TOKEN, options);
    return payload as UserPayload;
  } catch (error) {
    return false;
  }
};