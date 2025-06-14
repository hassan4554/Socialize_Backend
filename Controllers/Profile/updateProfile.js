const { catchAsync, successResponse, AppError } = require("@Utils");
const { update_profile } = require("../../Service/profile.service");
const { findAllFriends } = require("../../Service/interactions.service");

const updateProfile = catchAsync(async (req, res, next) => {
  const { username, profileId } = req.user.Profile;

  const restrictedFields = [
    "profileId",
    "profilePicture",
    "isEnabled",
    "username",
  ];

  const updates = req.body;
  const allowedUpdates = Object.keys(updates).reduce((acc, key) => {
    if (!restrictedFields.includes(key)) {
      acc[key] = updates[key];
    }
    return acc;
  }, {});

  let imageUrl = null;
  if (req.file) {
    imageUrl = `/uploads/${username}`;
    allowedUpdates.profilePicture = imageUrl;
  }

  if (Object.keys(allowedUpdates).length === 0)
    return next(new AppError("No valid data provided for update", 400));

  const updatedUser = await update_profile(
    allowedUpdates,
    { profileId },
    {
      attributes: { exclude: ["password"] },
      include: [{ model: db[DB_TABLES.Post] }],
    }
  );

  if (!updatedUser) return next(new AppError("User not found", 404));

  const followers = await findAllFriends({ friendId: profileId });
  const following = await findAllFriends({ userId: profileId });

  updatedUser.dataValues.followers = followers;
  updatedUser.dataValues.following = following;
  updatedUser.dataValues.isFriend = true;
  updatedUser.dataValues.ownAccount = true;

  return successResponse.sendData(res, {
    message: "Profile updated successfully",
    data: updatedUser,
    status: 200,
  });
});
module.exports = updateProfile;
