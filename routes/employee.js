import express from 'express';

import { createNewEmployee,employeeForgotPassword,getAllEmployee, getEmployeeReset, loginEmployee, savenewPassword,storage } from '../controller/employeeController.js';
const router = express.Router();
import multer from 'multer';
const upload = multer({storage:storage})
router.post('/newEmployee',upload.single("profilePicture"),createNewEmployee);
router.get('/employeesCollection',getAllEmployee);
router.post('/employeesignup',loginEmployee);
router.post('/forgotpasswor',employeeForgotPassword);
router.get('/reset-password/:id/:token',getEmployeeReset);
router.post('/reset-password/:id/:token',savenewPassword);
// router.post('/employeeotp',emails)

export default router;