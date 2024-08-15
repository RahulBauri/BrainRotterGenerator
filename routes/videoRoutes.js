import express from 'express';
import { processSingleVideo, listVideos, previewVideo } from '../controllers/videoController.js';
import upload from '../middlewares/multerMiddleware.js';

const router = express.Router();

router.post('/processSingleVideo', upload.single('video'), processSingleVideo);
router.get('/list', listVideos);
router.get('/preview/:filename', previewVideo);

export default router;