const router = require("express").Router();
const {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
} = require("@Controllers/Post");
const passportAuth = require("@Utils/passport.utils");
const { validateData, tempUpload } = require("@Middleware");
const {
  queryParamValidationSchema,
  idValidationSchema,
  postUpdateValidationSchema,
} = require("@Schema");


router.post(
  "/create",
  passportAuth("jwt-access", { session: false }),
  createPost
);


router.get(
  "/getAllPosts",
  validateData(queryParamValidationSchema, "query"),
  passportAuth("jwt-access", { session: false }),
  getAllPosts
);

router.patch(
  "/update",
  passportAuth("jwt-access", { session: false }),
  tempUpload.single("postUrl"),
  validateData(postUpdateValidationSchema),
  updatePost
);

router.delete(
  "/delete",
  validateData(idValidationSchema, "query"),
  passportAuth("jwt-access", { session: false }),
  deletePost
);
module.exports = router;
