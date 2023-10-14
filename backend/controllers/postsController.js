const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Post = require("../models/Post");

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("Sender", "-password -Posts").exec();
  const populatedPost = await User.populate(posts, {
    path: "comments.user",
    select: "username picture",
  });
  return res.status(200).json({ posts: posts });
});

const addPost = asyncHandler(async (req, res) => {
  const id = req.user;
  const { body } = req.body;
  if (!id) {
    return res.status(401).json({ message: "User not logged in" });
  }
  const curUser = await User.findById(id).exec();
  if (!curUser) {
    return res.status(403).json({ message: "Not Authorized" });
  }
  const result = await Post.create({ body, Sender: id });
  curUser.Posts.push(result._id);
  const result2 = await curUser.save();
  const newPost = await Post.findById(result._id).populate(
    "Sender",
    "-password"
  );
  const populatedPost = await User.populate(newPost, {
    path: "comments.user",
    select: "username picture",
  });

  if (populatedPost) {
    res.status(200).json(populatedPost);
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
});

const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const curPost = await Post.findById(id)
    .populate("Sender", "-password")
    .exec();
  const populatedPost = await User.populate(curPost, {
    path: "comments.user",
    select: "username picture",
  });
  if (populatedPost) {
    res.status(200).json({ populatedPost });
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
});

const postComment = asyncHandler(async (req, res) => {
  const id = req.user;
  const { id: postId } = req.params;
  const { text } = req.body;
  const curPost = await Post.findById(postId)
    .populate("Sender", "-password -Posts")
    .exec();
  //   const populatedPost = await User.populate(curPost, {
  //     path: comments.user,
  //     select: "username picture",
  //   });
  curPost.comments.push({ user: id, text });
  const result = await curPost.save();
  const populatedPost = await User.populate(result, {
    path: "comments.user",
    select: "username picture",
  });

  if (result) {
    return res.status(200).json({ populatedPost });
  }
  return res.status(500).json({ message: "Something went wrong" });
});

const getAllComments = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const curPost = await Post.findById(id)
    .populate("Sender", "-password")
    .populate("comments")
    .exec();
  const populatedPost = await User.populate(curPost, {
    path: "comments.user",
    select: "username image",
  });
  if (curPost) {
    return res.status(200).json({ comments: populatedPost.comments });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = {
  getPosts,
  addPost,
  getPostById,
  postComment,
  getAllComments,
};
