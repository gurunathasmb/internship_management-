const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  email: {
  type: String,
},
  name: String,
  contact: String,
  academicDetails: String,
  address: String,
  dateOfBirth: String,
  gender: String,
  course: String,
  yearOfStudy: String,
  universityName: String,
  skills: String,
  experience: String,
});

module.exports = mongoose.model("Student", studentSchema);
