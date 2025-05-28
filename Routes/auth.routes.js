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

/**
 * @swagger
 * auth/signup:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Register a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - username
 *              - contact
 *              - password
 *              - confirmPassword
 *            properties:
 *              name:
 *                type: string
 *                minLength: 3
 *                maxLength: 50
 *                pattern: '^[a-zA-Z\s]+$'
 *                example: "John Doe"
 *              username:
 *                type: string
 *                minLength: 3
 *                maxLength: 30
 *                pattern: '^[a-z0-9_.]+$'
 *                example: "john_doe123"
 *              contact:
 *                type: string
 *                pattern: '^[0-9]+$'
 *                minLength: 12
 *                maxLength: 12
 *                example: "123456789012"
 *              password:
 *                type: string
 *                minLength: 8
 *                maxLength: 50
 *                format: password
 *                example: "Password1@"
 *              confirmPassword:
 *                type: string
 *                example: "Password1@"
 *    responses:
 *      200:
 *        description: User registered successfully
 *      400:
 *        description: Validation error
 *      409:
 *        description: Username or email already exists
 */
router.post(
  "/signup",
  validateData(userValidationSchema),
  passportAuth("jwt-otp", { session: false }),
  signup
);

/**
 * @swagger
 *auth/login:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Login a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *                example: "user@example.com"
 *              password:
 *                type: string
 *                format: password
 *                example: "Password1@"
 *    responses:
 *      200:
 *        description: Login successful
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                refreshToken:
 *                  type: string
 *      400:
 *        description: Invalid credentials
 *      404:
 *         description: User not  found
 */
router.post(
  "/login",
  validateData(loginValidationSchema),
  passportAuth("local"),
  login
);

/**
 * @swagger
 * auth/send-otp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Request OTP for email verification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Invalid email
 */
router.post("/send-otp", validateData(emailValidationSchema), sendOtp);

/**
 * @swagger
 * auth/verify-otp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Verify OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               otp:
 *                 type: string
 *                 pattern: '^\d{6}$'
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP
 */

router.post("/verify-otp", validateData(otpValidationSchema), verifyOtp);

router.get("/me", passportAuth("jwt-access", { session: false }), me);

router.post(
  "/refreshToken",
  passportAuth("jwt-refresh", { session: false }),
  refreshToken
);

module.exports = router;
