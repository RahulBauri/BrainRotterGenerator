import express from 'express';
import { processSingleVideo } from '../controllers/videoController.js';
import upload from '../middlewares/multerMiddleware.js';

const router = express.Router();

router.post('/processSingleVideo', upload.single('video'), processSingleVideo);

export default router;
