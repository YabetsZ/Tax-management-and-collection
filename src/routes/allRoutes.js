import { Router } from "express";
import routesForUsers from "./users.js";
import routesForAdmins from "./admins.js";
import routesForAuthority from "./taxAuthority.js";

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

export default router;
