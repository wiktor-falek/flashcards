import { Router } from "express";
import { body, param, validationResult } from "express-validator";

import User from "../../db/models/User.js";
import flashcardSchema from "../../db/schemas/flashcardSchema.js";
import logger from "../../../logger.js";
import { ObjectId } from "mongodb";
import extract from "../../db/utils/extract.js";

const router = Router();

router.get("/flashcard", async (req, res) => {
  const { userId } = res.locals;

  const result = await User.collection.findOne(
    { _id: userId },
    { projection: { flashcards: 1, memorized: 1, _id: 0 } }
  );

  if (result === null) {
    logger.warn(`User ${userId.toString()} not found. How?`);
    return res.status(400).json({ error: "" });
  }

  res.status(200).json(result);
});

router.post(
  "/flashcard",
  body("front").isString().trim().isLength({ max: 512 }),
  body("back").isString().trim().isLength({ max: 512 }),
  body("code").optional().isString().trim().isLength({ max: 512 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { userId } = res.locals;
    const { front, back, code } = req.body;

    const flashcard = { front, back, code, reviewedCount: 0 };

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

// increments reviewedCount by 1
router.post(
  "/flashcard/increment/:id",
  param("id").isString().isLength({ min: 24, max: 24 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = res.locals;
    const flashcardId = req.params.id;

    const filter = {
      _id: userId,
      flashcards: {
        $elemMatch: { _id: ObjectId(flashcardId) },
      },
    };

    const update = {
      $inc: { "flashcards.$.reviewedCount": 1 },
    };

    const options = {
      returnDocument: "after",
      projection: {
        flashcards: {
          $elemMatch: { _id: ObjectId(flashcardId) },
        },
      },
    };

    const result = await User.collection.findOneAndUpdate(
      filter,
      update,
      options
    );

    console.log(result);
    if (result === null) {
      return res
        .status(400)
        .json({ error: "Failed to increment reviewedCount." });
    }

    res.status(200).json(result.value);
  }
);

router.post(
  "/flashcard/move/flashcards/:id",
  param("id").isString().isLength({ min: 24, max: 24 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId } = res.locals;
    const flashcardId = req.params.id;

    // atomically moves flashcard at flashcardId
    // from memorized array field to flashcards array field

    const result = await User.collection.updateOne(
      {
        _id: userId,
        memorized: { $elemMatch: { _id: ObjectId(flashcardId) } },
      },
      [
        {
          $set: {
            memorized: {
              $filter: {
                input: "$memorized",
                cond: { $ne: ["$$this._id", ObjectId(flashcardId)] },
              },
            },
            flashcards: {
              $concatArrays: [
                "$flashcards",
                [extract("$memorized", ObjectId(flashcardId))],
              ],
            },
          },
        },
      ]
    );

    console.log(result);

    res.status(200).json({ result });
  }
);

router.post(
  "/flashcard/move/memorized/:id",
  param("id").isString().isLength({ min: 24, max: 24 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = res.locals;
    const flashcardId = req.params.id;

    // this works, unless you try to move to the collection where flashcard already exists
    // when that happens it inserts null, trying to find a fix for this

    const result = await User.collection.updateOne(
      {
        _id: userId,
        flashcards: { $elemMatch: { _id: ObjectId(flashcardId) } },
      },
      [
        {
          $set: {
            flashcards: {
              $filter: {
                input: "$flashcards",
                cond: { $ne: ["$$this._id", ObjectId(flashcardId)] },
              },
            },
            memorized: {
              $concatArrays: [
                "$memorized",
                [extract("$flashcards", ObjectId(flashcardId))],
              ],
            },
          },
        },
      ]
    );

    console.log(result);

    res.status(200).json({ result });
  }
);

router.patch(
  "/flashcard/:id",
  param("id").isString().isLength({ min: 24, max: 24 }),
  body("front").optional().isString().trim().isLength({ min: 0, max: 256 }),
  body("back").optional().isString().trim().isLength({ min: 0, max: 256 }),
  body("code").optional().isString().trim().isLength({ min: 0, max: 1024 }),
  body("reviewedCount").optional().isNumeric(),
  body("tags.*").optional().isString().trim().isLength({ min: 1, max: 32 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = res.locals;
    const flashcardId = req.params.id;
    const { front, back, code } = req.body;

    const reviewedCount = parseInt(req.body.reviewedCount);

    // im gonna go insane with this shit
    let tags = req.body.tags;
    if (typeof tags === "string") {
      try {
        tags = JSON.parse(tags);
        if (!Array.isArray(tags)) {
          throw new Error("I love javascript :))))");
        }
      } catch (e) {
        return res.status(400).json({
          error: "Field 'tags' must be a valid JSON array of strings.",
        });
      }
      for (const item of tags) {
        if (typeof item !== "string") {
          return res.status(400).json({
            error: "All items of array 'tags' must consist of strings.",
          });
        }
      }
    }

    // if (!front && !back && !code && !reviewedCount && !tags) {
    //   return res.status(400).json({
    //     error:
    //       "Body must contain at least one of fields ('front', 'back', 'code', 'reviewedCount', 'tags') to update flashcard.",
    //   });
    // }

    const fields = {
      "flashcards.$.front": front,
      "flashcards.$.back": back,
      "flashcards.$.code": code,
      "flashcards.$.reviewedCount": reviewedCount,
      "flashcards.$.tags": tags,
    };

    // remove keys from fields where value is undefined or null or NaN
    Object.keys(fields).forEach(
      (key) =>
        [undefined, null, NaN].includes(fields[key]) && delete fields[key]
    );

    const filter = {
      flashcards: {
        $elemMatch: { _id: ObjectId(flashcardId) },
      },
    };

    const update = {
      $set: fields,
    };

    const options = {
      returnDocument: "after",
      projection: {
        flashcards: {
          $elemMatch: { _id: ObjectId(flashcardId) },
        },
      },
    };

    const result = await User.collection.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (result.value === null) {
      return res.status(400).json({ error: "Failed to update a flashcard." });
    }

    const updatedFlashcard = result.value.flashcards[0];

    res.status(200).json(updatedFlashcard);
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

    const result = await User.collection.updateOne(
      { _id: userId },
      { $pull: { flashcards: { _id: ObjectId(flashcardId) } } }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(400)
        .json({ error: `Flashcard with id '${flashcardId}' does not exist.` });
    }

    res.status(200).json({ flashcardId });
  }
);

export default router;
