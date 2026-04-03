const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  language: String,
  assignedLeads: { type: Number, default: 0 },
  closedLeads: { type: Number, default: 0 },
  status: { type: String, default: "Active" },
  role: { type: String, default: "user" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);