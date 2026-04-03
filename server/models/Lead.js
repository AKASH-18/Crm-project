const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  source: String,
  date: String,
  location: String,
  language: String,

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    default: "Ongoing"
  },

  type: String,
  scheduledDate: String
});

module.exports = mongoose.model("Lead", leadSchema);