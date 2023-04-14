import mysql from "mysql"
import dotenv from 'dotenv'
dotenv.config({path:'config/.env'})

export const db = mysql.createPool({
    connectionLimit: 50,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT
})

db.getConnection(function(err) {
    if(err) throw err;
    console.log('MySql est connecté!');
});