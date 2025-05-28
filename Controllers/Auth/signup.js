const { createUser } = require("@Service/user.service");
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
  const user = await createUser(userData);

  if (!user) return next(new AppError("User already present", 400));

  const [profile, created] = await findOrCreateProfile({
    username: userData.username,
    userId: user.userId,
  });

  if (!created) return next(new AppError("Profile already exists", 400));

  const accessToken = generateAccessToken(
    { userId: user.userId },
    process.env.ACCESS_TOKEN_EXPIRY
  );
  const refreshToken = generateRefreshToken(
    { userId: user.userId },
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
