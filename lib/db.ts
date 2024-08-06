// lib/db.ts
import mysql from 'mysql2/promise';

// 创建连接池
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'pump',
  port: Number(process.env.DB_PORT) || 3381, // 指定端口
});

export default pool;

