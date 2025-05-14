// controllers/companyController.js

// Internships
exports.getInternshipPosts = (req, res) => {
  res.json({ message: 'List of internship posts' });
};

exports.createInternshipPost = (req, res) => {
  res.json({ message: 'Internship post created' });
};

exports.updateInternshipPost = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Internship post ${id} updated` });
};

exports.deleteInternshipPost = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Internship post ${id} deleted` });
};

exports.getApplicationStats = (req, res) => {
  res.json({ message: 'Application statistics data' });
};

exports.getInterviewSchedule = (req, res) => {
  res.json({ message: 'Interview schedule data' });
};

// Applications
// backend/controllers/companyController.js

exports.getApplicants = (req, res) => {
  // Sample data, replace with real data from the database
  const applicants = [
    { id: 1, name: "Alice", internship: "Frontend Developer", status: "Applied" },
    { id: 2, name: "Bob", internship: "Data Analyst", status: "Shortlisted" },
    { id: 3, name: "Charlie", internship: "Backend Developer", status: "Accepted" }
  ];

  res.json(applicants); // Send the applicants array as the response
};
// backend/controllers/companyController.js

exports.getApplicantProfile = (req, res) => {
  const { applicantId } = req.params;

  // Sample data, replace with real data from the database
  const applicants = [
    { id: 1, name: "Alice", internship: "Frontend Developer", status: "Applied", email: "alice@example.com", phone: "123-456-7890", resumeUrl: "https://example.com/resume/alice", portfolioUrl: "https://example.com/portfolio/alice" },
    { id: 2, name: "Bob", internship: "Data Analyst", status: "Shortlisted", email: "bob@example.com", phone: "987-654-3210", resumeUrl: "https://example.com/resume/bob", portfolioUrl: "https://example.com/portfolio/bob" }
  ];

  // Find applicant by ID
  const applicant = applicants.find(app => app.id === parseInt(applicantId));
  
  if (applicant) {
    res.json(applicant); // Send the applicant data as the response
  } else {
    res.status(404).json({ message: "Applicant not found" });
  }
};

const notesDB = {}; // A simple in-memory store for notes, replace with a real database

exports.savePrivateNote = (req, res) => {
  const { applicantId } = req.params;
  const { note } = req.body;

  // Check if the note is provided
  if (!note || note.trim() === "") {
    return res.status(400).json({ message: "Note cannot be empty" });
  }

  // Save the note in a simulated database (you would replace this with actual database code)
  if (!notesDB[applicantId]) {
    notesDB[applicantId] = [];
  }

  notesDB[applicantId].push(note); // Save the note for the applicant

  res.status(200).json({ message: "Note saved successfully" });
};
exports.getPrivateNotes = (req, res) => {
  const { applicantId } = req.params;
  res.json({ message: `Private notes for ${applicantId}` });
};

exports.addPrivateNote = (req, res) => {
  const { applicantId } = req.params;
  const { note } = req.body;
  res.json({ message: `Note added for applicant ${applicantId}: ${note}` });
};

// Selection & Evaluation
exports.getSelectionPanel = (req, res) => {
  res.json({ message: 'Selection panel data' });
};

exports.getEvaluationData = (req, res) => {
  const { applicantId } = req.params;
  res.json({ message: `Evaluation data for ${applicantId}` });
};

exports.submitEvaluation = (req, res) => {
  const { applicantId } = req.params;
  const { evaluation } = req.body;
  res.json({ message: `Evaluation for ${applicantId} submitted: ${evaluation}` });
};

exports.uploadOfferLetter = (req, res) => {
  const { applicantId } = req.params;
  res.json({ message: `Offer letter uploaded for ${applicantId}` });
};

// Communication
exports.getChats = (req, res) => {
  res.json({ message: 'List of company chat messages' });
};

exports.sendChatMessage = (req, res) => {
  const { message } = req.body;
  res.json({ message: `Chat message sent: ${message}` });
};

exports.getAnnouncements = (req, res) => {
  res.json({ message: 'List of company announcements' });
};

exports.createAnnouncement = (req, res) => {
  const { announcement } = req.body;
  res.json({ message: `Announcement created: ${announcement}` });
};

exports.getInterviewInvites = (req, res) => {
  res.json({ message: 'List of interview invites' });
};

exports.sendInterviewInvite = (req, res) => {
  const { invite } = req.body;
  res.json({ message: `Interview invite sent: ${invite}` });
};

// Analytics
// backend/controllers/companyController.js

exports.getAnalyticsData = (req, res) => {
  // Sample data, replace with real logic or database queries
  const analyticsData = {
    applicationsPerInternship: [
      { title: 'Software Engineer Internship', applicationCount: 150 },
      { title: 'Data Scientist Internship', applicationCount: 120 },
      { title: 'Product Manager Internship', applicationCount: 100 }
    ],
    conversionRates: [
      { internshipTitle: 'Software Engineer Internship', conversionRate: 50 },
      { internshipTitle: 'Data Scientist Internship', conversionRate: 45 },
      { internshipTitle: 'Product Manager Internship', conversionRate: 60 }
    ],
    feedback: 'The internships are attracting strong candidates, but we need to improve our conversion rates.'
  };

  res.json(analyticsData);
};


// Reports to Admin
exports.getReports = (req, res) => {
  res.json({ message: 'List of reports to admin' });
};

exports.submitReport = (req, res) => {
  const { report } = req.body;
  res.json({ message: `Report submitted: ${report}` });
};
