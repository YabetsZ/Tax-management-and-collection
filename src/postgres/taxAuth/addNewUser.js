import pool from "../createConnection.js";

export const addNewUser = async (data) => {
    try {
        const result = await pool.query(
            `INSERT INTO "Users" ("ssn", "name", "email", "phone", "address", "city", "profile_picture")
            VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [
                data.ssn,
                data.name,
                data.email,
                data.phone,
                data.address,
                data.city,
                data.profile_picture,
            ]
        );
        return result;
    } catch (err) {
        console.error("Error inserting data into Users table:", err);
        throw err;
    }
};
