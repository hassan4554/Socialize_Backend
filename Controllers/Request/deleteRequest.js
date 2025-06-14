const { delete_request } = require("../../Service/request.service");
const { catchAsync, successResponse, AppError } = require("../../Utils");

const deleteRequest = catchAsync(async (req, res, next) => {
  const requesterId = req.user.Profile.profileId;
  const receiverId = req.body.id;

  const isDeleted = await delete_request({ requesterId, receiverId });
  if (!isDeleted) return next(new AppError("request not deleted", 400));

  return successResponse.sendData(res, {
    status: 200,
    message: "request deleted successfully",
    data: null,
  });
});

module.exports = deleteRequest;
