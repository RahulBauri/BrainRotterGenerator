import express from 'express';
import {
  processSingleVideo,
  processTwoVideos,
} from '../controllers/videoController.js';
import upload from '../middlewares/multerMiddleware.js';

const router = express.Router();

router.post('/processSingleVideo', upload.single('video'), processSingleVideo);
router.post(
  '/processTwoVideo',
  upload.fields([{ name: 'video1' }, { name: 'video2' }]),
  processTwoVideos
);

export default router;
