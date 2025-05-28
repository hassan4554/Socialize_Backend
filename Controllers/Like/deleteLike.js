const { catchAsync, successResponse, AppError } = require("@Utils");
const { delete_like } = require("@Service/like.service");

const deleteLike = catchAsync(async (req, res, next) => {
  const { profileId } = req.user.Profile;
  const postId = req.body.id;

  const isDeleted = await delete_like({ postId, likedBy: profileId });

  if (!isDeleted) return next(new AppError("Error unliking post", 400));

  return successResponse.sendData(res, {
    status: 200,
    message: "Post unliked successfully",
  });
});

module.exports = deleteLike;
