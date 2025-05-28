const router = require("express").Router();
const { validateData } = require("@Middleware");
const { idValidationSchema } = require("@Schema");
const passportAuth = require("@Utils/passport.utils");
const { createLike, getLike, deleteLike } = require("@Controllers/Like");

router.post(
  "/create",
  validateData(idValidationSchema),
  passportAuth("jwt-access", { session: false }),
  createLike
);

router.delete(
  "/delete",
  validateData(idValidationSchema),
  passportAuth("jwt-access", { session: false }),
  deleteLike
);

module.exports = router;
