import express, { Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import passport from "passport";
import { payerLogin } from "../utils/LoginValidator.js";
import { check2fa } from "../postgres/users/check2fa.js";

// import { getUser } from "../postgres/users/getUser.js";

const router = Router();

// METHOD: USER LOGIN

// app.get("/", getAdmins); // this is trial api endpoint
router.post(
    "/api/user",
    checkSchema(payerLogin),
    passport.authenticate("taxPayerLocal"),
    async (request, response) => {
        const result = validationResult(request);
        if (!result.isEmpty()) return response.status(400).send(result.array());
        if (!(await check2fa(request.user.tin)))
            return response
                .status(202)
                .send({ message: "successfully logged in", "2fa": "false" });
        return response
            .status(202)
            .send({ message: "successfully logged in", "2fa": "true" });
    }
);

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
