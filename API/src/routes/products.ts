import express from "express";
import sql from "../utils/db";
import {Drink, Price} from "../interfaces/dbTypes";
import {checkAuthorization, checkJwtToken} from "../libs/checkAuthorization";

// const SECRET_KEY: string = process.env.SECRET_KEY || "secret";
const router = express.Router();

router.use(checkJwtToken); // check if user is authorized to access this route

router.get('/', async (req, res) => {
    // get 100 users + offset
    const offset = parseInt(req.query.offset as string) || 0;
    const limit = parseInt(req.query.limit as string) || 100;

    const result = await sql<Drink[]>`SELECT *
                                      FROM drinks
                                      LIMIT ${limit} OFFSET ${offset}`;
    res.status(200).json(result)
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await sql<Price[]>`SELECT *
                                        FROM drinkprices
                                        WHERE drink_id = ${id}`;

    res.status(200).json(result)
})

// ADD NEW DRINK
router.post('/', async (req, res) => {
    const {name, starting_price, min_price, max_price} = req.body;
    // check if all required fields are present (name, min and max price, rest is optional)
    if (!name || !min_price || !max_price || !starting_price) {
        res.status(400).json({error: "Missing required fields"});
        return;
    }
    // if name already exists, return error
    const existingDrink = await sql<Drink[]>`SELECT *
                                             FROM drinks
                                             WHERE name = ${name}`;
    if (existingDrink.length > 0) {
        res.status(400).json({error: "Drink already exists"});
        return;
    }

    // insert new drink into database
    await sql<Drink[]>`INSERT INTO drinks (name, min_price, max_price)
                       VALUES (${name}, ${min_price}, ${max_price})`;
    // get the id of the newly created drink
    const drinkId = await sql<Drink[]>`SELECT id
                                       FROM drinks
                                       WHERE name = ${name}`;

    // insert starting price into database
    await sql<Price[]>`INSERT INTO drinkprices (drink_id, price)
                       VALUES (${drinkId[0].id}, ${starting_price})`;

    res.status(200).json({message: "Drink added", id: drinkId[0].id});
})


// UPDATE DRINK DETAILS
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    let {name, min_price, max_price, crisis_mode, crisis_price} = req.body;
    if (!name && !min_price && !max_price && !crisis_mode && !crisis_price) {
        res.status(400).json({error: "Missing required fields"});
        return;
    }
    // get drink data to complete the request
    const drink = await sql<Drink[]>`SELECT *
                                     FROM drinks
                                     WHERE id = ${id}`;
    if (drink.length === 0) {
        res.status(400).json({error: "Drink not found"});
        return;
    }
    if (!name) name = drink[0].name;
    if (!min_price) min_price = drink[0].min_price;
    if (!max_price) max_price = drink[0].max_price;
    if (!crisis_mode) crisis_mode = drink[0].crisis_mode;
    if (!crisis_price) crisis_price = drink[0].crisis_price;


    console.log(req.body, name, min_price, max_price, crisis_mode, crisis_price)
    // update only the fields that are present in the request body
    const result = await sql<Drink[]>`UPDATE drinks
                                      SET name         = ${name},
                                          min_price    = ${min_price},
                                          max_price    = ${max_price},
                                          crisis_mode  = ${crisis_mode},
                                          crisis_price = ${crisis_price}
                                      WHERE id = ${id}`;
    res.status(200).json(result)
})

// DELETE DRINK
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await sql<Drink[]>`DELETE
                                      FROM drinks CASCADE
                                      WHERE id = ${id}`;
    res.status(200).json(result)
})



module.exports = router;