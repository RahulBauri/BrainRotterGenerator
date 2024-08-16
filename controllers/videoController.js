import { extractCaptions } from '../utils/extractCaptions.js';
import { processVideo } from '../utils/processVideo.js';
import { getRandomFile } from '../utils/getRandomFile.js';
import { EXTERNAL_STORAGE_PATHS } from '../config.js';
import path from 'path';
import fs from 'fs';

export const processSingleVideo = async (req, res) => {
  console.log('inside processSingleVideo controller');

  const inputVideoPath = path.resolve(req.file.path);
  const lowerVideoPath = path.resolve(
    await getRandomFile(EXTERNAL_STORAGE_PATHS.brainRottingVideos, '.mp4')
  );
  const outputVideoPath = path.join(
    EXTERNAL_STORAGE_PATHS.outputs,
    `output_video_${Date.now()}.mp4`
  );

  const captionsPath = path.join(
    EXTERNAL_STORAGE_PATHS.captions,
    path.format({
      name: path.parse(inputVideoPath).name,
      ext: '.srt',
    })
  );

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

    await res.download(outputVideoPath);
    console.log('downloadOutputVid');

    res.json({ msg: 'output video created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error processing the video' });
  }
};

export const processTwoVideos = async (req, res) => {
  const { video1, video2 } = req.files;

  const inputVideoPath = path.resolve(video1[0].path);

  const lowerVideoPath = path.resolve(video2[0].path);

  const outputVideoPath = path.join(
    EXTERNAL_STORAGE_PATHS.outputs,
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

    await res.download(outputVideoPath);
    console.log('downloadOutputVid');

    res.json('success');
  } catch (error) {
    res.status(500).json({ error: 'Error processing the video' });
  }
};

export const previewVideo = (req, res) => {
  const { filename } = req.params;
  const filePath = path.resolve(
    EXTERNAL_STORAGE_PATHS.brainRottingVideos,
    filename
  );

  res.download(filePath, (err) => {
    if (err) {
      if (!res.headersSent) {
        // Check if headers have already been sent
        return res.status(500).json({ error: 'Error downloading the video' });
      }
    }
  });
};

export const listVideos = async (req, res) => {
  const directoryPath = path.resolve(EXTERNAL_STORAGE_PATHS.brainRottingVideos);

  try {
    const files = await fs.promises.readdir(directoryPath);
    const videoFiles = files.filter((file) => path.extname(file) === '.mp4');

    const videoList = videoFiles.map((file) => ({
      name: file,
      thumbnail: `http://localhost:3000/api/v1/video/preview/${file}`, // Use the preview endpoint as thumbnail
    }));

    res.json(videoList);
  } catch (error) {
    res.status(500).json({ error: 'Error listing the videos' });
  }
};
