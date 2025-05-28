const joi = require("joi");

const createCommentSchema = joi.object({
  postId: joi.string().uuid({ version: "uuidv4" }).required(),
  content: joi.string().required(),
});

module.exports = createCommentSchema;
