const Application = require("../models/Application");

exports.getStudentApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user.id }).populate("internship");
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
