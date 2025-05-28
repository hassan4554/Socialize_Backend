const fs = require("fs");
const path = require("path");

const deleteTempPost = (postUrl) => {
  console.log(postUrl)
  const finalPath = path.join(__dirname, "..", postUrl);
  if (fs.existsSync(finalPath)) {
    fs.unlinkSync(finalPath);
  }
};

const saveFinalPost = (profileId, postId, file) => {
  if (!file) return null;

  const finalDir = path.join(
    __dirname,
    "../Posts",
    profileId,
    postId.toString()
  );
  fs.mkdirSync(finalDir, { recursive: true });

  const finalPath = path.join(finalDir, file.filename);
  fs.renameSync(file.path, finalPath);
  return finalPath;
};

const deletePostData = (profileId, postId) => {
  const finalDir = path.join(
    __dirname,
    "../Posts",
    profileId,
    postId.toString()
  );

  fs.rm(finalDir, { recursive: true, force: true }, (err) => {
    if (err) console.log("Error deleting post: " + postId);
    else console.log(`Post [${postId}] deleted successfully`);
  });
};

const promisifyMulter = (multerMiddleware) => (req, res) =>
  new Promise((resolve, reject) => {
    multerMiddleware(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

module.exports = { deleteTempPost, saveFinalPost, deletePostData, promisifyMulter };
