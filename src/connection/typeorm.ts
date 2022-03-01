import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

dotenv.config();

export default async () => createConnection({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'Trybesmith',
  synchronize: false,
  logging: false,
  entities: [
    'src/entity/*{.ts,.js}',
  ],
});