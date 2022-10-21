import { Router } from "express";
import { body, param, validationResult } from "express-validator";

import User from "../../db/models/User.js";
import logger from "../../../logger.js";

const router = Router();

router.get("/flashcard", async (req, res) => {
  const { userId } = res.locals;

  const result = await User.collection.findOne(
    { _id: userId },
    { projection: { flashcards: 1, _id: 0 } }
  );

  if (result === null) {
    logger.warn(`User ${userId.toString()} not found. How?`);
    return res.status(400).json({ error: "" });
  }

  res.status(200).json(result);
});

router.post(
  "/flashcard",
  body("front").isString().trim().isLength({ min: 1, max: 512 }),
  body("back").isString().trim().isLength({ min: 1, max: 512 }),
  body("code").optional().isString().trim().isLength({ min: 0, max: 512 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { userId } = res.locals;

    const { front, back, code } = req.body;
    console.log({ front, back, code });

    // query

    res.status(200).json({ front, back, code });
  }
);

router.update(
  "/flashcard/:id",
  param("id").isString().isLength({ min: 24, max: 24 }),
  // body validation
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //
  }
);

router.delete(
  "/flashcard/:id",
  param("id").isString().isLength({ min: 24, max: 24 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //
  }
);

export default router;
