import express, { Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import passport from "passport";
import { payerLogin } from "../../utils/LoginValidator.js";
import { check2fa } from "../../postgres/users/check2fa.js";
import { preventAnotherSession } from "../../utils/middlewares.js";

// import { getUser } from "../postgres/users/getUser.js";
// TODO: CHANGING PASSWORD
const router = Router();

// METHOD: USER LOGIN

// app.get("/", getAdmins); // this is trial api endpoint
router.post(
    "/api/user",
    checkSchema(payerLogin),
    preventAnotherSession,
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

export default router;
