const { catchAsync, successResponse, AppError } = require("@Utils");
const { get_profile } = require("@Service/profile.service");
const { checkProfileEligibility } = require("../../Service/mix.service");
const { findAllFriends } = require("../../Service/interactions.service");
const db = require("@Models");
const { DB_TABLES } = require("@Constants");

const getProfile = catchAsync(async (req, res, next) => {
  // const ownAccount = req.query.ownAccount === "true";
  // const { profileId } = ownAccount ? req.user.Profile : req.query;

  const { profileId } = req.user.Profile;
  const { id } = req.query;

  const ownAccount = profileId === id;

  if (!profileId) return next(new AppError("Error getting profile"), 404);
  let options = {
    include: [{ model: db[DB_TABLES.Request] }],
  };

  let isEligible = true;
  if (!ownAccount) {
    isEligible = await checkProfileEligibility(profileId, id);
    console.log(isEligible);
  }

  if (isEligible || ownAccount) {
    options = {
      include: [
        {
          model: db[DB_TABLES.Post],
          include: [
            { model: db[DB_TABLES.Like] },
            { model: db[DB_TABLES.Comment] },
            { model: db[DB_TABLES.Attachment] },
          ],
        },
        { model: db[DB_TABLES.Request] },
      ],
    };
  }

  let profile = await get_profile({ profileId: id }, options);

  if (!profile) return next(new AppError("No profile found!", 404));

  const followers = await findAllFriends({ friendId: id });
  const following = await findAllFriends({ userId: id });

  profile.dataValues.followers = followers;
  profile.dataValues.following = following;
  profile.dataValues.isFriend = isEligible;
  profile.dataValues.ownAccount = ownAccount;

  return successResponse.sendData(res, {
    status: 200,
    message: "Profile found",
    data: profile,
  });
});

module.exports = getProfile;
