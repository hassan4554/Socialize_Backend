const { passport } = require("@Configs/passport.config");
const AppError = require("./appError.util");

const passportAuth = (strategy, options = {}) => {
  return (req, res, next) => {
    passport.authenticate(strategy, options, (err, user, info) => {
      try {
        if (err) return next(new AppError(err?.message, 400));
        if (!user)
          return next(new AppError(info?.message || "Unauthorized", 404));

        req.user = user;
        next();
      } catch (error) {
        return next(new AppError());
      }
    })(req, res, next);
  };
};

module.exports = passportAuth;
