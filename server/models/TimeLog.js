const mongoose = require("mongoose");

const timeLogSchema = new mongoose.Schema({
  userId: String,
  date: String, // 🔥 ADD THIS

  checkIn: String,
  checkOut: String,

  breaks: [
    {
      start: String,
      end: String,
      date: String,
    },
  ],
});

module.exports = mongoose.model("TimeLog", timeLogSchema);
