const Joi = require("joi");
const emailValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
});

module.exports = emailValidationSchema;