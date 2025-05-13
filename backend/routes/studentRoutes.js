const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const StudentController = require("../controllers/studentController");

// Apply authentication middleware for all routes
router.use(authMiddleware.verifyToken);

// Define routes
router.get("/profile", StudentController.getProfile);
router.put("/profile", StudentController.updateProfile);
router.get("/internships", StudentController.getInternships);
router.post("/apply/:internshipId", StudentController.applyToInternship);
router.get("/applications", StudentController.getApplications);
router.post("/certificates", StudentController.requestCertificate);
router.post("/experience-letter", StudentController.requestExperienceLetter);

module.exports = router;
