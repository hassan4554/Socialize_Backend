module.exports = (sequelize, { STRING, DATE, BOOLEAN, UUIDV4, UUID }) => {
  return sequelize.define("OTP", {
    _id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    email: {
      type: STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    otp: {
      type: STRING(6),
    },
    isUsed: {
      type: BOOLEAN,
      defaultValue: false,
    },
    otpExpiry: {
      type: DATE,
    },
  });
};
