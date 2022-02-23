export interface UserLogin {
  username: string;
  password: string;
}

export interface User extends UserLogin{
  level: number;
  classe: string;
}