import pool from "../createConnection.js";

export const addAdmin = async (data) => {
    try {
        await pool.query(
            `INSERT INTO "Admin" ("ssn","admin_type", "name", "email", "password", "phone", "address", "profile_picture")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
            [
                data.ssn,
                data.admin_type,
                data.name,
                data.email,
                data.password,
                data.phone,
                data.address,
                data.profile_picture,
            ]
        );
    } catch (error) {
        throw error;
    }
};
