const { catchAsync, successResponse, AppError } = require("@Utils");
const { get_profile } = require("@Service/profile.service");
const { checkProfileEligibility } = require("@Service/mix.service");
const { findAllFriends } = require("@Service/interactions.service");
const db = require("@Models");
const { DB_TABLES } = require("@Constants");

const getProfile = catchAsync(async (req, res, next) => {
  const ownAccount = req.query.ownAccount === "true";
  const { profileId } = ownAccount ? req.user.Profile : req.query;
  if (!profileId) return next(new AppError("Error getting profile"), 404);

  if (!ownAccount) {
    const isEligible = await checkProfileEligibility(
      req.user.Profile.profileId,
      profileId
    );
    console.log(isEligible);
    if (!isEligible) return next(new AppError("Private Account", 400));
  }

  let profile = await get_profile(
    { profileId },
    {
      include: [
        {
          model: db[DB_TABLES.Post],
          include: [
            { model: db[DB_TABLES.Like] },
            { model: db[DB_TABLES.Comment] },
          ],
        },
      ],
    }
  );

  if (!profile) return next(new AppError("No profile found!", 404));

  const followers = await findAllFriends({ friendId: profileId });
  const following = await findAllFriends({ userId: profileId });

  profile.dataValues.followers = followers;
  profile.dataValues.following = following;

  return successResponse.sendData(res, {
    status: 200,
    message: "Profile found",
    data: profile,
  });
});

module.exports = getProfile;
