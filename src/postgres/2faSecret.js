import pool from "./createConnection.js";

export const addSecret = async (tin, secret) => {
    secret = JSON.stringify(secret);
    try {
        await pool.query(`UPDATE "Tin" SET "secret" = $1 WHERE "tin" = $2;`, [
            secret,
            tin,
        ]);
    } catch (error) {
        throw error;
    }
};

export const getSecrete = async (tin) => {
    try {
        const result = await pool.query(
            `SELECT * FROM "Tin" WHERE "tin" = $1;`,
            [tin]
        );
        console.log(result.rows[0].secret);
        const secret = result.rows[0].secret.base32;
        console.log(secret);
        return secret;
    } catch (error) {
        throw error;
    }
};
