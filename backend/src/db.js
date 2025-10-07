const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// console.log("✅ Connected to MySQL database!!!");
// Test the database connection
(async () => {
  try {
    const connection = await db.getConnection(); // get a connection from the pool
    console.log("✅ Connected to MySQL database successfully!");
    connection.release(); // release it back to the pool
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();

module.exports = db;
