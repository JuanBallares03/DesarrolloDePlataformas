const mysql = require("mysql2/promise");
require("dotenv").config();
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT) || 3306,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    
});

const jwtconfig={
    jwt: {
        secret: process.env.JWT_SECRET, //|| 'your_jwt_secret'
        expiresIn: process.env.JWT_EXPIRES || '1h'
    },

    server: {
        port: process.env.PORT || 4000,
    }
 
};


module.exports = {
  db,
  jwtconfig,
};