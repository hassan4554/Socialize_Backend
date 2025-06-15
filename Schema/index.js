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
const createProfileValidationSchema = require("./createProfileSchema.validation");

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
  createProfileValidationSchema,
};
