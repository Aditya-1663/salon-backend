const mongoose = require("mongoose");

const bookschrma = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  date: {
    type: Date,
    require: true,
  },
  slot: {
    start: { type: String },
    end: { type: String },
  },
});
const booking = mongoose.model("booking", bookschrma);

module.exports = booking;
