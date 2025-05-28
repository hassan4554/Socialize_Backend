const Joi = require("joi");

const Schema = Joi.object({
  id: Joi.string().uuid({ version: "uuidv4" }).required(),
});

module.exports = Schema;
