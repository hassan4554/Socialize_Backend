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

const get_like = (findParams, options = {}) => {
  return db[DB_TABLES.Like].findAll({ where: findParams, ...options });
};

const delete_like = (findParams, options = {}) => {
  return db[DB_TABLES.Like].destroy({ where: findParams, ...options });
};

module.exports = { findOrCreateLike, delete_like, get_like };
