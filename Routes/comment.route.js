const router = require("express").Router();
const { validateData } = require("@Middleware");
const passportAuth = require("@Utils/passport.utils");
const {
  createCommentValidationSchema,
  idValidationSchema,
  updateCommentValidationSchema,
} = require("@Schema");
const {
  createComment,
  getComment,
  updateComment,
  deleteComment,
} = require("@Controllers/Comment");

router.post(
  "/create",
  validateData(createCommentValidationSchema),
  passportAuth("jwt-access", { session: false }),
  createComment
);

router.get(
  "/get",
  validateData(idValidationSchema, "query"),
  passportAuth("jwt-access", { session: false }),
  getComment
);

router.patch(
  "/update",
  validateData(updateCommentValidationSchema),
  passportAuth("jwt-access", { session: false }),
  updateComment
);

router.delete(
  "/delete",
  validateData(idValidationSchema),
  passportAuth("jwt-access", { session: false }),
  deleteComment
);

module.exports = router;
