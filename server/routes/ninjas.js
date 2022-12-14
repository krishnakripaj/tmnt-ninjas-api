const express = require("express");
const jwt = require("jsonwebtoken");
const Ninja = require("../models/ninja");
const router = express.Router();

// not a good practise. move keys to env variables
const SECRET_KEY = "12345678";

// GET ALL
router.get("/", async (req, res) => {
  try {
    // let ninjas = await Ninja.find({ isMutant: true }).sort({ name: "asc" });
    // let ninjas = await Ninja.find({ dob: { $gt: 1990 } }).sort({
    // query conditions, comparison query operators, logical operators
    let ninjas = await Ninja.find().sort({
      name: "asc",
    });
    res.send(ninjas);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// GET with params
router.get("/:ninjaId", async (req, res) => {
  let ninja = await Ninja.findById(req.params.ninjaId);

  if (!ninja) {
    let errorObj = {
      message: "The given ID does not match any ninjas on our system",
      statusCode: "NOT FOUND",
    };
    return res.status(404).send(errorObj);
  }

  res.send(ninja);
});

router.post("/", async (req, res) => {
  const token = req.header("x-jwt-token");
  if (!token) return res.status(400).send("No token found");

  try {
    jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return res.status(400).send("Invalid token");
  }

  if (!req.body.name) {
    return res.status(400).send("Not all mandatory values are set");
  }

  let ninja = new Ninja({
    name: req.body.name,
    nickname: req.body.nickname,
    dob: req.body.dob,
    isMutant: req.body.isMutant,
    abilities: req.body.abilities,
    likeCount: req.body.likeCount,
    imgUrl: req.body.imgUrl,
  });

  try {
    await ninja.save();
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }

  res.send(ninja);
});

// PUT
router.put("/:ninjaId", async (req, res) => {
  // let ninja = ninjas.find((ninja) => ninja.id === parseInt(req.params.ninjaId));
  let ninja = await Ninja.findById(req.params.ninjaId);

  if (!ninja) {
    return res.status(404).send("Requested ninja is not in the system");
  }

  if (!req.body.likeCount) {
    return res.status(400).send("Like Count value is missing from the request");
  }

  // ninja.nickname = req.body.nickname;
  ninja.set({ likeCount: req.body.likeCount });
  ninja = await ninja.save();

  res.send(ninja);
});

// DELETE
router.delete("/:ninjaId", async (req, res) => {
  const token = req.header("x-jwt-token");
  if (!token) return res.status(400).send("No token found");

  try {
    jwt.verify(token, SECRET_KEY); // check if user is authenticated
  } catch (err) {
    return res.status(400).send("Invalid token");
  }

  let decoded = jwt.decode(token, SECRET_KEY);
  if (!decoded.isAdmin)
    return res
      .status(403)
      .send("Forbidden. You are not authorized to use this method");

  // delete the object with that specific id
  let ninja = await Ninja.findOneAndDelete({ _id: req.params.ninjaId });

  res.send(ninja);
});

module.exports = router;
