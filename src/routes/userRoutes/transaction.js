import { Router } from "express";
import {
    Transaction,
    calculateTax,
} from "../../postgres/users/transactions.js";

const router = Router();

router.put("/api/user/:tin/addTransaction", async (request, response) => {
    const {
        params: { tin },
        body: transactions,
    } = request;
    if (!request.user || +tin !== request.user.tin)
        return response.sendStatus(401);

    try {
        const VAT = await calculateTax(transactions.sold_items);
        const result = (await Transaction("add", tin, transactions, VAT))
            .rows[0].transaction_id;
        return response.status(200).send({ transaction_id: result });
    } catch (error) {
        return response.status(400).send({ msg: error });
    }
});

router.patch("/api/user/:tin/updateTransaction", async (request, response) => {
    const {
        params: { tin },
        body: transactions,
    } = request;
    if (!request.user || +tin !== request.user.tin)
        return response.sendStatus(401);

    try {
        const VAT = await calculateTax(transactions.sold_items);
        await Transaction("update", tin, transactions, VAT);
        return response
            .status(200)
            .send({ message: "transaction successfully updated." });
    } catch (error) {
        return response.status(400).send({ msg: error });
    }
});

router.delete("/api/user/:tin/deleteTransaction", async (request, response) => {
    const {
        params: { tin },
        body: transaction,
    } = request;
    if (!request.user || +tin !== request.user.tin)
        return response.sendStatus(401);
    try {
        await Transaction("delete", tin, transaction);
        return response.send({
            message: `The transaction with id:${transaction.id} has been deleted.`,
        });
    } catch (error) {
        return response.status(400).send({ msg: error });
    }
});

export default router;
