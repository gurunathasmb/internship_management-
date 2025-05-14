const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const authenticate = require('../middleware/authenticate');

// Protect all routes
router.use(authenticate('company'));

// Internships
router.get('/internships', companyController.getInternshipPosts);
router.post('/internships', companyController.createInternshipPost);
router.put('/internships/:id', companyController.updateInternshipPost);
router.delete('/internships/:id', companyController.deleteInternshipPost);
router.get('/internships/stats', companyController.getApplicationStats);
router.get('/internships/schedule', companyController.getInterviewSchedule);

// Applications
router.get('/applications', companyController.getApplicants);
router.get('/applications/:applicantId', companyController.getApplicantProfile);
router.get('/applications/:applicantId/notes', companyController.getPrivateNotes);
router.post('/applications/:applicantId/notes', companyController.addPrivateNote);
router.post("/company/applications/:applicantId/notes", companyController.savePrivateNote);
// Selection & Evaluation
router.get('/selection', companyController.getSelectionPanel);
router.get('/selection/evaluation/:applicantId', companyController.getEvaluationData);
router.post('/selection/evaluation/:applicantId', companyController.submitEvaluation);
router.post('/selection/offer/:applicantId', companyController.uploadOfferLetter);

// Communication
router.get('/communication/chat', companyController.getChats);
router.post('/communication/chat', companyController.sendChatMessage);
router.get('/communication/announcements', companyController.getAnnouncements);
router.post('/communication/announcements', companyController.createAnnouncement);
router.get('/communication/interview-invites', companyController.getInterviewInvites);
router.post('/communication/interview-invites', companyController.sendInterviewInvite);

// Analytics
router.get('/analytics', companyController.getAnalyticsData);

// Reports to Admin
router.get('/reports', companyController.getReports);
router.post('/reports', companyController.submitReport);

module.exports = router;
