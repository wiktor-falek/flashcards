import { rateLimit } from 'express-rate-limit'


export const authApiLimiter = rateLimit({
    windowMs: 60000,
    max: 10, // limit ip to this amount of requests per window
    standardHeaders: true,
    legacyHeaders: false,
});


