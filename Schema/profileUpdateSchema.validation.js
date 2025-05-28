const Joi = require("joi");

const schema = Joi.object({
  bio: Joi.string().optional(),
  isPrivate: Joi.boolean().truthy("true").falsy("false").required(),
});

module.exports = schema;
