const {
  generateAccessToken,
  generateRefreshToken,
  successResponse,
} = require("@Utils");

const refreshToken = (req, res, next) => {
  const accessToken = generateAccessToken(
    { userId: req.user.userId },
    process.env.ACCESS_TOKEN_EXPIRY
  );
  const refreshToken = generateRefreshToken(
    { userId: req.user.userId },
    process.env.REFRESH_TOKEN_EXPIRY
  );

  return successResponse.sendData(res, {
    message: "Token Generated Successfully",
    status: 200,
    data: {
      accessToken,
      refreshToken,
    },
  });
};
module.exports = refreshToken;
