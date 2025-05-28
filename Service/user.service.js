const db = require("@Models");
const { comparePassword } = require("@Utils");
const { DB_TABLES } = require("@Constants");

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

module.exports = { createUser, passwordUpdate, deleteUser, findOneUser };
