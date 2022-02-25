import dotenv from 'dotenv';
import { createConnection, ConnectionOptions } from 'typeorm';
import config from '../../ormconfig';

dotenv.config();

export default async () => createConnection(config as ConnectionOptions);