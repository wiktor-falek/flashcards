import jwt from "jsonwebtoken";
import dotenv from 'dotenv'; dotenv.config();

const SECRET = process.env.JWT_SECRET;

/**
 * @param {String} id 
 * @param {Number} registrationTimestamp 
 * @returns {String} JWT token
 */
export const encode = (username, email) => {
    const payload = { username, email };
    const token = jwt.sign(payload, SECRET, { expiresIn: 86400 });
    return token;
}

/**
 * @param {String} token
 * @returns {Object} decoded JWT token data
 */
export const decode = (token) => {
    const decodedToken = jwt.verify(token, SECRET);
    return decodedToken;
}