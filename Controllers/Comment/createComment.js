const { create_comment } = require("@Service/comment.service");
const { catchAsync, successResponse, AppError } = require("@Utils");

const createComment = catchAsync(async (req, res, next) => {
  const commentedBy = req.user.Profile.profileId;
  const { content, postId } = req.body;

  const comment = await create_comment({ commentedBy, postId, content });
  if (!comment) return next(new AppError("Error creating comment", 400));

  return successResponse.sendData(res, {
    status: 200,
    message: "Comment created successfully",
    data: comment,
  });
});

module.exports = createComment;
