import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createConnection({
    host: 'localhost',
    user:"root",
    password: process.env.MYSQL_Pass,
    database: process.env.DB_NAME || 'announcements_db',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

export default db;
