const express = require("express");
const { getStudentApplications } = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/student", authMiddleware, getStudentApplications);

module.exports = router;
