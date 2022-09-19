const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");

// localhost:5000:/api/users

// To create a new user in our system to use our ninjas api methods
router.post("/", async (req, res) => {
  try {
    let salt = await bcrypt.genSalt(10);
    let hashedpw = await bcrypt.hash(req.body.password, salt);

    let user = new User({
      username: req.body.username,
      password: hashedpw,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    });
    await user.save();
    return res.send({
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
