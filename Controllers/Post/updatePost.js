const { catchAsync, successResponse, AppError } = require("@Utils");
const { update_post, get_posts } = require("@Service/post.service");
const { saveFinalPost, deleteTempPost } = require("@Utils");

const updatePost = catchAsync(async (req, res, next) => {
  const { profileId } = req.user.Profile;
  const { postId } = req.body;
  const updates = req.body;
  const [post] = await get_posts({ postId }, { attibutes: ["postUrl"] });

  if (!post) return next(new AppError("Post not found", 404));

  const restrictedFields = ["profileId", "postId", "postUrl", "isPublished"];

  const allowedUpdates = Object.keys(updates).reduce((acc, key) => {
    if (!restrictedFields.includes(key)) {
      acc[key] = updates[key];
    }
    return acc;
  }, {});

  if (Object.keys(allowedUpdates).length === 0)
    return next(new AppError("No valid data provided for update", 400));

  if (req.file) {
    const finalPath = saveFinalPost(profileId, postId, req.file).split(
      "Posts"
    )[1];
    allowedUpdates.postUrl = `Posts` + finalPath;
  }

  if (post.postUrl) deleteTempPost(post.postUrl);

  const [rowsUpdated, [updatedPost]] = await update_post(
    { allowedUpdates },
    { postId },
    {
      returning: true,
      individualHooks: true,
    }
  );

  console.log("updatedPost");
  console.log(updatedPost);

  if (!updatedPost) return next(new AppError("Post not updated", 400));
  return successResponse.sendData(res, {
    message: "Profile updated successfully",
    data: updatedPost,
    status: 200,
  });
});

module.exports = updatePost;
