import dotenv from 'dotenv';

dotenv.config();

export default {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'Trybesmith',
  synchronize: false,
  logging: false,
  entities: [
    '../entity/*{.ts,.js}',
  ],
  migrations: [
    'src/migration/*{.ts,.js}',
  ],
  subscribers: [
    'src/subscriber/*{.ts,.js}',
  ],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};