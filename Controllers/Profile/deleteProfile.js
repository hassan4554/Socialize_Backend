const { catchAsync, successResponse, AppError } = require("@Utils");
const { deleteProfileData, delProfile } = require("@Service/profile.service");

const deleteProfile = catchAsync(async (req, res, next) => {
  const { profileId } = req.user.Profile;

  const isDeleted = await delProfile({ profileId });

  if (!isDeleted) return next(new AppError("Error in deleting profile", 400));

  await deleteProfileData(req.user.Profile);

  successResponse.sendData(res, {
    status: 200,
    message: "Profile deleted successfully",
  });
});

module.exports = deleteProfile;
