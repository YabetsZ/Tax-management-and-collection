import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import passport from "passport";

import { newUserValidator } from "../utils/newUserValidator.js";
import { addNewUser } from "../postgres/taxAuth/addNewUser.js";
import { newTIN } from "../utils/newTinValidator.js";
import { addTin } from "../postgres/taxAuth/addTin.js";
import { authLogin } from "../utils/LoginValidator.js";
import { preventAnotherSession } from "../utils/middlewares.js";

const router = Router();

// METHOD: authenticate authority
router.post(
    "/api/auth",
    preventAnotherSession,
    checkSchema(authLogin),
    passport.authenticate("taxAuthLocal"),
    (request, response) => {
        const result = validationResult(request);
        if (!result.isEmpty()) return response.status.send(result.array());
        return response.sendStatus(200);
    }
);
// FIXME: BOTH NEWUSER AND NEWTIN CAN BE FUSED TOGETHER
// METHOD: Adding new users to the system
router.put(
    "/api/auth/newUser",
    checkSchema(newUserValidator),
    async (request, response) => {
        // recieved data: data.ssn, data.name, data.email, data.phone, data.city, data.profile_picture
        console.log(request.session.passport.user.type);
        if (
            !request.user ||
            request.session.passport.user.type !== "tax authority"
        )
            return response.sendStatus(401);
        const result = validationResult(request);
        if (!result.isEmpty())
            return response.status(401).send({ msg: result.array() });
        try {
            await addNewUser(matchedData(request));
            return response
                .status(201)
                .send({ msg: "Adding a new user has been completed!" });
        } catch (err) {
            return response.status(401).send({ msg: err });
        }
    }
);

// METHOD: Adding tin for a user
router.put(
    "/api/auth/newTin",
    checkSchema(newTIN),
    async (request, response) => {
        // body: data.ssn
        if (
            !request.user ||
            request.session.passport.user.type !== "tax authority"
        )
            return response.sendStatus(401);
        const result = validationResult(request);
        if (!result.isEmpty())
            return response.status(401).send({ msg: result.array() });
        try {
            const { generated_tin, generated_pass } = await addTin(
                matchedData(request)
            );
            return response
                .status(201)
                .send({ tin: generated_tin, password: generated_pass });
        } catch (err) {
            return response.status(401).send({ msg: err });
        }
    }
);

export default router;
