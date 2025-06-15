const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .custom((value, helpers) => {
      if (!/^[a-z0-9_.]+$/.test(value)) {
        return helpers.error("any.invalid", {
          message:
            "Username can only contain lowercase letters, numbers, dots, and underscores",
        });
      }
      if (/^[._]/.test(value)) {
        return helpers.error("any.invalid", {
          message: "Username cannot start with a dot or underscore",
        });
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("any.invalid", {
          message: "Username must include at least one lowercase letter",
        });
      }
      return value;
    })
    .messages({
      "string.min": "Username must be at least 3 characters long",
      "any.required": "Username is required",
      "any.invalid": "{{#message}}", // Custom messages from the validation logic
    }),
  bio: Joi.string().optional(),
  isPrivate: Joi.boolean().truthy("true").falsy("false").required(),
});

module.exports = schema;
