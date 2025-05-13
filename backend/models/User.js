const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "faculty", "admin", "company"], required: true },
  profile: {
    firstName: String,
    lastName: String,
    bio: String,
    // Add more fields as required
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
