const express = require("express");
const { requestCertificate } = require("../controllers/certificateController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/request", authMiddleware, requestCertificate);

module.exports = router;
