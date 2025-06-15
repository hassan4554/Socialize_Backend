module.exports = (sequelize, { UUID, UUIDV4, BOOLEAN, STRING }) => {
  return sequelize.define("Profile", {
    profileId: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: UUID,
      allowNull: false,
    },
    isEnabled: {
      type: BOOLEAN,
      defaultValue: true,
    },
    profilePicture: {
      type: STRING,
      defaultValue: "/uploads/user-image-placeholder",
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    bio: {
      type: STRING,
      defaultValue: "",
    },
    isPrivate: {
      type: BOOLEAN,
      defaultValue: false,
    },
  });
};
