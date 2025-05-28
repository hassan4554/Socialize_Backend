const { sendEmail } = require("@Configs/nodemailer.config");
const db = require("@Models");
const { DB_TABLES } = require("@Constants");
const {
  AppError,
  catchAsync,
  successResponse,
  generateAccessToken,
} = require("@Utils");
const crypto = require("crypto");

const generateOTP = () => crypto.randomInt(100000, 999999).toString();

const sendOtp = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const otp = generateOTP();
  const otpExpiry = Date.now() + 10 * 60 * 1000;

  const otpUser = await db[DB_TABLES.Otp].upsert({
    email,
    otp,
    otpExpiry,
    isUsed: false,
  });

  const done = await sendEmail(
    process.env.EMAIL_USER,
    email,
    "Your OTP Code",
    `Your OTP is: ${otp}. It expires in 10 minutes.`
  );
  if (!otpUser || !done) return next(new AppError("Error sending OTP", 500));

  return successResponse.sendData(res, {
    status: 200,
    message: "OTP sent successfully",
  });
});

const verifyOtp = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  const otpUser = await db[DB_TABLES.Otp].findOne({
    where: { email },
  });

  if (!otpUser || otpUser.otp !== otp || otpUser.otpExpiry < Date.now()) {
    return next(new AppError("Invalid or expired OTP!", 400));
  }

  if (otpUser.isUsed) return next(new AppError("OTP already used", 400));

  await otpUser.update({ isUsed: true });

  const accessToken = generateAccessToken(
    { email },
    process.env.TEMPORARY_TOKEN_EXPIRY
  );

  return successResponse.sendData(res, {
    status: 200,
    message: "OTP verified successfully",
    data: {
      accessToken,
    },
  });
});

module.exports = { sendOtp, verifyOtp };
