const router = require("express").Router();
const { validateData, upload } = require("@Middleware");
const {
  usernameValidationSchema,
  queryParamValidationSchema,
  profileUpdateValidationSchema,
} = require("@Schema");
const passportAuth = require("@Utils/passport.utils");
const {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} = require("@Controllers/Profile");

router.post(
  "/create",
  validateData(usernameValidationSchema),
  passportAuth("jwt-access", { session: false }),
  createProfile
);

router.get(
  "/get",
  validateData(queryParamValidationSchema, "query"),
  passportAuth("jwt-access", { session: false }),
  getProfile
);

router.patch(
  "/update",
  passportAuth("jwt-access", { session: false }),
  upload.single("profilePicture"),
  validateData(profileUpdateValidationSchema),
  updateProfile
);

router.delete(
  "/delete",
  passportAuth("jwt-access", { session: false }),
  deleteProfile
);

module.exports = router;
