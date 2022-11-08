import Joi from "joi";

const flashcardSchema = Joi.object({
  front: Joi.string()
    .required()
    .max(256),
  back: Joi.string()
    .required()
    .max(256),
  code: Joi.string()
    .max(1024),
  reviewedCount: Joi.number()
  .min(0)
  .default(0),
  tags: Joi.array().items(Joi.string())
  .default([]),
  creationTimestamp: Joi.number()
  .default(Date.now()),
});

export default flashcardSchema;
