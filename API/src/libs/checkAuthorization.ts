import express, {NextFunction} from "express";

import crypto from "crypto";
import sql from "../utils/db";
import {User} from "../interfaces/dbTypes";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const encryptPassword = (password: string) => {
    // Generate a random salt
    const salt = crypto.randomBytes(16);

    // Hash the password with the salt using SHA-256
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');

    // Return the hashed password and salt as a string
    return `${salt.toString('hex')}$${hashedPassword}`;
};

const checkPassword = (password: string, hashedPassword: string) => {
    // Split the salt and the hashed password
    const [salt, hashed] = hashedPassword.split('$');

    // Hash the password with the salt using SHA-256
    const newHashedPassword = crypto.pbkdf2Sync(password, Buffer.from(salt, 'hex'), 1000, 64, 'sha256').toString('hex');

    // Return true if the hashed password matches the hashed password in the database
    return hashed === newHashedPassword;
}


async function checkAuthorization(req: express.Request, res: express.Response, next: NextFunction) {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({error: "Unauthorized"});
        return;
    }
    // get user and password from header
    const [user, password] = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const user2 = await sql<User[]>`SELECT *
                                     FROM users
                                        WHERE username = ${user}`;
    if (user2.length === 0) {
        res.status(401).json({error: "Unauthorized"});
        return;
    }
    if (!checkPassword(password, user2[0].hash)) {
        res.status(401).json({error: "Unauthorized"});
        return;
    }
    if (!user2[0].editor) {
        res.status(401).json({error: "Unauthorized"});
        return;
    }
    res.locals.user = user2[0];
    next();
}

const checkJwtToken = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({error: "Unauthorized"});
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log(decoded);
        next();
    } catch (e) {
        res.status(401).json({error: "Unauthorized"});
    }
};


function generateJwtToken(username: string) {
    return jwt.sign({username: username}, SECRET_KEY, {expiresIn: '1h'});
}


export {encryptPassword, checkPassword, checkAuthorization, checkJwtToken, generateJwtToken};