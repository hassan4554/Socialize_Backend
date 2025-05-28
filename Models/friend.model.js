module.exports = (sequelize, { STRING }) => {
  return sequelize.define(
    "Friend",
    {
      userId: {
        type: STRING,
        primaryKey: true,
      },
      friendId: {
        type: STRING,
        primaryKey: true,
      },
    },
    {
      paranoid: true,
    }
  );
};
