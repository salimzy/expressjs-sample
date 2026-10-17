const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const sign = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ token: sign(user._id) });
  } catch (e) {
    res.status(400).json({ error: e.code === 11000 ? "Email taken" : e.message });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select("+password");
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return res.status(401).json({ error: "Bad credentials" });
  res.json({ token: sign(user._id) });
});

module.exports = router;