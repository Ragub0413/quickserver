import express from 'express';

import { createNewEmployee,getAllEmployee, loginEmployee } from '../controller/employeeController.js';
const router = express.Router();

router.post('/newEmployee', createNewEmployee);
router.get('/employeesCollection',getAllEmployee);
router.post('/employeesignup',loginEmployee);

export default router;