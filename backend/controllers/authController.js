const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const handleLogin = asyncHandler(async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) {
    return res.sendStatus(401);
  }
  const match = bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const accessToken = jwt.sign(
      { UserInfo: { id: foundUser._id } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.json({
      username: foundUser.username,
      accessToken,
      picture: foundUser.image,
    });
  } else {
    res.sendStatus(401);
  }
});

const handleNewUser = async (req, res) => {
  const { user, pwd, picture } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) {
    return res.sendStatus(409);
  }
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const result = await User.create({
      username: user,
      password: hashedPwd,
      image: picture,
    });

    console.log(result);

    res.status(201).json({ success: "New user created" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { handleLogin, handleNewUser };
