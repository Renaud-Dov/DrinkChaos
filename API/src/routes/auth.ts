import express, {Request, Response} from "express";
import sql from "../utils/db";
import jwt from "jsonwebtoken";
import {User} from "../interfaces/dbTypes";
import {checkJwtToken, generateJwtToken} from "../libs/checkAuthorization";

const router = express.Router();
const {checkAuthorization, encryptPassword} = require('../libs/checkAuthorization');


router.post('/login', checkAuthorization, (req: Request, res: Response) => {
    const user: User = res.locals.user
    res.status(200).json({message: "User logged in", token: generateJwtToken(user.username)});
})

router.get('/token', checkJwtToken, (req: Request, res: Response) => {
    res.status(200).json({message: "Token valid"});
})

router.post('/signup', async (req: Request, res: Response) => {
    const {username, password} = req.body;
    const hashedPassword = encryptPassword(password);
    if (!username || !password) {
        res.status(400).json({error: "Missing required fields"});
        return;
    }
    const existingUser = await sql<User[]>`SELECT *
                                           FROM users
                                           WHERE username = ${username}`;
    if (existingUser.length > 0) {
        res.status(400).json({error: "User already exists"});
        return;
    }
    console.log(username, hashedPassword);
    await sql<User[]>`INSERT INTO users (username, hash)
                      VALUES (${username}, ${hashedPassword})`;
    const token = generateJwtToken(username);
    console.log(token);

    res.status(200).json({message: "User added", token: token});
})


module.exports = router;