const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  Sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  body: {
    type: String,
    required: true,
  },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, required: true },
      text: { type: String, required: true },
      created: { type: Date, default: Date.now },
    },
  ],
});
module.exports = mongoose.model("Post", PostSchema);
