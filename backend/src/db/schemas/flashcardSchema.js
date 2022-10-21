import Joi from "joi";

const flashcardSchema = Joi.object({
  front: Joi.string()
    .required()
    .min(1)
    .max(512),
  back: Joi.string()
    .required()
    .min(1)
    .max(512),
  code: Joi.string()
    .min(1)
    .max(512),
  creationTimestamp: Joi.number()
    .default(Date.now()),
  //metaData: Joi.object({
  //  creationTimestamp: Joi.number()
  //    .default(Date.now()),
  //}),
});

export default flashcardSchema;
