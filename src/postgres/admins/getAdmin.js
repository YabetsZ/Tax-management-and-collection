import pool from "../createConnection.js";

export const getAdminByEmail = async (email) => {
    try {
        const result = await pool.query(
            `SELECT * from "Admin" WHERE "email" = $1`,
            [email]
        );
        return result.rows[0];
    } catch (err) {
        console.error("error from getAdmin", err);
        // return response.send({ msg: err });
        throw new Error(err);
    }
};

export const getAdminById = async (id) => {
    try {
        const result = await pool.query(
            `SELECT * from "Admin" WHERE "id" = $1`,
            [id]
        );
        return result.rows[0];
    } catch (err) {
        console.error("error from getAdmin", err);
        throw new Error(err);
    }
};
