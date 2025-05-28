const { catchAsync, successResponse, AppError } = require("@Utils");
const { findOneUser } = require("@Service/user.service");

const get_user = catchAsync(async (req, res, next) => {
  const { username } = req.query;
  if (!username) return next(new AppError("No username recieved", 400));

  const user = await findOneUser(
    { username },
    {
      attributes: ["name", "username", "profilePicture", "contact"],
    }
  );
  if (!user) return next(new AppError("No User found", 404));

  return successResponse.sendData(res, {
    status: 200,
    message: "User found",
    data: user,
  });
});

module.exports = get_user;
