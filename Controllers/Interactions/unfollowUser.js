const { catchAsync, successResponse, AppError } = require("@Utils");
const { deleteSingleFriend } = require("@Service/interactions.service");

const unfollowuser = catchAsync(async (req, res, next) => {
  const { profileId } = req.user.Profile;
  const friendId = req.body.id;

  const isDeleted = await deleteSingleFriend(profileId, friendId);

  if (!isDeleted)
    return next(new AppError("User not unfollowed dua to some error", 400));

  return successResponse.sendData(res, {
    status: 200,
    message: "User unfollowed",
  });
});

module.exports = unfollowuser;
