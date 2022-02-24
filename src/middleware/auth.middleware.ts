import { Response, NextFunction, Request } from 'express';
import rescue from 'express-rescue';
import { verifyToken } from '../auth/token';
import { UserPayload } from '../interfaces/user';
import { ServiceError, messages } from '../utils/errorUtils';

export default rescue((req: Request, _res: Response, next: NextFunction):void => {
  const Authorization = req.headers.authorization;
  if (!Authorization) {
    throw new ServiceError('UNAUTHORIZED', messages.TOKEN_NOT_FOUND);
  }
  const result: UserPayload | boolean = verifyToken(Authorization);
  if (!result) {
    throw new ServiceError('UNAUTHORIZED', messages.INVALID_TOKEN);
  }
  req.user = { id: (result as UserPayload).id, username: (result as UserPayload).username };
  next();
});
