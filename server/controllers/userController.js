const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { name, email, language } = req.body;

    const user = await User.create({
      name,
      email,
      language,
      password: email
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};