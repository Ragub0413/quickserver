import express from 'express';

import { createNewJobOrder, getAllJobOders, getJobSearch, sentEmailForInspection } from '../controller/jobordersController.js';
const router = express.Router();

router.post('/newJobOrder', createNewJobOrder);
router.get('/jocollections',getAllJobOders);
router.get('/:id',getJobSearch)
router.post('/sendinspectionnotice',sentEmailForInspection);

export default router;