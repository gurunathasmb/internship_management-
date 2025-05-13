const Student = require("../models/Student");
const Internship = require("../models/Internship");
const Application = require("../models/Application");
const Certificate = require("../models/Certificate");


exports.getProfile = async (req, res) => {
  try {
    // Fetching the student using the user ID from the JWT token
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  const {
    name,
    contact,
    academicDetails,
    address,
    dateOfBirth,
    gender,
    course,
    yearOfStudy,
    universityName,
    skills,
    experience,
    profilePicture,
  } = req.body;

  try {
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Update the student's details
    student.name = name || student.name;
    student.contact = contact || student.contact;
    student.academicDetails = academicDetails || student.academicDetails;
    student.address = address || student.address;
    student.dateOfBirth = dateOfBirth || student.dateOfBirth;
    student.gender = gender || student.gender;
    student.course = course || student.course;
    student.yearOfStudy = yearOfStudy || student.yearOfStudy;
    student.universityName = universityName || student.universityName;
    student.skills = skills || student.skills;
    student.experience = experience || student.experience;
    student.profilePicture = profilePicture || student.profilePicture;

    // Save the updated profile
    await student.save();
    
    res.json(student); // Return the updated student profile
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
};


exports.getInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    if (!internships.length) {
      return res.status(404).json({ message: "No internships found" });
    }
    res.json(internships);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching internships" });
  }
};

exports.applyToInternship = async (req, res) => {
  try {
    const application = new Application({
      student: req.user.id,
      internship: req.params.internshipId,
      status: "pending",
    });
    await application.save();
    res.status(201).json({ message: "Application submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error applying for internship" });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user.id }).populate("internship");
    if (!applications.length) {
      return res.status(404).json({ message: "No applications found" });
    }
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching applications" });
  }
};

exports.requestCertificate = async (req, res) => {
  try {
    const cert = new Certificate({
      student: req.user.id,
      type: req.body.type,
      status: "requested",
    });
    await cert.save();
    res.status(201).json({ message: "Certificate requested" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error requesting certificate" });
  }
};

exports.requestExperienceLetter = async (req, res) => {
  try {
    const letter = new Certificate({
      student: req.user.id,
      type: "experience-letter",
      status: "requested",
    });
    await letter.save();
    res.status(201).json({ message: "Experience letter requested" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error requesting experience letter" });
  }
};
