const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  certificateType: { type: String, required: true }, // "Experience Letter", etc.
  issuedDate: { type: Date, default: Date.now },
  description: { type: String },
  status: { type: String, enum: ["pending", "issued"], default: "pending" },
});

const Certificate = mongoose.model("Certificate", certificateSchema);
module.exports = Certificate;
