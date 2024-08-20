// TODO: Test this app using Jest

// var mysql = require("mysql");

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// require('dotenv').config(); // Load environment variables from .env
import pg from "pg";
const { Pool } = pg;

// Create a connection pool
const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "tax",
    user: "postgres",
    password: "root",
});

// Example query: Fetch the current timestamp
async function fetchTimestamp() {
    try {
        const result = await pool.query(`SELECT * from "Admin";`);
        console.log(result.rows);
    } catch (error) {
        console.error("Error fetching:", error.message);
    } finally {
        await pool.end(); // Close the pool when done
    }
}

fetchTimestamp(); // Call the function
