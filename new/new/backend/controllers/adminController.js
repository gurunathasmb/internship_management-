import User from '../models/User.js';
import Internship from '../models/Internship.js';

// Get all students
export const getAllStudents = async (req, res) => {
  const students = await User.find({ role: 'student' });
  res.json(students);
};

// Get all companies
export const getAllCompanies = async (req, res) => {
  const companies = await User.find({ role: 'company' });
  res.json(companies);
};

// Get all applications report
export const getApplicationsReport = async (req, res) => {
  const internships = await Internship.find()
    .populate('company', 'username')
    .populate('applications', 'username email');
  // Optionally format the report
  res.json(internships);
};
