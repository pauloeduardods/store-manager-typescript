export interface IOrder {
  id: number;
  userId: number;
}

export interface IUser {
  id: number;
  password: string;
  username: string;
  classe: string;
  level: number;
}

export interface IProduct {
  id: number;
  name: string;
  amount: string;
  orderId: number;
}