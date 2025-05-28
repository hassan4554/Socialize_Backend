const Joi = require("joi");

const schema = Joi.object({
  ownAccount: Joi.boolean().truthy("true").falsy("false").required(),
  profileId: Joi.string().uuid({ version: "uuidv4" }).optional(),
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
});

module.exports = schema;
