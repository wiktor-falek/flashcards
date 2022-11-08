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
      { $set: {"account.sessionId": sessionId}}
    );

    if (result.acknowledged) {
      const [sessionId1, sessionId2] = splitInHalf(sessionId);
      res.cookie("username", username, { httpOnly: true, secure: true, sameSite: "strict" });
      res.cookie("sessionId1", sessionId1, { httpOnly: true, secure: true,  sameSite: "strict" });
      // this cookie is httpOnly=false, so the client can remove it, effectively logging out
      res.cookie("sessionId2", sessionId2, { httpOnly: false, secure: true,  sameSite: "strict" });
      return res.json({username, sessionId1, sessionId2});
    }
    res.status(400).json({ error: "Something went wrong" });
  }
);

export default router;

