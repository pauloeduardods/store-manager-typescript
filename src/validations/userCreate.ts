import { ServicesResponse } from '../interfaces/servicesResponse';
import UserLogin from './userLogin';

const stringLength = (string: string, min: number):boolean => string.length <= min;

export default class User extends UserLogin {
  level: unknown | null;
  
  classe: unknown | null;

  constructor(username: unknown, password: unknown, level: unknown | null, classe: unknown | null) {
    super(username, password);
    this.level = level;
    this.classe = classe;
  }

  classeValidation = ():ServicesResponse | boolean => {
    switch (true) {
      case !this.classe:
        return { code: 400, data: { error: 'Classe is required' } };
      case typeof this.classe !== 'string':
        return { code: 422, data: { error: 'Classe must be a string' } };
      case stringLength(String(this.classe), 2):
        return { code: 422, data: { error: 'Classe must be longer than 2 characters' } };
      default: return true;
    }
  };

  levelValidation = ():ServicesResponse | boolean => {
    switch (true) {
      case !this.level && this.level !== 0:
        return { code: 400, data: { error: 'Level is required' } };
      case typeof this.level !== 'number':
        return { code: 422, data: { error: 'Level must be a number' } };
      case Number(this.level) <= 0:
        return { code: 422, data: { error: 'Level must be greater than 0' } };
      default: return true;
    }
  };

  validateUser = ():ServicesResponse | boolean => {
    const loginValidation = this.validateLogin();
    if ((loginValidation as ServicesResponse).code) {
      return loginValidation;
    }
    const levelValidation = this.levelValidation();
    if ((levelValidation as ServicesResponse).code) {
      return levelValidation;
    }
    const classeValidation = this.classeValidation();
    if ((classeValidation as ServicesResponse).code) {
      return classeValidation;
    }
    return true;
  };
}