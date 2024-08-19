import pool from "../createConnection.js";

export const addAuthority = async (data) => {
    try {
        console.log(data.ssn);
        const result = await pool.query(
            `INSERT INTO "TaxAuthorities" ("ssn", "name", "email", "password", "phone", "jurisdiction", "address", "profile_picture")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
            [
                data.SSN,
                data.name,
                data.email,
                data.password,
                data.phone,
                data.jurisdiction,
                data.address,
                data.profile_picture,
            ]
        );
        return result;
    } catch (err) {
        console.error("Error inserting data into Users table:", err);
        throw err;
    }
};
