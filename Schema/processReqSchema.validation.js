const joi = require("joi");

const schema = joi.object({
  requestId: joi.string().uuid({ version: "uuidv4" }).required(),
  status: joi.string().valid("rejected", "accepted").required(),
});

module.exports = schema;
