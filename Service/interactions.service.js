const db = require("@Models");
const { DB_TABLES } = require("@Constants");

const findOrCreateFriend = (userId, friendId) => {
  return db[DB_TABLES.Friend].findOrCreate({
    where: { userId, friendId },
    default: { userId, friendId },
  });
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
