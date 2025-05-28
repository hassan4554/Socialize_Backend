const { findOrCreateFriend } = require("@Service/interactions.service");
const { update_request } = require("@Service/request.service");
const { catchAsync, successResponse, AppError } = require("@Utils");

const processRequest = catchAsync(async (req, res, next) => {
  const { requestId, status } = req.body;

  const updatedRequest = await update_request(
    { status },
    { requestId },
    { individualHooks: true }
  );

  console.log(updatedRequest);
  if (!updatedRequest || updatedRequest.status === "pending")
    return next(new AppError("Error updating request", 400));

  if (updatedRequest.status === "accepted") {
    const [friend, created] = await findOrCreateFriend(
      updatedRequest.requesterId,
      updatedRequest.receiverId
    );

    if (!created && friend) return next(new AppError("Already friends", 400));

    return successResponse.sendData(res, {
      status: 200,
      message: "Accepted request successfully",
      data: friend,
    });
  }

  return successResponse.sendData(res, {
    status: 200,
    message: "Request rejected successfully",
  });
});

module.exports = processRequest;
