const { DB_TABLES } = require("@Constants");
const db = require("@Models");
const path = require("path");
const fs = require("fs").promises;

const findOrCreateProfile = (findParams, createParams, options = {}) => {
  return db[DB_TABLES.Profile].findOrCreate({
    where: findParams,
    defaults: createParams,
    ...options,
  });
};

const delProfile = (findParams, options = {}) => {
  return db[DB_TABLES.Profile].destroy({ where: findParams, ...options });
};

const deleteProfileData = async (profile) => {
  let DPpath = path.join(
    path.join(__dirname, "..", "uploads"),
    `${profile.username}.jpg`
  );

  let postsPath = path.join(
    path.join(__dirname, "..", "Posts", profile.profileId)
  );

  if (profile.profilePicture) {
    try {
      await fs.unlink(DPpath);
      console.log(`Deleted profile picture of ${profile.username}`);
    } catch (fileError) {
      console.log(
        `Failed to delete profile picture of ${profile.username}: ${fileError.message}`
      );
    }
  }

  try {
    await fs.rm(postsPath, { recursive: true, force: true });
    console.log(`Deleted posts of ${profile.username}`);
  } catch (fileError) {
    console.log(
      `Failed to delete posts of ${profile.username}: ${fileError.message}`
    );
  }
};

const update_profile = async (updates, findParams, options = {}) => {
  await db[DB_TABLES.Profile].update(updates, {
    where: findParams,
    ...options,
  });

  return db[DB_TABLES.Profile].findOne({ where: findParams, ...options });
};

const get_profile = (findParams, options = {}) => {
  return db[DB_TABLES.Profile].findOne({
    where: findParams,
    ...options,
  });
};

module.exports = {
  findOrCreateProfile,
  delProfile,
  deleteProfileData,
  update_profile,
  get_profile,
};
