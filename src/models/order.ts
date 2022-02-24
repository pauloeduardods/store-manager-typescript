import { ResultSetHeader } from 'mysql2';
import mysql from './connection';

export async function create(userId: number): Promise<number> {
  const sql = `
    INSERT INTO Trybesmith.Orders (userId)
    VALUES (?)
  `;
  const values = [userId];
  const [result] = await mysql.execute<ResultSetHeader>(sql, values);
  return result.insertId;
}

export function sla() {

}