const { catchAsync, successResponse, AppError } = require("@Utils");
const { findAllFriends } = require("@Service/interactions.service");
const { checkProfileEligibility } = require("@Service/mix.service");

const getFollower = catchAsync(async (req, res, next) => {
  const ownAccount = req.query.ownAccount === "true";
  const { profileId } = ownAccount ? req.user.Profile : req.query;
  if (!profileId) return next(new AppError("Error finding profile data"), 404);

  if (!ownAccount) {
    const isEligible = await checkProfileEligibility(
      req.user.Profile.profileId,
      profileId
    );
    if (!isEligible) return next(new AppError("Private Account", 400));
  }

  const { count, rows } = await findAllFriends({ friendId: profileId });
  return successResponse.sendData(res, {
    status: 200,
    messages: "ok",
    data: {
      count,
      rows,
    },
  });
});

module.exports = getFollower;
