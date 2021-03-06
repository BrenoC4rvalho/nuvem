import jwt from "jsonwebtoken";
import { promisify } from 'util';

import authConfig from "../config/auth";

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({error: 'Token was not provided.'});
    }
    console.log(authHeader)
    const [, token] = authHeader.split(' ');
    console.log(token);
    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        console.log(decoded)
        req.userId = decoded.id;

        return next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({error: 'Invalid Token'})
    }
}