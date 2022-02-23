import { ResultSetHeader } from 'mysql2';
import mysql from './connection';
import { User, UserInfo } from '../interfaces/user';

export async function create(user: User): Promise<number> {
  const sql = `
    INSERT INTO Trybesmith.Users (username, password, level, classe)
    VALUES (?, ?, ?, ?)
  `;
  const values = [user.username, user.password, user.level, user.classe];
  const [res] = await mysql.execute<ResultSetHeader>(sql, values);
  return res.insertId;
}

export async function getByUsername(username: string): Promise<UserInfo> {
  const sql = `
    SELECT * FROM Trybesmith.Users
    WHERE username = ?
  `;
  const values = [username];
  const [res] = await mysql.execute(sql, values);
  const [user] = res as UserInfo[];
  return user;
}
