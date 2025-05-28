const bcrypt = require("bcrypt");
module.exports = (sequelize, { UUID, UUIDV4, STRING }) => {
  return sequelize.define(
    "User",
    {
      userId: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      name: {
        type: STRING,
      },
      email: {
        type: STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: true,
      },
      password: {
        type: STRING,
        allowNull: false,
      },
      contact: {
        type: STRING,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          console.log('hashing password')
          if (user.password) {
            const salt = await bcrypt.genSalt(Number(process.env.SALT || 10));
            user.password = await bcrypt.hash(user.password, salt);
          }
          console.log('hashing password 2')
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(Number(process.env.SALT || 10));
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );
};
