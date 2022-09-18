const express = require("express");

const router = express.Router();

const feedsController = require("../controller/feed");
const { createPostValidator } = require("../validation/feeds");
const {isAuth} = require("../middlewares/is-auth");


//GET /feeds
router.get("/posts", isAuth,feedsController.getFeedPosts);

//GET /feed
router.get("/post/:postId", isAuth,feedsController.getFeedPost);

//POST /feeds
router.post("/post",  isAuth, createPostValidator,feedsController.createFeedPosts);

//UPDATE "PUT" /feeds
router.put("/post/:postId", isAuth, createPostValidator,feedsController.updateFeedPosts);

//DELETE /feeds
router.delete("/post/:postId", isAuth, feedsController.deleteFeedPosts);



module.exports = router;