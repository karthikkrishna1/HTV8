const asyncHandler = require("express-async-handler");

const getPosts = asyncHandler((req, res) => {});

const addPost = asyncHandler((req, res) => {});

const getPostById = asyncHandler((req, res) => {});

const postComment = asyncHandler((req, res) => {});

const getAllComments = asyncHandler((req, res) => {});

module.exports = {
  getPosts,
  addPost,
  getPostById,
  postComment,
  getAllComments,
};
