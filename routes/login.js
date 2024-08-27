import express from 'express';
import { loginData, getEmployeee} from '../controller/login.js';

const router = express.Router();
router.post('/signin', loginData);
router.get('/all', getEmployeee);

export default router;