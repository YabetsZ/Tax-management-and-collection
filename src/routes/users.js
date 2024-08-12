import express, { Router } from "express";
import { getTransation } from "../express/queries.js";


const router = Router();
router
    .route("/:tin/notification")
    .get((req, res) => {
        const { tin } = req.params;
        res.send(`hello welcom come ${tin}`);
    })
    .post((req, res) => {});

router
    .route("/:tin/transaction")
    .get((req, res) => {
        const { tin } = req.params;
        try {
            const transactions = getTransation(tin);
            res.send(transactions);
        } catch (error) {
            res.send({ "message": error });
        }
    })
    .post((req, res) => {});

export { router };
