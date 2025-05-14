const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const StudentController = require("../controllers/studentController");
const Student = require("../models/Student");
const upload = require("../middleware/upload");

// 🔒 Middleware
const verifyToken = authMiddleware.verifyToken;
const onlyStudent = authMiddleware.restrictTo("student");

// ✅ Apply token verification globally
router.use(verifyToken);

router.get("/profile", verifyToken, async (req, res) => {
  try {
    let profile = await Student.findOne({ userId: req.user._id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error("Error fetching student profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/profile", verifyToken, async (req, res) => {
  try {
    const profileData = {
      ...req.body,
      userId: req.user._id,
      email: req.user.email, // <--- add email from the authenticated user
    };

    const existing = await Student.findOne({ userId: req.user._id });

    if (existing) {
      await Student.findByIdAndUpdate(existing._id, profileData);
      res.json({ message: "Profile updated" });
    } else {
      const student = new Student(profileData);
      await student.save();
      res.json({ message: "Profile created" });
    }
  } catch (err) {
    console.error("Error saving student profile:", err);
    res.status(500).json({ message: err.message });
  }
});



// 📢 Internship-related endpoints
router.get("/internships", onlyStudent, StudentController.getInternships);
router.post("/apply/:internshipId", onlyStudent, StudentController.applyToInternship);
router.get("/applications", onlyStudent, StudentController.getApplications);

// 📜 Request certificate or experience letter
router.post("/certificates", onlyStudent, StudentController.requestCertificate);
router.post("/experience-letter", onlyStudent, StudentController.requestExperienceLetter);

module.exports = router;
