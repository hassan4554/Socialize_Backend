
const applyHeaders = (res, headers = {}) => {
  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
};

const successResponse = {
  sendData: (res, { status = 200, message = "success", data = null }) => {
    applyHeaders(res);
    return res.status(status).json({
      error: null,
      message,
      data,
    });
  },
};

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = { successResponse, catchAsync };
