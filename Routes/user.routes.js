const router = require("express").Router();
const { validateData } = require("@Middleware");
const {
  delete_user,
  update_user,
  update_password,
  get_user,
} = require("@Controllers/User");
const passportAuth = require("@Utils/passport.utils");
const { passwordValidationSchema } = require("@Schema");

router.get(
  "/getuser",
  passportAuth("jwt-access", { session: false }),
  get_user
);

router.delete("/", passportAuth("jwt-access", { session: false }), delete_user);

router.patch("/", passportAuth("jwt-access", { session: false }), update_user);

router.patch(
  "/update-password",
  validateData(passwordValidationSchema),
  passportAuth("jwt-access", { session: false }),
  update_password
);

module.exports = router;
