const db = require("@Models");
const { DB_TABLES } = require("@Constants");

const findOrCreateFriend = async (userId, friendId, options = {}) => {
  const [user, created] = await db[DB_TABLES.Friend].findOrCreate({
    where: { userId, friendId },
    defaults: { userId, friendId },
    ...options,
  });
  if (user && !created && user.deletedAt) {
    await user.restore();
    return [user, true];
  }

  return [user, created];
};

const deleteSingleFriend = (userId, friendId) => {
  return db[DB_TABLES.Friend].destroy({ where: { userId, friendId } });
};

const deleteAllFriends = (userId) => {
  return db[DB_TABLES.Friend].destroy({ where: { userId } });
};

const findAllFriends = (findParam) => {
  return db[DB_TABLES.Friend].findAndCountAll({
    where: findParam,
  });
};

const findSingleFriend = (userId, friendId) => {
  return db[DB_TABLES.Friend].findOne({
    where: { userId, friendId },
  });
};

module.exports = {
  findOrCreateFriend,
  deleteSingleFriend,
  findAllFriends,
  deleteAllFriends,
  findSingleFriend,
};
