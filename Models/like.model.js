module.exports = (sequelize, { UUID, UUIDV4 }) => {
  return sequelize.define("Like", {
    likeId: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    postId: {
      type: UUID,
      allowNull: false,
    },
    likedBy: {
      type: UUID,
      allowNull: false,
    },
  });
};
