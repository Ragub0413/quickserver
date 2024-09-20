import express from 'express';

import { getFileUploaded,storageFile, sendFileAttachment, fileInprogressCompletedUpload, completeStatus, getSurvey, cancelStatus } from '../controller/fileController.js';
import { fileUpload } from '../controller/fileController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({storage:storageFile});

router.post('/filedocument', upload.single("file"),fileUpload);
router.post('/sendFileAttached',sendFileAttachment);
router.get('/',getFileUploaded);
router.post('/uploadforInprocessandCompleted',fileInprogressCompletedUpload);
router.post('/mailforcompletetransaction',completeStatus);
router.get('/completetransaction/survey/:id',getSurvey);
router.post('/canceltransaction',cancelStatus);


 
export default router;