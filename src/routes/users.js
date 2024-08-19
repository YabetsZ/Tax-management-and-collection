import express, { Router } from "express";

// import { getUser } from "../postgres/users/getUser.js";

const router = Router();

// METHOD: USER LOGIN

// app.get("/", getAdmins); // this is trial api endpoint
router.post("/api/user", async (request, response) => {
    const {
        body: { tin, password },
    } = request;
    // console.log(request.sessionID);
    try {
        const result = await getUser(tin);
        if (result.rows[0] && result.rows[0].password === password) {
            request.session.user = result.rows[0];
            return response.status(201).send({
                msg: "correct credential",
                user: request.session.user,
            });
        } else {
            return response.status(400).send({ msg: "invalid credential" });
        }
    } catch (err) {
        return response.status(500).send({ msg: err });
    }
});

// export const getTransation = async (tin) => {
//     const result = await pool.query(
//         `SELECT * from "Transactions" WHERE "user_id" = $1;`,
//         [tin]
//     );
//     return result.rows;
// };

// METHOD: NOTIFICATION
router
    .get("/api/user/:tin/notification", (request, response) => {
        const { tin } = request.params;
        const user = request.session.user;
        if (!user || user.user_id !== +tin)
            return response
                .status(401)
                .send({ msg: "Not authenticated!", user: user });
        response.send(`hello welcom come ${tin}`);
    })
    .post((req, res) => {});

// // METHOD:
// router
//     .get("/api/user/:tin/transaction", (request, response) => {
//         const { tin } = request.params;
//         const user = request.session.user;
//         if (!user || user.user_id !== +tin)
//             return response
//                 .status(401)
//                 .send({ msg: "Not authenticated!", user: user });
//         try {
//             const transactions = getTransation(tin);
//             response.send(transactions);
//         } catch (error) {
//             response.send({ message: error });
//         }
//     })
//     .post((req, res) => {});

export default router;
