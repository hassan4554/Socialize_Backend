const db = require("@Models");
const { DB_TABLES } = require("@Constants");

const findOrCreateRequest = (findParam, options = {}) => {
  return db[DB_TABLES.Request].findOrCreate({
    where: findParam,
    ...options,
  });
};

const update_request = async (updates, findParams, options = {}) => {
  await db[DB_TABLES.Request].update(updates, {
    where: findParams,
    ...options,
  });

  return db[DB_TABLES.Request].findOne({ where: findParams, ...options });
};

const delete_request = (findParams, options = {}) => {
  return db[DB_TABLES.Request].destroy({ where: findParams, ...options });
};

module.exports = { findOrCreateRequest, update_request, delete_request };
