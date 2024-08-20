import { generate } from "generate-password";
import pool from "../createConnection.js";
import { comparePassword, hashPassword } from "../../utils/hashingFunctions.js";

export const addTin = async (data) => {
    try {
        const user_id = (
            await pool.query(`SELECT "id" FROM "Users" WHERE "ssn" = $1`, [
                data.ssn,
            ])
        ).rows[0].id;
        console.log("user id is:", user_id);
        // BUG: generated tin should be changed someday!
        const generated_tin = Math.floor(Math.random() * 1000000000);
        const generated_pass = generate({
            length: 8,
            numbers: true,
            symbols: true,
            uppercase: true,
            excludeSimilarCharacters: true,
        });
        let hashed_generated_pass = await hashPassword(generated_pass);

        console.log("generated pass", generated_pass);
        await pool.query(
            `INSERT INTO "Tin" ("tin","id", "password")
            VALUES ($1, $2, $3);`,
            [generated_tin, user_id, hashed_generated_pass]
        );
        return { generated_tin, generated_pass };
    } catch (err) {
        console.error("Error inserting data into Users table:", err);
        throw err;
    }
};
