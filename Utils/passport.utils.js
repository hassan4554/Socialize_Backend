const { passport } = require("@Configs/passport.config");
const AppError = require("./appError.util");

const passportAuth = (strategy, options = {}) => {
  return (req, res, next) => {
    passport.authenticate(strategy, options, (err, user, info) => {
      try {
        if (err || !user) return next(new AppError(info?.message || "Session Expired!", 401));

        req.user = user;
        next();
      } catch (error) {
        return next(new AppError());
      }
    })(req, res, next);
  };
};

module.exports = passportAuth;
