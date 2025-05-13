const express = require("express");
const { getInternships, applyToInternship } = require("../controllers/internshipController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getInternships);
router.post("/apply/:id", authMiddleware, applyToInternship);

module.exports = router;
