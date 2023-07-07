const register = (req, res) => {
  res.send("Register User");
};
const login = (req, res) => {
  res.send("Login User");
};

module.exports = { register, login };
