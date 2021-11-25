import { Pool } from 'pg';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const db_port = process.env.DB_PORT;
const hostname = process.env.HOSTNAME;
const username = process.env.DB_USERNAME;
const password = process.env.PASSWORD;
const db_name = process.env.DB_NAME;

const pool = new Pool({
  user: username,
  host: hostname,
  database: db_name,
  password: password,
  port: db_port
});

export default pool;
