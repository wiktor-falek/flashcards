import { Router } from "express";
import { param, validationResult } from "express-validator";
import logger from "../../../logger.js";
import User from "../../db/models/User.js";

import { decode } from "../../utils/token.js";

const router = Router();

router.get("/verify", (req, res) => {
  res.status(200).json({ where: "token" });
});

router.get(
  "/verify/:token",
  param("token").isString().isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const token = req.params.token;

    let tokenData;
    try {
      tokenData = decode(token);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Invalid token" });
    }

    const { username, email } = tokenData;

    const user = await User.getUserByName(username);

    if (user === null) {
      res.status(404).json({ error: "User does not exist" });
    }

    if (user.account.confirmedEmail !== null) {
      return res.status(400).send("Email is already verified");
    }

    // token email matches current unconfirmed email and not already taken

    if (email !== user.account.email) {
      return res.status(400).send("Something went wrong");
    }

    if (await User.emailIsTaken(email)) {
      return res.status(400).send("This email is already in use");
    }

    try {
      const updatedUser = await User.collection.findOneAndUpdate(
        { "account.username": username },
        { $set: { "account.confirmedEmail": email } }
      );
      console.log(user);
      return res.status(200).send("Your email has been confirmed");
    } catch (e) {
      logger.error(`Could not confirm email, ${e}`);
    }
  }
);

export default router;
