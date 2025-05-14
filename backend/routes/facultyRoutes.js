const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Faculty = require("../models/Faculty");
const Student = require("../models/Student");
const Internship = require("../models/Internship");
const Message = require("../models/Message");
const CalendarEvent = require("../models/CalendarEvent");

// ----------- Faculty Profile Routes -----------

// Get faculty profile
router.get("/profile", protect, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.user.id);
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });
    res.status(200).json(faculty);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update faculty profile
router.post("/profile", protect, async (req, res) => {
  const { name, email, contact, department, officeLocation, skills } = req.body;
  try {
    const faculty = await Faculty.findById(req.user.id);
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });

    faculty.name = name || faculty.name;
    faculty.email = email || faculty.email;
    faculty.contact = contact || faculty.contact;
    faculty.department = department || faculty.department;
    faculty.officeLocation = officeLocation || faculty.officeLocation;
    faculty.skills = skills || faculty.skills;

    await faculty.save();
    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ----------- Internship Routes -----------

// Create new internship
router.post("/internships", protect, async (req, res) => {
  const { title, description, requirements } = req.body;
  try {
    const internship = new Internship({
      title,
      description,
      requirements,
      facultyId: req.user.id,
    });
    await internship.save();
    res.status(201).json({ message: "Internship created successfully", internship });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get internships created by faculty
router.get("/internships", protect, async (req, res) => {
  try {
    const internships = await Internship.find({ facultyId: req.user.id });
    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update internship progress
router.post("/progress/:internshipId", protect, async (req, res) => {
  const { progress } = req.body;
  try {
    const internship = await Internship.findById(req.params.internshipId);
    if (!internship) return res.status(404).json({ message: "Internship not found" });

    internship.progress = progress || internship.progress;
    await internship.save();

    res.status(200).json({ message: "Internship progress updated!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ----------- Student Supervision Routes -----------

// Get a student's profile
router.get("/supervision/:studentId", protect, async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Submit evaluation for a student
router.post("/evaluation/:studentId", protect, async (req, res) => {
  const { evaluation, feedback } = req.body;
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.evaluation = evaluation;
    student.feedback = feedback;

    await student.save();
    res.status(200).json({ message: "Evaluation and feedback submitted!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ----------- Communication Routes -----------

// Send message to student
router.post("/communication/:studentId", protect, async (req, res) => {
  const { message } = req.body;
  try {
    const newMessage = new Message({
      facultyId: req.user.id,
      studentId: req.params.studentId,
      message,
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get messages sent by faculty
router.get("/communication", protect, async (req, res) => {
  try {
    const messages = await Message.find({ facultyId: req.user.id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ----------- Calendar Routes -----------

// Create calendar event
router.post("/calendar", protect, async (req, res) => {
  const { title, date, description } = req.body;
  try {
    const event = new CalendarEvent({
      title,
      date,
      description,
      facultyId: req.user.id,
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all calendar events
router.get("/calendar", protect, async (req, res) => {
  try {
    const events = await CalendarEvent.find({ facultyId: req.user.id });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
