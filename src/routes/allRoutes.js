import { Router } from "express";
import speakeasy from "speakeasy";

import routesForUsers from "./users.js";
import routesForAdmins from "./admins.js";
import routesForAuthority from "./taxAuthority.js";
import { addSecret, getSecrete } from "../postgres/2faSecret.js";
import { check2fa } from "../postgres/users/check2fa.js";

const router = Router();
router.use(routesForUsers);
router.use(routesForAdmins);
router.use(routesForAuthority);
router.post("/api/logout", (request, response) => {
    if (!request.user) return response.sendStatus(401);
    try {
        request.logout((err) => {
            if (err) throw new Error(err);
        });
        return response.sendStatus(201);
    } catch (error) {
        return response.status(401).send({ msg: error });
    }
});

// METHOD: 2FA
router.post("/api/register", async (request, response) => {
    if (!request.user)
        return response.status(401).send({ message: "Not authorized" });
    if (await check2fa(request.user.tin))
        return response.status(403).send({ message: "Already 2FA is set" });
    try {
        const temp_secret = speakeasy.generateSecret();
        request.session.temp_secret = temp_secret;
        console.log(request.session.temp_secret);
        if (request.session.passport.user.type === "tax payer")
            return response.status(200).send({
                id: request.user.tin,
                temp_secret: temp_secret.base32,
            });
        return response
            .status(200)
            .send({ id: request.user.tin, temp_secret: temp_secret.base32 });
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
});

// ALTERNATE: Here the "tin" is identified by "id" for tax payer to be more generic
router.post("/api/verify", async (request, response) => {
    console.log(request.session.temp_secret);
    if (!request.user || !request.session.temp_secret)
        return response.sendStatus(400);
    const {
        body: { token },
    } = request; // data to be recieved is 'token'
    const { base32: secret } = request.session.temp_secret;
    try {
        const verified = speakeasy.totp.verify({
            token,
            secret,
            encoding: "base32",
        });
        if (verified) {
            await addSecret(request.user.tin, request.session.temp_secret);
            return response.status(200).send({ verified: "true" });
        }
        throw { verified: "false" };
    } catch (error) {
        console.log(error);
        return response.status(400).send(error);
    }
});

router.post("/api/validate", async (request, response) => {
    if (!request.user) return response.sendStatus(400);
    const {
        body: { token },
    } = request;
    const secret = await getSecrete(request.user.tin);
    try {
        const validated = speakeasy.totp.verify({
            token,
            secret,
            encoding: "base32",
            window: 1,
        });
        if (validated) {
            return response.status(200).send({ validated: "true" });
        }

        throw { validated: "false" };
    } catch (error) {
        console.log(error);
        return response.status(400).send(error);
    }
});

export default router;
