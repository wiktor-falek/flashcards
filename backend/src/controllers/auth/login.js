import { Router } from "express";
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import User from "../../db/models/User.js";
import splitInHalf from "../../utils/splitInHalf.js";

const router = Router();

router.post(
  "/login",
  body("username").isString().trim().isLength({ min: 6, max: 30 }),
  body("password").isString().isLength({ min: 8, max: 100 }),
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const user = await User.getUserByName(username);

    if (user === null) {
      return res.status(401).json({
        param: "username",
        message: "Invalid username",
      });
    }

    const authenticated = await bcrypt.compare(password, user.account.hash);

    if (!authenticated) {
      return res.status(401).json({
        param: "password",
        message: "Invalid password",
      });
    }

    const sessionId = uuidv4();

    const result = await User.collection.updateOne(
      { "account.username": username },
      { $set: { "account.sessionId": sessionId } }
    );

    if (result.acknowledged) {
      const [sessionId1, sessionId2] = splitInHalf(sessionId);

      // set to false if not in production to make it work with postman
      const cookieIsSecure = process.env.NODE_ENV !== "development";

      res.cookie("username", username, {
        httpOnly: true,
        secure: cookieIsSecure,
        sameSite: "strict",
      });
      // session id is split into two halves, this one is secure
      res.cookie("sessionId1", sessionId1, {
        httpOnly: true,
        secure: cookieIsSecure,
        sameSite: "strict",
      });
      // and this one is not secure, to allow client to log out
      res.cookie("sessionId2", sessionId2, {
        httpOnly: false,
        secure: cookieIsSecure,
        sameSite: "strict",
      });
      return res.json({ username, sessionId1, sessionId2 });
    }
    res.status(400).json({ error: "Something went wrong" });
  }
);

export default router;
