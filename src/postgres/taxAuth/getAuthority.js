import pool from "../createConnection.js";

export const getAuthById = async (id) => {
    try {
        const result = await pool.query(
            `SELECT * FROM "TaxAuthorities" WHERE "id" = $1`,
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("error from getAuth", error);
        // return response.send({ msg: err });
        throw new Error(error);
    }
};

export const getAuthByEmail = async (email) => {
    try {
        const result = await pool.query(
            `SELECT * FROM "TaxAuthorities" WHERE "email" = $1`,
            [email]
        );
        return result.rows[0];
    } catch (error) {
        console.error("error from getAuth", error);
        // return response.send({ msg: err });
        throw new Error(error);
    }
};
