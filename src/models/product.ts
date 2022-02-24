import { ResultSetHeader } from 'mysql2';
import mysql from './connection';
import { IProduct, Product } from '../interfaces/product';

export async function create(product:IProduct): Promise<number> {
  const sql = `
    INSERT INTO Trybesmith.Products (name, amount)
    VALUES (?, ?)
  `;
  const values = [product.name, product.amount];
  const [result] = await mysql.execute<ResultSetHeader>(sql, values);
  return result.insertId;
}

export async function getAll(): Promise<Product[]> {
  const sql = `
    SELECT * FROM Trybesmith.Products
  `;
  const [result] = await mysql.execute(sql);
  return result as Product[];
}