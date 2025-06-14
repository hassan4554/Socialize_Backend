const { catchAsync, successResponse, AppError } = require("@Utils");
const { get_posts, get_posts_count } = require("@Service/post.service");
const { checkProfileEligibility } = require("@Service/mix.service");
const db = require("@Models");
const { DB_TABLES } = require("@Constants");

const getAllPosts = catchAsync(async (req, res, next) => {
  // const ownAccount = req.query.ownAccount === "true";
  // const { profileId } = ownAccount ? req.user.Profile : req.query;

  const { profileId } = req.user.Profile;
  const { id } = req.query;
  if (!profileId) return next(new AppError("Error finding posts"), 404);

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const offset = (page - 1) * limit;

  if (!ownAccount) {
    const isEligible = await checkProfileEligibility(profileId, id);
    if (!isEligible) return next(new AppError("Private Account", 400));
  }

  const totalPosts = await get_posts_count({ profileId });

  const posts = await get_posts(
    { profileId: id },
    {
      include: [
        { model: db[DB_TABLES.Like] },
        {
          model: db[DB_TABLES.Comment],
          attributes: [
            "commentId",
            "postId",
            "content",
            "createdAt",
            "updatedAt",
          ],
        },
        { model: db[DB_TABLES.Attachment] },
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    }
  );
  if (!posts || posts.length === 0)
    return next(new AppError("No post found", 404));

  const totalPages = Math.ceil(totalPosts / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return successResponse.sendData(res, {
    status: 200,
    message: "Posts found",
    data: {
      posts: posts,
      currentPage: page,
      totalPages,
      totalPosts,
      hasNextPage,
      hasPrevPage,
      limit,
      nextPage: hasNextPage ? page + 1 : null,
      prevPage: hasPrevPage ? page - 1 : null,
    },
  });
});

module.exports = getAllPosts;
