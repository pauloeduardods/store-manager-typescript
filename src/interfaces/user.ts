export interface UserLogin {
  username: string;
  password: string;
}

export interface IUser extends UserLogin{
  level: number;
  classe: string;
}

export interface UserInfo extends IUser {
  id: number;
}

export interface UserPayload {
  id: number;
  username: string;
}