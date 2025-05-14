const mongoose = require("mongoose");

const calendarEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
});

module.exports = mongoose.model("CalendarEvent", calendarEventSchema);
