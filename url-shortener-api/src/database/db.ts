import { Pool } from 'pg';
import dotenv from 'dotenv';
import { config } from '../config';

dotenv.config();

export const pool = new Pool({
	user: config.db.user,
	host: config.db.host,
	database: config.db.name,
	password: config.db.password,
	port: config.db.port,
	idleTimeoutMillis: 30000,
});