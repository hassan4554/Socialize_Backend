require("dotenv").config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DEVELOPMENT_DB,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  },
  test: {
    username:  process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_TEST_DB,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  },
  production: {
    username:  process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_PRODUCTION_DB,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  },
};
