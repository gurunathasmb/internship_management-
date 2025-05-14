const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Faculty = require("../models/Faculty");
const Student = require("../models/Student");
const Internship = require("../models/Internship");
const Message = require("../models/Message");
const CalendarEvent = require("../models/CalendarEvent");

// --------------- Faculty Profile Routes ---------------

// @desc    Get faculty profile
// @route   GET /api/faculty/profile
// @access  Private
// @desc    Get faculty profile
// @route   GET /api/faculty/profile
// @access  Private
router.get("/profile", protect, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.user.id); // Use req.user.id from JWT
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });

    res.status(200).json(faculty);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Update faculty profile
// @route   PUT /api/faculty/profile
// @access  Private
router.put("/profile", protect, async (req, res) => {
  const { name, email, contact, department, officeLocation, skills } = req.body;

  try {
    // Fetch faculty by ID using the JWT from req.user.id
    const faculty = await Faculty.findById(req.user.id);
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });

    // Update faculty fields with provided data (preserving existing data if no update is given)
    faculty.name = name || faculty.name;
    faculty.email = email || faculty.email;
    faculty.contact = contact || faculty.contact;
    faculty.department = department || faculty.department;
    faculty.officeLocation = officeLocation || faculty.officeLocation;
    faculty.skills = skills || faculty.skills;

    // Save updated faculty profile
    await faculty.save();
    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// --------------- Internship Routes ---------------

// @desc    Upload an internship
// @route   POST /api/faculty/upload-internship
// @access  Private
// @access  Private (only faculty can create internships)
router.post("/internships", protect, async (req, res) => {
  const { title, description, requirements, facultyId } = req.body;

  try {
    // Create a new internship
    const internship = new Internship({
      title,
      description,
      requirements,
      facultyId: req.user.id, // Use the faculty ID from the JWT token (passed through `protect` middleware)
    });

    await internship.save();
    res.status(201).json({ message: "Internship created successfully", internship });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// @desc    Get all internships for a faculty
// @route   GET /api/faculty/internships
// @access  Private (only faculty can view their internships)
router.get("/internships", protect, async (req, res) => {
  try {
    const internships = await Internship.find({ facultyId: req.user.id });
    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Get all internships for oversight
// @route   GET /api/faculty/oversight
// @access  Private
router.get("/oversight", protect, async (req, res) => {
  try {
    const internships = await Internship.find({ facultyId: req.user.id });
    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Update internship progress
// @route   PUT /api/faculty/progress/:internshipId
// @access  Private
router.put("/progress/:internshipId", protect, async (req, res) => {
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

// --------------- Student Supervision Routes ---------------

// @desc    Get student profile for supervision
// @route   GET /api/faculty/supervision/:studentId
// @access  Private
router.get("/supervision/:studentId", protect, async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Provide evaluation for a student
// @route   POST /api/faculty/evaluation/:studentId
// @access  Private
router.post("/evaluation/:studentId", protect, async (req, res) => {
  const { evaluation, feedback } = req.body;

  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Add evaluation/feedback to student's record
    student.evaluation = evaluation;
    student.feedback = feedback;

    await student.save();
    res.status(200).json({ message: "Evaluation and feedback submitted!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// --------------- Faculty Communication Routes ---------------

// @desc    Send a message to a student
// @route   POST /api/faculty/communication/:studentId
// @access  Private
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

// @desc    Get all messages for a faculty member
// @route   GET /api/faculty/communication
// @access  Private
router.get("/communication", protect, async (req, res) => {
  try {
    const messages = await Message.find({ facultyId: req.user.id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// --------------- Faculty Calendar Routes ---------------

// @desc    Create a new calendar event
// @route   POST /api/faculty/calendar
// @access  Private
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

// @desc    Get all calendar events
// @route   GET /api/faculty/calendar
// @access  Private
router.get("/calendar", protect, async (req, res) => {
  try {
    const events = await CalendarEvent.find({ facultyId: req.user.id });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
