const { catchAsync, successResponse, AppError } = require("@Utils");
const { update_profile } = require("@Service/profile.service");

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

  const [rowsUpdated, [updatedUser]] = await update_profile(
    allowedUpdates,
    { profileId },
    {
      attributes: { exclude: ["password"] },
      returning: true,
      individualHooks: true,
    }
  );

  if (!updatedUser) return next(new AppError("User not found", 404));
  return successResponse.sendData(res, {
    message: "Profile updated successfully",
    data: updatedUser,
    status: 200,
  });
});
module.exports = updateProfile;
