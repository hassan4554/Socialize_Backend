const db = require("@Models");
const { comparePassword } = require("@Utils");
const { DB_TABLES } = require("@Constants");
const { findOrCreateProfile } = require("./profile.service");

const createUser = async (userData) => {
  const { password, email, name, contact } = userData;
  const [user, created] = await db[DB_TABLES.User].findOrCreate({
    where: { email },
    defaults: {
      name,
      email,
      password,
      contact,
    },
  });

  if (!created) {
    return null;
  }
  return user;
};

const createUserTransaction = async (userData) => {
  const { password, email, name, contact } = userData;
  const result = await db.sequelize.transaction(async (t) => {
    try {
      const [user, created] = await db[DB_TABLES.User].findOrCreate({
        where: { email },
        defaults: {
          name,
          email,
          password,
          contact,
        },
        transaction: t,
      });

      if (!user || !created)
        return {
          done: false,
          message: "User already exists",
        };

      const [profile, isCreated] = await findOrCreateProfile(
        {
          username: userData.username,
          userId: user.userId,
        },
        { transaction: t }
      );

      if (!profile || !isCreated)
        return {
          done: false,
          message: "Profile already exists",
        };

      return { done: true, userId: user.userId };
    } catch (error) {
      console.log("error in createUserTransaction");
      console.log(error);
    }
  });
  return result;
};

const passwordUpdate = async (userId, oldPassword, newPassword) => {
  const user = await db[DB_TABLES.User].findByPk(userId);
  if (!user)
    return {
      status: 404,
      message: null,
      error: "No user found!",
    };

  const same = await comparePassword(oldPassword, user.password);
  if (!same)
    return {
      status: 400,
      message: null,
      error: "Incorrect Password!",
    };

  await user.update({ password: newPassword });

  return {
    status: 200,
    message: "Password changed successfully!",
    error: null,
  };
};

const deleteUser = async (userId) => {
  const user = await db[DB_TABLES.User].findByPk(userId);
  const isUserDeleted = await db[DB_TABLES.User].destroy({
    where: { userId },
  });

  if (!isUserDeleted)
    return {
      status: 404,
      message: null,
      error: "User not found",
    };

  return {
    status: 200,
    message: "User deleted successfully",
    error: null,
  };
};

const findOneUser = (findParams, options = {}) => {
  return db[DB_TABLES.User].findOne({ where: findParams, ...options });
};

module.exports = {
  createUser,
  passwordUpdate,
  deleteUser,
  findOneUser,
  createUserTransaction,
};
