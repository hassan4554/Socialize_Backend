const { upload, tempUpload } = require("./multer.middleware");
const globalErrorHandler = require("./globalErrorHandler.middleware");
const { sendOtp, verifyOtp } = require("./otp.middleware");
const validateData = require("./validation.middleware");

module.exports = {
  upload,
  tempUpload,
  globalErrorHandler,
  sendOtp,
  verifyOtp,
  validateData,
};
