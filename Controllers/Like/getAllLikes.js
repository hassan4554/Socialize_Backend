const { catchAsync, successResponse, AppError } = require("@Utils");
const { get_like } = require("@Service/like.service");
const { get_profile } = require("../../Service/profile.service");

const getAllLikes = catchAsync(async (req, res, next) => {
  const { profileId } = req.user.Profile;
  const { id } = req.query;
  let likes = await get_like({ postId: id });

  if (!likes) return next(new AppError("Likes not found", 404));
  let isLiked = false;

  likes = await Promise.all(
    likes.map(async (element) => {
      if (element.likedBy === profileId) isLiked = true;
      const profile = await get_profile({ profileId: element.likedBy });
      element.dataValues.Profile = profile;
      return element;
    })
  );

  return successResponse.sendData(res, {
    status: 200,
    message: "Likes found!",
    data: {
      likes,
      isLiked,
    },
  });
});
module.exports = getAllLikes;
