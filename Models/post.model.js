module.exports = (sequelize, { UUID, UUIDV4, STRING, BOOLEAN }) => {
  return sequelize.define("Post", {
    postId: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    profileId: {
      type: UUID,
      allowNull: false,
      references: {
        model: "Profiles",
        key: "profileId",
      },
    },
    title: {
      type: STRING,
    },
    isPublished: {
      type: BOOLEAN,
      defaultValue: true,
    },
  });
};
