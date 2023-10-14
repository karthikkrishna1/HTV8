const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Post = require("../models/Post");
const axios = require("axios");

const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("Sender", "-password -Posts")
      .exec();
    const populatedPost = await User.populate(posts, {
      path: "comments.user",
      select: "username picture",
    });
    return res.status(200).json({ posts: populatedPost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err });
  }
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
  let input_array = [text];

  let output_array = [];

  const options = {
    method: "POST",
    url: "https://api.cohere.ai/v1/classify",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: "Bearer xC36OoXLBZNXOSzHuAvGWNfVq7qUHvfO1k17Jnhy",
    },
    data: {
      truncate: "END",
      model: "large",
      inputs: input_array,
      examples: [
        { text: "you are hot trash", label: "Toxic" },
        { text: "go to hell", label: "Toxic" },
        { text: "get rekt moron", label: "Toxic" },
        { text: "get a brain and use it", label: "Toxic" },
        { text: "say what you mean, you jerk.", label: "Toxic" },
        { text: "Are you really this stupid", label: "Toxic" },
        { text: "I will honestly kill you", label: "Toxic" },
        { text: "yo how are you", label: "Benign" },
        { text: "I'm curious, how did that happen", label: "Benign" },
        { text: "Try that again", label: "Benign" },
        { text: "Hello everyone, excited to be here", label: "Benign" },
        { text: "I think I saw it first", label: "Benign" },
        { text: "That is an interesting point", label: "Benign" },
        { text: "I love this", label: "Benign" },
        { text: "We should try that sometime", label: "Benign" },
        { text: "You should go for it", label: "Benign" },
      ],
    },
  };

  axios
    .request(options)
    .then(async function (response) {
      let error = "";
      for (let i = 0; i < response.data.classifications.length; i++) {
        if (
          response.data.classifications[i].confidence < 0.9 ||
          response.data.classifications[i].prediction === "Benign"
        ) {
          // if input is good enough
          output_array.push(response.data.classifications[i].input);
        } else {
          error = "Sorry Comment not Appropirate";
        }
      }

      if (error === "") {
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
      } else {
        return res.status(201).json({ error: error });
      }
    })
    .catch(function (error) {
      console.error(error);
    });

  const curPost = await Post.findById(postId)
    .populate("Sender", "-password -Posts")
    .exec();
  //   const populatedPost = await User.populate(curPost, {
  //     path: comments.user,
  //     select: "username picture",
  //   });
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
