const router = require("express").Router();
const { signup, login, me, refreshToken } = require("@Controllers/Auth");
const { validateData } = require("@Middleware");
const passportAuth = require("@Utils/passport.utils");
const {
  userValidationSchema,
  otpValidationSchema,
  emailValidationSchema,
  loginValidationSchema,
} = require("@Schema");
const { sendOtp, verifyOtp } = require("@Middleware");

router.post(
  "/signup",
  validateData(userValidationSchema),
  passportAuth("jwt-otp", { session: false }),
  signup
);

router.post(
  "/login",
  validateData(loginValidationSchema),
  passportAuth("local"),
  login
);

router.post("/send-otp", validateData(emailValidationSchema), sendOtp);

router.post("/verify-otp", validateData(otpValidationSchema), verifyOtp);

router.get("/me", passportAuth("jwt-access", { session: false }), me);

router.post(
  "/refreshToken",
  passportAuth("jwt-refresh", { session: false }),
  refreshToken
);

module.exports = router;
