const db = require("@Models");
const { DB_TABLES } = require("@Constants");
const { tempUpload } = require("@Middleware");
const { promisifyMulter } = require("@Utils");

const create_post = (postData, options = {}) => {
  return db[DB_TABLES.Post].create(postData, { ...options });
};

const createPostTransaction = async (req, res, next) => {
  try {
    const { profileId } = req.user.Profile;
    const result = await db.sequelize.transaction(async (t) => {
      const post = await create_post({ profileId }, { transaction: t });
      req.postData = { postId: post.postId };

      const uploadFiles = promisifyMulter(tempUpload.array("posts", 20));
      await uploadFiles(req, res, next);

      await update_post(req.body, { postId: post.postId }, { transaction: t });

      const attachments = await Promise.all(
        req.files.map((element) =>
          db[DB_TABLES.Attachment].create(
            {
              parentId: post.postId,
              size: element.size,
              format: element.mimetype.split("/")[0],
              url: `Posts${element.path.split("Posts")[1]}`,
            },
            { transaction: t }
          )
        )
      );

      return { post, attachments };
    });

    return result;
  } catch (error) {
    console.log("Error occured");
    console.log(error);
    return false;
  }
};

const get_posts = (findParam, options = {}) => {
  return db[DB_TABLES.Post].findAll({
    where: findParam,
    ...options,
  });
};

const get_posts_count = (findParam) => {
  return db[DB_TABLES.Post].count({
    where: findParam,
  });
};

const update_post = (updates, findParam, options = {}) => {
  return db[DB_TABLES.Post].update(
    { ...updates },
    { where: findParam, ...options }
  );
};

const delete_post = (findParams, options = {}) => {
  return db[DB_TABLES.Post].destroy({ where: findParams, ...options });
};

module.exports = {
  create_post,
  get_posts,
  delete_post,
  update_post,
  createPostTransaction,
  get_posts_count,
};
