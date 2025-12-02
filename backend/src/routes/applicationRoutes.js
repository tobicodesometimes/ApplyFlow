import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} from '../controllers/applicationController.js';

const router = express.Router();

router.use(protect); // all routes below require auth

router.route('/')
  .post(createApplication)
  .get(getApplications);

router.route('/:id')
  .get(getApplicationById)
  .put(updateApplication)
  .delete(deleteApplication);

router.delete('/:id', protect, deleteApplication);

export default router;
