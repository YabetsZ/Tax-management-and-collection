import createConnection from "../postgresqlDB/createConnectionPool.js";

const pool = await createConnection();

export const getAdmins = async (request, response) => {
    request.session.visited = true;
    // console.log(request.session.id);
    try {
        const result = await pool.query(`SELECT * from "Admin";`);
        const admins = result.rows;
        return response.send(admins);
    } catch (error) {
        console.error("Error fetching:", error);
        return response.send({ msg: error });
    }
};

export const getUser = async (request, response) => {
    const {
        body: { tin, password },
    } = request;
    // console.log(request.sessionID);
    try {
        const result = await pool.query(
            `SELECT * from "Users" WHERE "tin" = $1;`,
            [tin]
        );
        if (result.rows[0] && result.rows[0].password === password) {
            request.session.user = result.rows[0];
            return response.status(201).send({
                msg: "correct credential",
                user: request.session.user,
            });
        } else {
            return response.status(400).send({ msg: "invalid credential" });
        }
    } catch (error) {
        console.error(error);
        return response.send({ msg: error });
    }
};

export const getTransation = async (tin) => {
    const result = await pool.query(
        `SELECT * from Transactions WHERE TIN = $1;`,
        [tin]
    );
    return result.rows;
};
