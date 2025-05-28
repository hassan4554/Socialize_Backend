const { AppError,catchAsync, successResponse } = require("@Utils");
const { passwordUpdate } = require("@Service/user.service");

const update_password = catchAsync(async (req, res, next) => {
  const { status, message, error } = await passwordUpdate(
    req.user.userId,
    req.body.password,
    req.body.newPassword
  );

  if (error) return next(new AppError(error, status));

  return successResponse.sendData(res, {
    status,
    message,
  });
});
module.exports = update_password;
