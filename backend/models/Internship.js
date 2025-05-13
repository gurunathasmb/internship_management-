const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  skillsRequired: [String],
  studentsApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Internship = mongoose.model("Internship", internshipSchema);
module.exports = Internship;
