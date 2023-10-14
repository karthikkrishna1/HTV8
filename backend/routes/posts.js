const express = require("express");
const router = express.Router();

router.route("/").get(postsController.getPosts).post(postsController.addPost);

router.route("/:id").get(postsController.getPostById);

router
  .route("/comments/:id")
  .post(postsController.postComment)
  .get(postsController.getAllComments);

module.exports = router;
