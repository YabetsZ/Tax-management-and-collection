import pool from "../createConnection.js";

export const getUserByTin = async (tin) => {
    try {
        let resultTin = await pool.query(
            `SELECT * from "Tin" WHERE "tin" = $1;`,
            [tin]
        );
        const resultUser = await pool.query(
            `SELECT * from "Users" WHERE "id" = $1;`,
            [resultTin.rows[0].id]
        );
        return {
            tin: resultTin.rows[0].tin,
            password: resultTin.rows[0].password,
            ...resultUser.rows[0],
        };
    } catch (err) {
        console.error("error from getUser", err);
        // return response.send({ msg: err });
        throw new Error(err);
    }
};

// FIXME: FILL ALL THE THINGS NEEDED IT TO WORK
export const getUserById = async (id) => {
    try {
        // const result = await
    } catch (error) {}
};
