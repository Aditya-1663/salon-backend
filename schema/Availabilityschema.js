const mongoose = require("mongoose");
const availabilitySlotSchema = new mongoose.Schema({
  start: { type: String },
  end: { type: String },
  maxCapacity: { type: Number },
});

const AvailabilitySchema = new mongoose.Schema({
  availability: [
    {
      date: { type: Date, default: Date.now },
      day: { type: String },
      slots: [availabilitySlotSchema],
    },
  ],
});
const Availability = mongoose.model("available", AvailabilitySchema);

module.exports = Availability;
