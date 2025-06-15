const { catchAsync, successResponse, AppError } = require("@Utils");
const { findAllFriends } = require("@Service/interactions.service");
const { checkProfileEligibility } = require("@Service/mix.service");
const { get_profile } = require("@Service/profile.service");

const getFollower = catchAsync(async (req, res, next) => {
  const { profileId } = req.user.Profile;
  const { id } = req.query;
  const ownAccount = profileId === id;

  if (!profileId) return next(new AppError("Error finding profile data"), 404);

  if (!ownAccount) {
    const isEligible = await checkProfileEligibility(profileId, id);
    if (!isEligible) return next(new AppError("Private Account", 400));
  }

  let { rows } = await findAllFriends({ friendId: id });
  rows = await Promise.all(
    rows.map(async (row) => {
      const profile = await get_profile({ profileId: row.userId });
      row.dataValues.Profile = profile;
      return row;
    })
  );
  return successResponse.sendData(res, {
    status: 200,
    messages: "Followers found",
    data: rows,
  });
});

module.exports = getFollower;
