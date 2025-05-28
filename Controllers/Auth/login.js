const {
  generateAccessToken,
  generateRefreshToken,
} = require("@Utils/jwt.utils");
const { successResponse, catchAsync } = require("@Utils/apis.util");

const login = catchAsync(async (req, res, next) => {
  const accessToken = generateAccessToken(
    { userId: req.user.userId },
    process.env.ACCESS_TOKEN_EXPIRY
  );
  const refreshToken = generateRefreshToken(
    { userId: req.user.userId },
    process.env.REFRESH_TOKEN_EXPIRY
  );

  return successResponse.sendData(res, {
    status: 200,
    message: "Successful Login",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

module.exports = login
