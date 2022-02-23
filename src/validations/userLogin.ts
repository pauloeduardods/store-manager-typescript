import { ServicesResponse } from '../interfaces/servicesResponse';

const stringLength = (string: string, min: number): boolean => string.length <= min;

export default class UserLogin {
  username: unknown;

  password: unknown;

  constructor(username: unknown, password: unknown) {
    this.username = username;
    this.password = password;
  }

  usernameValidarion = (): ServicesResponse | boolean => {
    switch (true) {
      case !this.username:
        return { code: 400, data: { error: 'Username is required' } };
      case typeof this.username !== 'string':
        return { code: 422, data: { error: 'Username must be a string' } };
      case stringLength(String(this.username), 2):
        return { code: 422, data: { error: 'Username must be longer than 2 characters' } };
      default: return true;
    }
  };

  passwordValidation = (): ServicesResponse | boolean => {
    switch (true) {
      case !this.password:
        return { code: 400, data: { error: 'Password is required' } };
      case typeof this.password !== 'string':
        return { code: 422, data: { error: 'Password must be a string' } };
      case stringLength(String(this.password), 7):
        return { code: 422, data: { error: 'Password must be longer than 7 characters' } };
      default: return true;
    }
  };

  validateLogin = (): ServicesResponse | boolean => {
    const usernameError = this.usernameValidarion();
    const passwordError = this.passwordValidation();

    if ((usernameError as ServicesResponse).code) {
      return usernameError;
    }
    if ((passwordError as ServicesResponse).code) {
      return passwordError;
    }
    return true;
  };
}