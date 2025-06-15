const { delete_comment } = require("@Service/comment.service");
const { catchAsync, successResponse, AppError } = require("@Utils");

const deleteComment = catchAsync(async (req, res, next) => {
  const commentedBy = req.user.Profile.profileId;
  const commentId = req.query.id;

  const isDeleted = await delete_comment({ commentId, commentedBy });
  if (!isDeleted) return next(new AppError("Comment not deleted", 400));

  return successResponse.sendData(res, {
    status: 200,
    message: "Comment deleted successfully",
  });
});

module.exports = deleteComment;
