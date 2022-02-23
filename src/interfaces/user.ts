export interface UserLogin {
  username: string;
  password: string;
}

export interface User extends UserLogin{
  level: number;
  classe: string;
}

export interface UserInfo extends User {
  id: number;
}

export interface UserPayload {
  id: number;
  username: string;
}