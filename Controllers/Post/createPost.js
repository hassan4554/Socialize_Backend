const { catchAsync, successResponse, AppError } = require("@Utils");
const { createPostTransaction, } = require("@Service/post.service");

const createPost = catchAsync(async (req, res, next) => {

  const result = await createPostTransaction(
    req,
    res,
    next
  );

  if(!result) return next(new AppError("Error creating post", 400))

  return successResponse.sendData(res, {
    status: 200,
    message: "Post created successfully",
    data: result,
  });
});

module.exports = createPost;
