const { comparePassword } = require("@Utils");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { DB_TABLES } = require("@Constants");
const db = require("@Models");

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await db[DB_TABLES.User].findOne({
          where: { email },
        });

        if (!user) return done({ message: "No user found" }, false);
        const same = await comparePassword(password, user.password);
        if (!same) return done({ message: "Incorrect Password" }, false);
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await db[DB_TABLES.User].findByPk(userId);

    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

const jwtAccessOptions = {
  secretOrKey: process.env.JWT_ACCESS_PRIVATE_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  "jwt-access",
  new JwtStrategy(jwtAccessOptions, async (jwt_payload, done) => {
    try {
      if (!jwt_payload)
        return done({ message: null, error: "Session Expired!" }, false);
      const user = await db[DB_TABLES.User].findOne({
        where: { userId: jwt_payload.userId },
        attributes: { exclude: ["password"] },
        include: [{ model: db[DB_TABLES.Profile] }],
      });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

const jwtRefreshOptions = {
  secretOrKey: process.env.JWT_REFRESH_PRIVATE_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  "jwt-refresh",
  new JwtStrategy(jwtRefreshOptions, async (jwt_payload, done) => {
    try {
      if (!jwt_payload)
        return done({ message: null, error: "Session Expired!" }, false);
      const user = await db[DB_TABLES.User].findByPk(jwt_payload.userId);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.use(
  "jwt-otp",
  new JwtStrategy(jwtAccessOptions, async (jwt_payload, done) => {
    try {
      if (!jwt_payload)
        return done({ message: null, error: "Session Expired!" }, false);
      const user = await db[DB_TABLES.Otp].findOne({
        where: { email: jwt_payload.email },
      });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = { passport };
