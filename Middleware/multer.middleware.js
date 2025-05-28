const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const { username } = req.user.Profile;
    cb(null, `${username}.jpg`);
  },
});

const tempStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { profileId } = req.user.Profile;
    const { postId } = req.postData;
    const tempDir = path.join(__dirname, "../Posts", profileId, postId);

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    // const uniqueName = `${Date.now()}_${Math.random()
    //   .toString(36)
    //   .substring(2, 15)}${path.extname(file.originalname)}`;
    const name = file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage });
const tempUpload = multer({ storage: tempStorage });
module.exports = { upload, tempUpload };
