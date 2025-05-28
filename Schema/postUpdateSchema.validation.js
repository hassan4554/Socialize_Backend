const Joi = require("joi");

const schema = Joi.object({
  title: Joi.string().optional(),
  postUrl: Joi.any().optional(),
  postId: Joi.string().uuid({ version: "uuidv4" }).required(),
});

module.exports = schema;
