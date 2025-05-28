// createCommentValidationSchema
const joi = require("joi");

const createCommentSchema = joi.object({
  postId: joi.string().uuid({ version: "uuidv4" }).required(),
  content: joi.string().required(),
});

module.exports = createCommentSchema;


// emailValidationSchema
const Joi = require("joi");
const emailValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
});

module.exports = emailValidationSchema;

// idValidationSchema
const Joi = require("joi");

const Schema = Joi.object({
  id: Joi.string().uuid({ version: "uuidv4" }).required(),
});

module.exports = Schema;

// loginValidationSchema
const Joi = require("joi");
const loginValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(8)
    .max(50)
    .required()
    .custom((value, helpers) => {
      if (!/[a-z]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one lowercase letter",
        });
      if (!/[A-Z]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one uppercase letter",
        });
      if (!/\d/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one digit",
        });
      if (!/[@$!%*,?&]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one special character",
        });

      return value;
    })
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
      "any.invalid": "{{#message}}",
    }),
});

module.exports = loginValidationSchema;


// otpValidationSchema
const Joi = require("joi");

const otpValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
  otp: Joi.string().length(6).pattern(/^\d+$/).required().messages({
    "string.length": "OTP must be 6 digits",
    "string.pattern.base": "OTP must contain only numbers",
    "any.required": "OTP is required",
  }),
});

module.exports = otpValidationSchema;

// passwordValidationSchema
const Joi = require("joi");
const passwordValidationSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(50)
    .required()
    .custom((value, helpers) => {
      if (!/[a-z]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one lowercase letter",
        });
      if (!/[A-Z]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one uppercase letter",
        });
      if (!/\d/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one digit",
        });
      if (!/[@$!%*,?&]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one special character",
        });

      return value;
    })
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
      "any.invalid": "{{#message}}",
    }),
  newPassword: Joi.string()
    .min(8)
    .max(50)
    .required()
    .custom((value, helpers) => {
      if (!/[a-z]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one lowercase letter",
        });
      if (!/[A-Z]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one uppercase letter",
        });
      if (!/\d/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one digit",
        });
      if (!/[@$!%*,?&]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one special character",
        });

      return value;
    })
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
      "any.invalid": "{{#message}}",
    }),
  confirmNewPassword: Joi.string()
    .required()
    .valid(Joi.ref("newPassword"))
    .messages({
      "any.only": "Confirm password must match the password",
      "any.required": "Confirm password is required",
    }),
});

module.exports = passwordValidationSchema;


// postUpdateValidationSchema
const Joi = require("joi");

const postUpdateValidationSchema = Joi.object({
  title: Joi.string().optional(),
  postUrl: Joi.any().optional(),
  postId: Joi.string().uuid({ version: "uuidv4" }).required(),
});

module.exports = postUpdateValidationSchema;


// processReqValidationSchema
const joi = require("joi");

const processReqValidationSchema = joi.object({
  requestId: joi.string().uuid({ version: "uuidv4" }).required(),
  status: joi.string().valid("rejected", "accepted").required(),
});

module.exports = processReqValidationSchema;


// profileUpdateValidationSchema
const Joi = require("joi");

const profileUpdateValidationSchema = Joi.object({
  bio: Joi.string().optional(),
  isPrivate: Joi.boolean().truthy("true").falsy("false").required(),
});

module.exports = profileUpdateValidationSchema;

// queryParamValidationSchema
const Joi = require("joi");

const queryParamValidationSchema = Joi.object({
  ownAccount: Joi.boolean().truthy("true").falsy("false").required(),
  profileId: Joi.string().uuid({ version: "uuidv4" }).optional(),
});

module.exports = queryParamValidationSchema;


// updateCommentValidationSchema
const joi = require("joi");

const updateCommentValidationSchema = joi.object({
  commentId: joi.string().uuid({ version: "uuidv4" }).required(),
  content: joi.string().required(),
});

module.exports = updateCommentValidationSchema;


// usernameValidationSchema
const Joi = require("joi");

const usernameValidationSchema = Joi.object({
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
});

module.exports = usernameValidationSchema;


// userValidationSchema
const Joi = require("joi");

const userValidationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      "string.min": "Name must be at least 3 characters long",
      "string.pattern.base": "Name can only contain letters and spaces",
      "any.required": "Name is required",
    }),

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
  contact: Joi.string()
    .length(12)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.length": "Contact number must be exactly 12 digits",
      "string.pattern.base": "Contact number must contain only digits",
      "any.required": "Contact number is required",
    }),

  password: Joi.string()
    .min(8)
    .max(50)
    .required()
    .custom((value, helpers) => {
      if (!/[a-z]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one lowercase letter",
        });
      if (!/[A-Z]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one uppercase letter",
        });
      if (!/\d/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one digit",
        });
      if (!/[@$!%*,?&]/.test(value))
        return helpers.error("any.invalid", {
          message: "Password must include at least one special character",
        });

      return value;
    })
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
      "any.invalid": "{{#message}}",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Confirm password must match the password",
    "any.required": "Confirm password is required",
  }),
});

module.exports = userValidationSchema;


// index.js
const emailValidationSchema = require("./emailSchema.validation");
const otpValidationSchema = require("./otpSchema.validation");
const loginValidationSchema = require("./loginSchema.validation");
const passwordValidationSchema = require("./passwordSchema.validation");
const userValidationSchema = require("./userSchema.validation");
const queryParamValidationSchema = require("./querySchema.validation");
const usernameValidationSchema = require("./usernameSchema.validation");
const profileUpdateValidationSchema = require("./profileUpdateSchema.validation");
const idValidationSchema = require("./idSchema.validation");
const postUpdateValidationSchema = require("./postUpdateSchema.validation");
const processReqValidationSchema = require("./processReqSchema.validation");
const createCommentValidationSchema = require("./createCommentSchema.validation");
const updateCommentValidationSchema = require("./updateCommentSchema.validation");

module.exports = {
  passwordValidationSchema,
  otpValidationSchema,
  emailValidationSchema,
  loginValidationSchema,
  userValidationSchema,
  queryParamValidationSchema,
  usernameValidationSchema,
  profileUpdateValidationSchema,
  idValidationSchema,
  postUpdateValidationSchema,
  processReqValidationSchema,
  createCommentValidationSchema,
  updateCommentValidationSchema,
};


