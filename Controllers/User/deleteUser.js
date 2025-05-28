const { AppError, catchAsync, successResponse } = require("@Utils");
const { deleteUser } = require("@Service/user.service");

const delete_user = catchAsync(async (req, res, next) => {
  const { status, error, message } = deleteUser(req.user.userId);

  if (error) return next(new AppError(error, status));

  return successResponse.sendData(res, {
    message,
    status,
  });
});

module.exports = delete_user;
