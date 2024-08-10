import ffmpeg from 'fluent-ffmpeg';
import { generateCaptionsFromAudio } from './generateCaptionsFromAudio.js';

export const extractCaptions = async (inputPath, captionsPath) => {
  return new Promise((resolve, reject) => {
    // Try to extract captions assuming they're present as subtitles
    ffmpeg(inputPath)
      .output(captionsPath)
      .outputOptions('-map 0:s:0') // Assuming the first subtitle stream
      .on('end', () => {
        // Check if the captions file was created and is not empty
        fs.stat(captionsPath, (err, stats) => {
          if (err || stats.size === 0) {
            // Captions not found or empty, use ASR to generate captions
            generateCaptionsFromAudio(inputPath, captionsPath)
              .then(resolve)
              .catch(reject);
          } else {
            resolve();
          }
        });
      })
      .on('error', (err) => {
        // If extraction fails, fall back to ASR
        generateCaptionsFromAudio(inputPath, captionsPath)
          .then(resolve)
          .catch(reject);
      })
      .run();
  });
};
