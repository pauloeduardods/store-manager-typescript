import dotenv from 'dotenv';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import { IUserPayload } from '../interfaces';

dotenv.config();

const options: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const TOKEN: string = process.env.JWT_SECRET || 'secret';

export const generateToken = (payload: IUserPayload): string => {
  const token: string = sign(payload, TOKEN, options);
  return token;
};

export const verifyToken = (token: string): IUserPayload | boolean => {
  try {
    const payload = verify(token, TOKEN, options);
    return payload as IUserPayload;
  } catch (error) {
    return false;
  }
};