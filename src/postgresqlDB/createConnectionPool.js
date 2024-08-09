import pg from "pg";
const { Pool } = pg;

const createConnectionPool = async () => {
    // Create a connection pool
    const pool = new Pool({
        host: "localhost",
        port: 5432,
        database: "tax",
        user: "postgres",
        password: "root",
    });
    return pool;
};

export default createConnectionPool;
