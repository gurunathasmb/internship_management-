const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  skillsRequired: [String],
  
  // Reference to the Faculty overseeing the internship
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
  
  // Reference to the students who applied for the internship
  studentsApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const Internship = mongoose.model("Internship", internshipSchema);

module.exports = Internship;
