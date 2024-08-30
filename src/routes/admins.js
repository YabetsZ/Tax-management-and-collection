import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import passport from "passport";

import { newAuthValidator } from "../utils/newAuthValidator.js";
import { hashPassword } from "../utils/hashingFunctions.js";
import { addAuthority } from "../postgres/admins/addAuthority.js";
import { adminLogin } from "../utils/LoginValidator.js";
import { newAdminValidator } from "../utils/newAdminValidator.js";
import { addAdmin } from "../postgres/admins/addAdmin.js";
import { preventAnotherSession } from "../utils/middlewares.js";

const router = Router();

// METHOD: ADMIN LOGIN
router.post(
    "/api/admin",
    preventAnotherSession,
    checkSchema(adminLogin),
    passport.authenticate("adminLocal"),
    async (request, response) => {
        const result = validationResult(request);
        if (!result.isEmpty()) return response.status(400).send(result.array());
        return response.sendStatus(202);
    }
);

// METHOD: ADDING ADMINS TO THE SYSTEM
router.put(
    "/api/admin/newAdmin",
    checkSchema(newAdminValidator),
    async (request, response) => {
        if (
            !request.user ||
            request.session.passport.user.type !== "super admin"
        )
            return response.sendStatus(401);
        const result = validationResult(request);
        if (!result.isEmpty()) return response.status(400).send(result.array());

        const data = matchedData(request);
        try {
            data.password = await hashPassword(data.password);
            await addAdmin(data);
            return response.status(201).send({ msg: "successful" });
        } catch (err) {
            return response.status(500).send(err);
        }
    }
);

// METHOD: ADDING tax authorities to data base
router.put(
    "/api/admin/newAuth",
    checkSchema(newAuthValidator),
    async (request, response) => {
        if (
            !request.user ||
            request.session.passport.user.type !== "super admin"
        )
            return response.sendStatus(401);

        const result = validationResult(request);

        if (!result.isEmpty()) return response.status(400).send(result.array());
        const data = matchedData(request);
        try {
            //hash the password
            data.password = await hashPassword(data.password);
            // add tax authority to the table
            await addAuthority(data);
            return response
                .status(201)
                .send({ msg: "A new authority has been added!" });
        } catch (error) {
            console.log("Error in new authority,", error);
            return response.status(500).send({ msg: error });
        }
    }
);

export default router;
