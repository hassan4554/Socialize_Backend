const { catchAsync, successResponse, AppError } = require("@Utils");
const { get_comment } = require("@Service/comment.service");
const { get_profile } = require("../../Service/profile.service");

const getAllComments = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  let comments = await get_comment({ postId: id });

  if (!comments) return next(new AppError("Comment not found", 404));

  comments = await Promise.all(
    comments.map(async (element) => {
      const profile = await get_profile({ profileId: element.commentedBy });
      element.dataValues.Profile = profile;
      return element;
    })
  );

  console.log("promise err");
  console.log(comments);
  return successResponse.sendData(res, {
    status: 200,
    message: "Comment found",
    data: comments,
  });
});
module.exports = getAllComments;
