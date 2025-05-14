import express from 'express';
import {
  getAllStudents,
  getAllCompanies,
  getApplicationsReport
} from '../controllers/adminController.js';
// import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

router.get('/students', /*adminAuth,*/ getAllStudents);
router.get('/companies', /*adminAuth,*/ getAllCompanies);
router.get('/applications-report', /*adminAuth,*/ getApplicationsReport);

export default router;
