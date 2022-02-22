import { ResultSetHeader, FieldPacket } from 'mysql2';
import mysql from './connection';
import User from '../interfaces/user';

export default async function create(user: User): Promise<number> {
  const sql = 'INSERT INTO Users (username, password, level, classe) VALUES (?, ?, ?, ?)';
  const values = [user.username, user.password, user.level, user.classe];
  const [res]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(sql, values);
  return res.insertId;
}