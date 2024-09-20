import express from 'express';
import { getimageUploaded, storage } from '../controller/imagesController.js';
import { imageupload } from '../controller/imagesController.js';
import multer from 'multer';
const router = express.Router();
const upload = multer({storage:storage})
router.post('/newimage',upload.single("imagess"),imageupload);
router.get('/',getimageUploaded);
export default router; 