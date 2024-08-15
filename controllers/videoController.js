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
    path.resolve(),
    'outputs',
    `output_video_${Date.now()}.mp4`
  );

  const captionsPath =
    'captions/' +
    path.format({
      name: path.parse(inputVideoPath).name,
      ext: '.srt',
    });

  const includeMusic = req.query.includeMusic === 'true'; // Check if music should be included

  console.log('input video path:', inputVideoPath);
  console.log('lower video path:', lowerVideoPath);
  console.log('output video path:', outputVideoPath);
  console.log('captions path:', captionsPath);

  try {
    const captions = await extractCaptions(inputVideoPath, captionsPath);
    const outputVid = await processVideo(
      inputVideoPath,
      lowerVideoPath,
      outputVideoPath,
      captionsPath
      // includeMusic
    );
    console.log('we get outputVid');

    const downloadOutputVid = await res.download(outputVideoPath);
    console.log('downloadOutputVid');

    res.json({ msg: 'optput video created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error processing the video' });
  }
};

export const processTwoVideos = async (req, res) => {
  const { video1, video2 } = req.files;

  const inputVideoPath = path.resolve(video1[0].path);
  const lowerVideoPath = path.resolve(video2[0].path);

  const outputVideoPath = path.join(
    path.resolve(),
    'outputs',
    `output_video_${Date.now()}.mp4`
  );

  const captionsPath =
    'captions/' +
    path.format({
      name: path.parse(inputVideoPath).name,
      ext: '.srt',
    });

  const includeMusic = req.query.includeMusic === 'true'; // Check if music should be included

  console.log('input video path:', inputVideoPath);
  console.log('lower video path:', lowerVideoPath);
  console.log('output video path:', outputVideoPath);
  console.log('captions path:', captionsPath);

  try {
    const captions = await extractCaptions(inputVideoPath, captionsPath);
    const outputVid = await processVideo(
      inputVideoPath,
      lowerVideoPath,
      outputVideoPath,
      captionsPath
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
