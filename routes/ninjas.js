const express = require("express");
const Ninja = require("../models/ninja");
const router = express.Router();

let ninjas = [
  {
    id: 1,
    name: "Michaelangelo",
    nickname: "Mikey",
    dob: 1987,
    abilities: ["Acrobatics", "Dancing", "Pranking"],
    isMutant: true,
  },
  {
    id: 2,
    name: "Leonardo",
    nickname: "Leo",
    dob: 1987,
    abilities: ["Acrobatics", "Leadership", "Meditation"],
    isMutant: true,
  },
  {
    id: 3,
    name: "April O'Neil",
    nickname: "Ape",
    dob: 1980,
    abilities: ["Computer programming", "Ninjutsu"],
    isMutant: false,
  },
];

// GET ALL
router.get("/", (req, res) => {
  console.log("Trying to fetch ninjas ....... ");
  res.send(ninjas);
});

// GET with params
router.get("/:ninjaId", (req, res) => {
  // ParseInt converts a string value into integer. Req.params.ninjaId is a string. We have to convert it to an integer
  var requestedNinjaId = parseInt(req.params.ninjaId); // request parameter

  // Finding an object in the ninjas array that has a matching id requested by user
  let ninja = ninjas.find((ninja) => ninja.id === requestedNinjaId);

  // ===      Checks both data type and value when comparing
  // ==       Comparison Operator. Checking if something is equal to some value
  // =        Assignment Operator. Assigning a value to a variable

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
  await ninja.save()

  res.send(ninja)
});

// PUT

router.put("/:ninjaId", (req, res) => {
  let ninja = ninjas.find((ninja) => ninja.id === parseInt(req.params.ninjaId));

  if (!ninja) {
    return res.status(404).send("Requested ninja is not in the system");
  }

  if (!req.body.nickname) {
    return res.status(400).send("Nickname is missing from the request");
  }

  ninja.nickname = req.body.nickname;

  res.send(ninja);
});

// DELETE

router.delete("/:ninjaId", (req, res) => {
  // delete the object with that specific id
  let ninja = ninjas.find((ninja) => ninja.id === parseInt(req.params.ninjaId));

  if (!ninja) {
    return res.status(404).send("Requested ninja is not in the system");
  }

  let indexOfNinja = ninjas.indexOf(ninja);
  console.log(indexOfNinja);

  ninjas.splice(indexOfNinja, 1);

  res.send(ninja);
});

module.exports = router;
