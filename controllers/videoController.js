import { extractCaptions } from '../utils/extractCaptions.js';
import { processVideo } from '../utils/processVideo.js';
import { getRandomFile } from '../utils/getRandomFile.js';
import path from 'path';

export const processSingleVideo = async (req, res) => {
  console.log('inside processSingleVideo controller');

  const inputVideoPath = path.resolve(req.file.path);
  const lowerVideoPath = path.resolve(
    await getRandomFile('brainRottingVideos', '.mp4')
  );
  const outputVideoPath = path.join(
    'D:\\My_Projects\\BrainRotterGenerator\\backend\\outputs',
    `output_video_${Date.now()}.mp4`
  );

  const captionsPath = 'uploads/captions.srt'; // Path where the captions file will be saved
  const includeMusic = req.query.includeMusic === 'true'; // Check if music should be included

  console.log('input video path:', inputVideoPath);
  console.log('lower video path:', lowerVideoPath);
  console.log('output video path:', outputVideoPath);

  try {
    // const captions = await extractCaptions(inputVideoPath, captionsPath);
    const outputVid = await processVideo(
      inputVideoPath,
      lowerVideoPath,
      // captionsPath,
      outputVideoPath
      // includeMusic
    );
    console.log('we get outputVid');

    const downloadOutputVid = await res.download(outputVideoPath);
    console.log('downloadOutputVid');

    res.json('success');
  } catch (error) {
    res.status(500).json({ error: 'Error processing the video' });
  }
};
