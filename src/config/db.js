import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

export const adminPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_ADMIN_USER,
  password: process.env.DB_ADMIN_PASSWORD,
  database: process.env.DB_NAME,
});

export const userPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_CLIENT_USER,
  password: process.env.DB_CLIENT_PASSWORD,
  database: process.env.DB_NAME,
});
