import pool from "../createConnection.js";

export const check2fa = async (tin) => {
    try {
        const { secret } = (
            await pool.query(`SELECT "secret" FROM "Tin" WHERE "tin" = $1`, [
                tin,
            ])
        ).rows[0];
        return secret;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
