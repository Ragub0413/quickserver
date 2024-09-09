import express from 'express';

import { createNewEmployee,getAllEmployee } from '../controller/employeeController.js';
const router = express.Router();

router.post('/newEmployee', createNewEmployee);
router.get('/employeesCollection',getAllEmployee);

export default router;