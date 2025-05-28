const db = require("@Models");
const { DB_TABLES } = require("@Constants");

const findOrCreateRequest = (findParam, options = {}) => {
  return db[DB_TABLES.Request].findOrCreate({
    where: findParam,
    ...options,
  });
};

const update_request = async (updates, findParams, options = {}) => {
  console.log(updates);
  console.log(findParams);
  await db[DB_TABLES.Request].update(updates, {
    where: findParams,
    ...options,
  });

  return db[DB_TABLES.Request].findOne({ where: findParams, ...options });
};

module.exports = { findOrCreateRequest, update_request };
