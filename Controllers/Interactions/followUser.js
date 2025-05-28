const { catchAsync, successResponse, AppError } = require("@Utils");
const { findOrCreateFriend } = require("@Service/interactions.service");
const {
  findOrCreateRequest,
  update_request,
} = require("@Service/request.service");
const { get_profile } = require("@Service/profile.service");

const followUser = catchAsync(async (req, res, next) => {
  const requesterId = req.user?.Profile.profileId;
  const receiverId = req.body.id;

  const { isPrivate } = await get_profile({ profileId: receiverId });
  if (isPrivate) {
    const [request, created] = await findOrCreateRequest({
      requesterId,
      receiverId,
    });

    if (!created && request) {
      if (request.status === "rejected") {
        await update_request(
          { status: "pending" },
          { requestId: request.requestId },
          { individualHooks: true }
        );
      } else return next(new AppError("Request already sent", 400));
    }

    return successResponse.sendData(res, {
      status: 200,
      message: "Follow request sent",
    });
  }

  const [user, created] = await findOrCreateFriend(requesterId, receiverId);

  if (!created && user) return next(new AppError("Already followed", 400));
  successResponse.sendData(res, {
    status: 200,
    message: "Followed successfully",
    data: user,
  });
});

module.exports = followUser;
