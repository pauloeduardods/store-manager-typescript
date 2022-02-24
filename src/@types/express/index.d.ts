import { UserPayload } from '../../src/interfaces/user';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}