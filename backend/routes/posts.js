const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const verifyJWT = require("../middleware/verifyJWT");

router
  .route("/")
  .get(postsController.getPosts)
  .post(verifyJWT, postsController.addPost);

router.route("/:id").get(verifyJWT, postsController.getPostById);

router
  .route("/:id/comments/")
  .post(verifyJWT, postsController.postComment)
  .get(postsController.getAllComments);

module.exports = router;
