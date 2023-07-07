const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const createdUser = await User.create({ ...req.body });
  const { password, _id, __v, ...others } = createdUser._doc;
  others.token = createdUser.createJWT();
  res.status(StatusCodes.CREATED).send({ user: others });
};
const login = (req, res) => {
  res.send("Login User");
};

module.exports = { register, login };
