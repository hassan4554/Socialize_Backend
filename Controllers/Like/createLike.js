const { findOrCreateLike } = require("@Service/like.service");
const { catchAsync, successResponse, AppError } = require("@Utils");

const createLike = catchAsync(async (req, res, next) => {
  const postId = req.body.id;
  const { profileId } = req.user.Profile;

  const [like, created] = await findOrCreateLike({
    postId,
    likedBy: profileId,
  });

  if (!like) return next(new AppError("Error liking the post", 400));

  return successResponse.sendData(res, {
    status: 200,
    message: "Liked post"
  });
});

module.exports = createLike;
