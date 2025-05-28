const { successResponse } = require("@Utils");

const me = async(req, res, next) => {
  return successResponse.sendData(res, {
    message: "ok",
    status: 200,
    data: req.user,
  });
};

module.exports = me;
