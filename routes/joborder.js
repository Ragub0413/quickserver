import express from 'express';

import { createNewJobOrder, getAllJobOders, getJobSearch } from '../controller/jobordersController.js';
const router = express.Router();

router.post('/newJobOrder', createNewJobOrder);
router.get('/jocollections',getAllJobOders);
router.get('/:id',getJobSearch)

export default router;