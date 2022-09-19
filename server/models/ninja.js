const mongoose = require("mongoose");

const ninjaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  dob: Number,
  isMutant: Boolean,
  abilities: [String],
  likeCount: Number,
  imgUrl: String,
});

const Ninja = mongoose.model("Ninja", ninjaSchema);
module.exports = Ninja;