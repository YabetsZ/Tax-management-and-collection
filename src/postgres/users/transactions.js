import pool from "../createConnection.js";

// #region handling the transaction logic
export const Transaction = async (OPERATION, tin, data, vat) => {
    try {
        let result;
        if (OPERATION === "add") {
            result = await pool.query(
                `INSERT INTO "Transactions" ("seller_tin", "transaction_type", "sold_items", "vat", "date", "buyer_tin", "image_url") 
        VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5, $6) RETURNING "transaction_id";`,
                [
                    tin,
                    data.transaction_type,
                    data.sold_items,
                    vat,
                    data.buyer_tin,
                    data.image_url,
                ]
            );
        } else if (OPERATION === "update") {
            result = await pool.query(
                `UPDATE "Transactions" 
                SET "seller_tin" = $1, 
                    "transaction_type" = $2,
                    "sold_items" = $3, 
                    "vat" = $4, 
                    "date" = CURRENT_TIMESTAMP,
                    "buyer_tin" = $5,
                    "image_url" = $6
                WHERE "transaction_id" = $7;`,
                [
                    tin,
                    data.transaction_type,
                    data.sold_items,
                    vat,
                    data.buyer_tin,
                    data.image_url,
                    data.id,
                ]
            );
        } else if (OPERATION === "delete") {
            result = await pool.query(
                `DELETE FROM "Transactions" WHERE "transaction_id" = $1`,
                [data.id]
            );
        } else throw new Error("Operation couldn't be identified");
        return result;
    } catch (error) {
        throw error;
    }
};
// #endregion

export const calculateTax = async (items) => {
    try {
        let VAT = 0;
        for (let i = 0; i < items.length; i++) {
            const result = (
                await pool.query(
                    `
            select "Commodities".*, "TaxRates"."rate" 
            from "Commodities" 
            join "TaxRates" on "Commodities"."tax_id" = "TaxRates"."rate_id" where "id" = $1;`,
                    [items[i].commodity_id]
                )
            ).rows[0];
            VAT += items[i].quantity * result.price_per_unit * result.rate;
        }

        return VAT;
    } catch (error) {
        throw error;
    }
};
