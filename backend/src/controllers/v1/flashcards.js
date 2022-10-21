import { Router } from "express";
import { body, param, validationResult } from "express-validator";

import User from "../../db/models/User.js";
import flashcardSchema from "../../db/schemas/flashcardSchema.js";
import logger from "../../../logger.js";
import { ObjectID, ObjectId } from "mongodb";

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

    const flashcard = { front, back, code };

    let validatedFlashcard;
    try {
      validatedFlashcard = flashcardSchema.validate(flashcard).value;
      validatedFlashcard._id = new ObjectId();
    } catch (e) {
      logger.error(`Flashcard validation error, ${e}`);
      return res.status(400).json({ error: "Invalid flashcard data" });
    }

    const result = await User.collection.updateOne(
      { _id: userId },
      { $push: { flashcards: validatedFlashcard } }
    );

    if (!result.acknowledged) {
      return res.status(400).json({ error: "Failed to create a flashcard" });
    }

    res.status(200).json(validatedFlashcard);
  }
);

router.patch(
  "/flashcard/:id",
  param("id").isString().isLength({ min: 24, max: 24 }),
  // body validation
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // TODO
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

    const { userId } = res.locals;

    const flashcardId = req.params.id;

    console.log(flashcardId, typeof flashcardId);

    const result = await User.collection.updateOne(
      { _id: userId },
      { $pull: { flashcards: { _id: ObjectId(flashcardId) } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ error: "This flash card doesn't exist already" });
    }

    res.status(200).json({ flashcardId });
  }
);

export default router;
