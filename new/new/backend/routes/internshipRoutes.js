import express from 'express';
import Internship from '../models/Internship.js';

import {
  createInternship,
  applyInternship,
  getAllInternships
} from '../controllers/internshipController.js';
import { verifyCompany, verifyStudent } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', verifyCompany, createInternship);
//router.post('/', /*companyAuth,*/ createInternship); // Company posts
router.get('/', getAllInternships); // Student/faculty/admin view all
router.post('/:id/apply', verifyStudent, applyInternship); // Student applies

export default router;
