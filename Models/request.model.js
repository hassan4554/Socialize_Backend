module.exports = (sequelize, { UUID, UUIDV4, ENUM }) => {
  return sequelize.define("Request", {
    requestId: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    requesterId: {
      type: UUID,
      allowNull: false,
    },
    receiverId: {
      type: UUID,
      allowNull: false,
    },
    status: {
      type: ENUM("pending", "accepted", "rejected"),
      defaultValue: "pending",
    },
  });
};
