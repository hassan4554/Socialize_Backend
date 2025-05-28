const { update_comment } = require("@Service/comment.service");
const { catchAsync, successResponse, AppError } = require("@Utils");

const updateComment = catchAsync(async (req, res, next) => {
  const commentedBy = req.user.Profile.profileId;
  const { commentId, content } = req.body;

  const updatedComment = await update_comment(
    { content },
    { commentId, commentedBy },
    { individualHooks: true }
  );
  if (!updatedComment) return next(new AppError("Error updating comment", 400));

  return successResponse.sendData(res, {
    status: 200,
    message: "Comment updated successfully",
    data: updatedComment,
  });
});

module.exports = updateComment;
