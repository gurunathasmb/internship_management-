// controllers/internshipController.js
import Internship from '../models/Internship.js';

export const createInternship = async (req, res) => {
  try {
    const { title, description, type, company } = req.body;

    if (!company) {
      return res.status(400).json({ message: 'Company ID is required' });
    }

    const internship = new Internship({
      title,
      description,
      type,
      company: req.user._id
    });

    await internship.save();
    res.status(201).json({ success: true, data: internship });
  } catch (err) {
    console.error('Error creating internship:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const applyInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, resume } = req.body;

    // Just log or return for now, as we don't have an application model
    console.log(`Application for internship ${id}:`, { name, email, resume });

    res.status(200).json({ success: true, message: 'Application submitted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
