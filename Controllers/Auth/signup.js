const { createUserTransaction } = require("@Service/user.service");
const { findOrCreateProfile } = require("@Service/profile.service");
const {
  AppError,
  successResponse,
  catchAsync,
  generateAccessToken,
  generateRefreshToken,
} = require("@Utils");

const signup = catchAsync(async (req, res, next) => {
  req.body.email = req.user.email;
  const userData = req.body;

  const result = await createUserTransaction(userData);

  if (!result.done) {
    return next(new AppError(result.message, 400));
  }

  const accessToken = generateAccessToken(
    { userId: result.userId },
    process.env.ACCESS_TOKEN_EXPIRY
  );
  const refreshToken = generateRefreshToken(
    { userId: result.userId },
    process.env.REFRESH_TOKEN_EXPIRY
  );

  return successResponse.sendData(res, {
    status: 200,
    message: "User created successfully",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

module.exports = signup;
