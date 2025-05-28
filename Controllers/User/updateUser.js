const { catchAsync, AppError, successResponse } = require("@Utils");
const db = require("@Models");
const { DB_TABLES } = require("@Constants");

const update_user = catchAsync(async (req, res, next) => {
  const userId = req.user.userId;
  const allowedUpdates = ["name", "contact"];
  const updates = req.body;

  const updatesToBeDone = Object.keys(updates).reduce((acc, key) => {
    if (allowedUpdates.includes(key)) {
      acc[key] = updates[key];
    }
    return acc;
  }, {});

  if (Object.keys(updatesToBeDone).length === 0)
    return next(new AppError("No valid data provided for update", 400));

  const [rowsUpdated, [updatedUser]] = await db[DB_TABLES.User].update(
    updatesToBeDone,
    {
      where: { userId },
      attributes: ["userId", "name", "email", "contact"],
      returning: ["userId", "name", "email", "contact"],
      individualHooks: true,
    }
  );

  if (!updatedUser) return next(new AppError("User not found", 404));
  return successResponse.sendData(res, {
    message: "Profile updated successfully",
    data: {
      userId: updatedUser.userId,
      name: updatedUser.name,
      email: updatedUser.email,
      contact: updatedUser.contact,
    },
    status: 200,
  });
});

module.exports = update_user;