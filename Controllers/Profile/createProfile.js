const { catchAsync, successResponse, AppError } = require("@Utils");
const { findOrCreateProfile } = require("@Service/profile.service");

const createProfile = catchAsync(async (req, res, next) => {
  const { username, isPrivate, bio } = req.body;
  const { userId } = req.user;

  const [profile, created] = await findOrCreateProfile(
    { username, userId },
    {
      username,
      userId,
      isPrivate,
      bio,
    }
  );

  if (!created) return next(new AppError("Profile already exists", 400));

  successResponse.sendData(res, {
    status: 200,
    message: "Profile created successfully",
    data: profile,
  });
});
module.exports = createProfile;
