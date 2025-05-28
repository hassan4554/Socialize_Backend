const db = require("@Models");
const { DB_TABLES } = require("@Constants");

const create_comment = (createParams) => {
  return db[DB_TABLES.Comment].create(createParams);
};

const get_comment = (findParams, options = {}) => {
  return db[DB_TABLES.Comment].findAll({ where: findParams, ...options });
};

const delete_comment = (findParams, options = {}) => {
  return db[DB_TABLES.Comment].destroy({ where: findParams, ...options });
};

const update_comment = async (updates, findParams, options = {}) => {
  await db[DB_TABLES.Comment].update(updates, {
    where: findParams,
    ...options,
  });

  return db[DB_TABLES.Comment].findOne({ where: findParams });
};
module.exports = { create_comment, delete_comment, update_comment, get_comment };
