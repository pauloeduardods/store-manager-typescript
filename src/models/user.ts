import { ResultSetHeader, FieldPacket } from 'mysql2';
import mysql from './connection';
import { User } from '../interfaces/user';

export async function create(user: User): Promise<number> {
  try {
    const sql = `
      INSERT INTO Trybesmith.Users (username, password, level, classe)
      VALUES (?, ?, ?, ?)
    `;
    const values = [user.username, user.password, user.level, user.classe];
    const [res]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(sql, values);
    return res.insertId;
  } catch (err) {
    return -1;
  }
}

export function sla(): void {

}