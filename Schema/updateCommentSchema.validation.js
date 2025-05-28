const joi = require("joi");

const schema = joi.object({
  commentId: joi.string().uuid({ version: "uuidv4" }).required(),
  content: joi.string().required(),
});

module.exports = schema;
