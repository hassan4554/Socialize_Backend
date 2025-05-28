const router = require("express").Router();
const authRoute = require("./auth.routes");
const userRoutes = require("./user.routes");
const interactionsRoute = require("./interactions.route");
const postsRoute = require("./post.route");
const profileRoute = require("./profile.route");
const requestRoute = require("./request.routes");
const likeRoute = require("./like.route");
const commentRoute = require("./comment.route");

router.use("/auth", authRoute);
router.use("/user", userRoutes);
router.use("/interaction", interactionsRoute);
router.use("/post", postsRoute);
router.use("/profile", profileRoute);
router.use("/request", requestRoute);
router.use("/like", likeRoute);
router.use("/comment", commentRoute);

module.exports = router;
