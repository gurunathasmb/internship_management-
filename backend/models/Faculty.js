const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
  department: { type: String },
  officeLocation: { type: String },
  skills: { type: String },
  role: { type: String, default: "faculty" },
});

module.exports = mongoose.model("Faculty", facultySchema);
