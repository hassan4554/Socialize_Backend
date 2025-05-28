const bcrypt = require("bcrypt");

const comparePassword = (simplePassword, hashPassword) => {
  return bcrypt.compare(simplePassword, hashPassword);
};

module.exports = {comparePassword};
