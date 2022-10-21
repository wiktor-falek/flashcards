import jwt from "jsonwebtoken";
import dotenv from 'dotenv'; dotenv.config();

const SECRET = process.env.JWT_SECRET;

/**
 * returns jwt token
 * @param {String} id 
 * @param {Number} registrationTimestamp 
 * @returns {String}
 */
export const encode = (username, email) => {
    const payload = { username, email };
    const token = jwt.sign(payload, SECRET, { expiresIn: 86400 });
    return token;
}

/**
 * returns decoded jwt token data
 * @param {String} token
 * @returns {Object}
 */
export const decode = (token) => {
    const decodedToken = jwt.verify(token, SECRET);
    return decodedToken;
}