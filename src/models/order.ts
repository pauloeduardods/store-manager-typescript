import { ResultSetHeader } from 'mysql2';
import mysql from './connection';
import { IOrderResponse } from '../interfaces/order';

export async function create(userId: number): Promise<number> {
  const sql = `
    INSERT INTO Trybesmith.Orders (userId)
    VALUES (?)
  `;
  const values = [userId];
  const [result] = await mysql.execute<ResultSetHeader>(sql, values);
  return result.insertId;
}

export async function getById(id:number): Promise<IOrderResponse | undefined> {
  const sql = `
    SELECT * FROM Trybesmith.Orders
    WHERE id = ?
  `;
  const values = [id];
  const [result] = await mysql.execute(sql, values);
  const [order] = result as IOrderResponse[];
  return order;
}