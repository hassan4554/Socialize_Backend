const { catchAsync, successResponse, AppError } = require("@Utils");
const { get_comment } = require("@Service/comment.service");

const getComment = catchAsync(async (req, res, next) => {
    const { id } = req.query;
    const comment = await get_comment({ commentId: id });
    
    if (!comment) return next(new AppError("Comment not found", 404));
    return successResponse.sendData(res, {
        status: 200,
        message: "Comment found",
        data: comment
    });
});
module.exports = getComment;
