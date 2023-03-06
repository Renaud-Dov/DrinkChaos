import express from "express";
import sql from "../utils/db";
import {Transaction} from "../interfaces/dbTypes";
import {checkJwtToken} from "../libs/checkAuthorization";

// const SECRET_KEY: string = process.env.SECRET_KEY || "secret";
const router = express.Router();

router.use(checkJwtToken); // check if user is authorized to access this route


// GET TRANSACTIONS
router.get('/', async (req, res) => {
    const offset = parseInt(req.query.offset as string) || 0;
    const limit = parseInt(req.query.limit as string) || 100;

    const result = await sql<Transaction[]>`SELECT *
                                            FROM transactions
                                            LIMIT ${limit} OFFSET ${offset}`;
    res.status(200).json(result)
});

// POST NEW TRANSACTION
router.post('/', async (req, res) => {
    const {drink_id, price} = req.body;
    if (!drink_id || !price) {
        res.status(400).json({error: "Missing required fields", body: req.body});
        return;
    }
    console.log(drink_id, price);
    await sql<Transaction[]>`INSERT INTO transactions (drink_id, price)
                             VALUES (${drink_id}, ${price})`;
    res.status(200).json({message: "Transaction added"});
})

// DELETE TRANSACTION
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await sql<Transaction[]>`DELETE
                             FROM transactions
                             WHERE id = ${id}`;
    res.status(200).json({message: "Transaction deleted"});
})


module.exports = router;