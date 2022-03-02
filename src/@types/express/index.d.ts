import { IUserPayload } from '../../interfaces';

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload;
    }
  }
}