const { catchAsync, successResponse, AppError } = require("@Utils");
const { delete_post } = require("@Service/post.service");
const { deletePostData } = require("@Utils");

const deletePost = catchAsync(async (req, res, next) => {
  const { profileId } = req.user.Profile;
  const postId = req.query.id;

  const isDeleted = await delete_post({ postId, profileId });
  if (!isDeleted) return next(new AppError("Error deleting post", 400));

  deletePostData(profileId, postId);

  return successResponse.sendData(res, {
    status: 200,
    message: "Post deleted successfully",
  });
});

module.exports = deletePost;
