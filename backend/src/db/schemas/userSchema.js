import Joi from "joi";

const userSchema = Joi.object({
  account: Joi.object({
    username: Joi.string()
      .alphanum()
      .min(6)
      .max(30)
      .required(),
    hash: Joi.string()
      .min(60)
      .max(60),
    email: Joi.string()
      .min(6)
      .max(254)
      .required(),
    confirmedEmail: Joi.string()
      .min(6)
      .max(254)
      .default(null),
    registrationTimestamp: Joi.number()
      .integer()
      .default(Date.now()),
    sessionId: Joi.string()
      .default(null),
  }),
  flashcards: Joi.array().default([]),
  memorized: Joi.array().default([]),
});

export default userSchema;

