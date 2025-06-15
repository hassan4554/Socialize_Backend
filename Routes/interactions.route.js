const router = require("express").Router();
const passportAuth = require("@Utils/passport.utils");
const {
  followUser,
  getFollowing,
  getFollowers,
  unfollowUser,
} = require("@Controllers/Interactions");

const { validateData } = require("@Middleware");
const { idValidationSchema } = require("@Schema");

router.post(
  "/follow",
  validateData(idValidationSchema),
  passportAuth("jwt-access", { session: false }),
  followUser
);

router.get(
  "/get-following",
  validateData(idValidationSchema, "query"),
  passportAuth("jwt-access", { session: false }),
  getFollowing
);

router.get(
  "/get-followers",
  validateData(idValidationSchema, "query"),
  passportAuth("jwt-access", { session: false }),
  getFollowers
);

router.delete(
  "/unfollow",
  validateData(idValidationSchema),
  passportAuth("jwt-access", { session: false }),
  unfollowUser
);

module.exports = router;
