import pool from "../createConnection.js";

// FIXME: YOU KNOW
export const getUserByTin = async (tin) => {
    try {
        const result = await pool.query(
            `SELECT * from "Users" WHERE "tin" = $1;`,
            [tin]
        );
        return result;
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
