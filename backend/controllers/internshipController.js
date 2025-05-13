const Internship = require("../models/Internship");

exports.getInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    res.status(200).json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.applyToInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: "Internship not found" });

    const student = await User.findById(req.user.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    internship.studentsApplied.push(student._id);
    await internship.save();

    res.status(200).json({ message: "Application successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
