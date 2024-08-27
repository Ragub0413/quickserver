import express from 'express';
import { getTestData } from '../controller/test.js';

const router = express.Router();
router.get('/', getTestData);

export default router;