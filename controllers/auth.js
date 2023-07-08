const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const createdUser = await User.create({ ...req.body });
  const { password, _id, __v, ...others } = createdUser._doc;
  others.token = createdUser.createJWT();
  res.status(StatusCodes.CREATED).send({ user: others });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Invalid email or password");

  const user = await User.findOne({ email });
  const isPasswordValid = await user.comparePassword(password);
  if (!user || !isPasswordValid)
    throw new UnauthenticatedError("Invalid Credentials");
  res
    .status(StatusCodes.OK)
    .json({ token: user.createJWT(), email: user.email });
};

module.exports = { register, login };
