module.exports = (sequelize, { UUID, UUIDV4, STRING, INTEGER, ENUM }) => {
  return sequelize.define(
    "Attachment",
    {
      attachmentId: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      parentId: {
        type: UUID,
        allowNull: false,
      },
      size: {
        type: INTEGER,
      },
      format: {
        type: ENUM("image", "video"),
        allowNull: false,
      },
      url:{
        type: STRING,
        allowNull: false
      }
    },
    {
      paranoid: true,
    }
  );
};
