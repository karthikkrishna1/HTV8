const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: "User_Name is required",
  },
  password: {
    type: String,
    required: "Password is required",
  },
  Posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  image: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("User", UserSchema);
