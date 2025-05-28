const db = require("@Models");
const { DB_TABLES } = require("@Constants");

const findOrCreateLike = (
  findParams,
  createParams = findParams,
  options = {}
) => {
  return db[DB_TABLES.Like].findOrCreate({
    where: findParams,
    defaults: createParams,
    ...options,
  });
};

const delete_like = (findParams, options = {}) => {
  return db[DB_TABLES.Like].destroy({ where: findParams, ...options });
};

module.exports = { findOrCreateLike, delete_like };
