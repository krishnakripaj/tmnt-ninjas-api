const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");

const SECRET_KEY = "12345678";

// To check if the user is authenticated or not
router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).send("User does not exist in our system");

    //   return if passwrod matches with the one in the db
    let pwValid = await bcrypt.compare(req.body.password, user.password);

    if (!pwValid) return res.status(400).send("Authentication failed");

    let token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
        message: "Hi I am a message",
      },
      SECRET_KEY,
      {
        expiresIn: "1h", // expires in 60s
      }
    );

    return res.send({ token: token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
