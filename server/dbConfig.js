import { Pool } from 'pg';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const env = process.env.NODE_ENV || 'development';

let connectionString;
let ssl;

if (env === 'development') {
  const db_port = process.env.DB_PORT;
  const hostname = process.env.HOSTNAME;
  const username = process.env.DB_USERNAME;
  const password = process.env.PASSWORD;
  const db_name = process.env.DB_NAME;

  connectionString = `postgres://${username}:${password}@${hostname}:${db_port}/${db_name}`;
  ssl = false;
} else {
  connectionString = process.env.DATABASE_URL;
  ssl = true;
}

const pool = new Pool({
  connectionString,
  ssl
});

export default pool;
