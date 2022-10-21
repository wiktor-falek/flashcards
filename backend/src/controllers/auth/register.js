import { Router } from "express";
import { body, validationResult } from "express-validator";

import { encode } from "../../utils/token.js";
import { sendConfirmationEmail } from "../../components/email.js";
import User from "../../db/models/User.js";

const router = Router();

router.post(
  "/register",
  body("username").isString().trim().isLength({ min: 6, max: 30 }),
  body("password").isString().isLength({ min: 8, max: 100 }),
  body("email").isString().isLength({ min: 6, max: 254 }).normalizeEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, email } = req.body;

    const results = await User.usernameOrEmailIsTaken(username, email);

    if (results.emailIsTaken) {
      return res.status(400).json({
        param: "email",
        message: "Email is already in use",
      });
    }
    if (results.usernameIsTaken) {
      return res.status(400).json({
        param: "username",
        message: "Username is taken",
      });
    }

    // once we know that both username and email is available create new user
    const newUser = await User.register(username, password, email);

    if (newUser === null) {
      return res.status(400).json({
        error: "Failed to register a new user",
      });
    }

    // generate token for email confirmation
    const token = encode(newUser.account.username, email);

    sendConfirmationEmail(
      email,
      "Please confirm your email address",
      `Hi ${username}, Click here to confirm your email address and activate your account\n` +
        `http://localhost:3000/auth/verify/${token}`
    );

    res.status(200).json({ username, email });
  }
);

export default router;
