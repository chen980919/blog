
const mysql = require('mysql');

const md5 = require('md5')

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '318449898',
    database: 'blog'
})

db.md5 = md5;

module.exports = db;