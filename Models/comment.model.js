module.exports = (sequelize, { UUID, UUIDV4, TEXT }) => {
  return sequelize.define("Comment", {
    commentId: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    postId: {
      type: UUID,
      allowNull: false,
    },
    commentedBy: {
      type: UUID,
      allowNull: false,
    },
    content: {
      type: TEXT,
      allowNull: false,
    },
  });
};
