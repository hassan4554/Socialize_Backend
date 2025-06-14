const { catchAsync, successResponse, AppError } = require("@Utils");
const { get_posts } = require("@Service/post.service");
const { checkProfileEligibility } = require("@Service/mix.service");
const db = require("@Models");
const { DB_TABLES } = require("@Constants");

const getSinglePost = catchAsync(async (req, res, next) => {
  const { profileId } = req.user.Profile;
  const { id } = req.query;

  const ownAccount = profileId === id;
  if (!profileId) return next(new AppError("Error finding posts"), 404);

  if (!ownAccount) {
    const isEligible = await checkProfileEligibility(profileId, id);
    if (!isEligible) return next(new AppError("Private Account", 400));
  }

  const [post] = await get_posts(
    { postId: id },
    {
      include: [
        // { model: db[DB_TABLES.Like] },
        // {
        //   model: db[DB_TABLES.Comment],
        //   attributes: [
        //     "commentId",
        //     "postId",
        //     "content",
        //     "createdAt",
        //     "updatedAt",
        //   ],
        //   limit,
        //   offset,
        //   order: [["createdAt", "DESC"]],
        // },
        { model: db[DB_TABLES.Attachment] },
      ],
    }
  );
  if (!post) return next(new AppError("No post found", 404));

  return successResponse.sendData(res, {
    status: 200,
    message: "Posts found",
    data: post,
  });
});

module.exports = getSinglePost;
