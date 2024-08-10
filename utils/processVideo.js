/*

import { getRandomFile } from './getRandomFile.js';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

export const processVideo = async (inputPath, outputPath, includeMusic) => {
  try {
    // Resolve paths and ensure output directory exists
    const resolvedOutputPath = path.resolve(outputPath);
    const outputDir = path.dirname(resolvedOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const lowerVideoPath = await getRandomFile('brainRottingVideos', '.mp4');

    // Log paths for debugging
    console.log('Resolved input path:', path.resolve(inputPath));
    console.log('Resolved lower video path:', path.resolve(lowerVideoPath));
    console.log('Resolved output path:', resolvedOutputPath);

    // Define filter complex

    // let filterComplex = [
    //   '[0:v]split[upper][bg]; [upper]crop=in_w:in_h/2:0:0,scale=1080:1920[upper]; [1:v]crop=in_w:in_h/2:0:in_h/2,scale=1080:1920[lower]; [upper][lower]vstack[stacked]',
    //   'subtitles=' + path.resolve(captionsPath) + ":force_style='Alignment=6,MarginV=20'",
    //   '[0:a]volume=1.0[upperaudio]', // Keep the upper video audio at full volume
    // ];

    // let filterComplex = [
    //   '[0:v]split[upper][bg]; [upper]crop=in_w:in_h/2:0:0,scale=1080:1920[upper]; [1:v]crop=in_w:in_h/2:0:in_h/2,scale=1080:1920[lower]; [upper][lower]vstack[stacked]',
    //   '[0:a]volume=1.0[upperaudio]',
    // ];

    // let filterComplex = [
    //   '[0:v]split=2[upper][bg]; [upper]crop=in_w:in_h/2:0:0,scale=1080:1920[upper]; [bg]crop=in_w:in_h/2:0:in_h/2,scale=1080:1920[lower]; [upper][lower]vstack=inputs=2[stacked]; [0:a]volume=1.0[upperaudio]',
    // ];

    // let filterComplex = [
    //   '[0:v]crop=in_w:in_h/2:0:0,scale=1080:1920[upper]',
    //   '[1:v]crop=in_w:in_h/2:0:0,scale=1080:1920[lower]',
    //   '[upper][lower]vstack=inputs=2[stacked]',
    //   '[0:a]volume=1.0[upperaudio]',
    // ];

    let filterComplex = [
      // Scale the upper video to fit the upper half of the screen
      '[0:v]scale=1080:960:force_original_aspect_ratio=increase,crop=1080:960[upper]',
      // Scale the lower video to fit the lower half of the screen
      '[1:v]scale=1080:960:force_original_aspect_ratio=increase,crop=1080:960[lower]',
      // Stack the two videos vertically
      '[upper][lower]vstack=inputs=2[stacked]',
      // Adjust the audio of the upper video
      '[0:a]volume=1.0[upperaudio]',
    ];

    if (includeMusic) {
      const backgroundMusicPath = await getRandomFile(
        'brainRottingAudios',
        '.mp3'
      );
      filterComplex.push(
        `movie=${path.resolve(backgroundMusicPath)},volume=0.3[bgmusic]`, // Set background music volume lower
        '[upperaudio][bgmusic]amix=inputs=2:duration=first[audio]' // Mix the upper video audio with the background music
      );
    } else {
      filterComplex.push('[upperaudio]anull[audio]'); // Keep only the upper video audio
    }

    // Run FFmpeg command
    return new Promise((resolve, reject) => {
      ffmpeg(path.resolve(inputPath))
        .input(path.resolve(lowerVideoPath))
        .complexFilter(filterComplex, ['stacked', 'audio'])
        .map('[stacked]')
        .map('[audio]')
        .output(resolvedOutputPath)
        .on('end', () => {
          console.log('FFmpeg process completed successfully.');
          resolve();
        })
        .on('error', (err) => {
          console.error('FFmpeg Error:', err);
          reject(err);
        })
        .run();
    });
  } catch (err) {
    console.error('Error in processing video:', err);
    throw err;
  }
};

*/

// import ffmpeg from 'fluent-ffmpeg';
// import path from 'path';

// export const processVideo = async (inputPath1, inputPath2, outputPath) => {
//   try {
//     const ffmpegPath =
//       'C:\\Users\\kumar\\Downloads\\ffmpeg\\ffmpeg-master-latest-win64-gpl\\bin\\ffmpeg.exe';
//     ffmpeg.setFfmpegPath(ffmpegPath);
//     console.log('FFmpeg path is set to:', ffmpegPath); // Log the path manually

//     const ffmpegPathcheck = ffmpeg.path; // get the path to the ffmpeg binary
//     console.log(`FFmpeg path: ${ffmpegPathcheck}`);

//     // Resolve paths
//     const resolvedInputPath1 = path.resolve(inputPath1);
//     const resolvedInputPath2 = path.resolve(inputPath2);
//     const resolvedOutputPath = path.resolve(outputPath);

//     console.log('Resolved input video path:', resolvedInputPath1);
//     console.log('Resolved lower video path:', resolvedInputPath2);
//     console.log('Resolved output video path:', resolvedOutputPath);

//     // Run FFmpeg command
//     return new Promise((resolve, reject) => {
//       ffmpeg(resolvedInputPath1)
//         .input(resolvedInputPath2)
//         .complexFilter(
//           [
//             '[0:v]scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2[upper]',
//             '[1:v]scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2[lower]',
//             '[upper][lower]vstack=inputs=2[stacked]',
//             '[0:a]volume=1.0[upperaudio]',
//             '[upperaudio]anull[audio]',
//           ],
//           ['stacked', 'audio']
//         )
//         .map('[stacked]')
//         .map('[audio]')
//         .output(resolvedOutputPath)
//         .on('end', () => {
//           console.log('FFmpeg process completed successfully.');
//           resolve();
//         })
//         .on('error', (err) => {
//           console.error('FFmpeg Error:', err);
//           reject(err);
//         })
//         // .on('stderr', (stderrLine) => {
//         //   console.log('FFmpeg Log:', stderrLine);
//         // })
//         .run();
//     });
//   } catch (err) {
//     console.error('Error in processing video:', err);
//     throw err;
//   }
// };

import path from 'path';
import { execFile } from 'child_process';

export const processVideo = async (inputPath1, inputPath2, outputPath) => {
  // Resolve paths
  const resolvedInputPath1 = path.resolve(inputPath1);
  const resolvedInputPath2 = path.resolve(inputPath2);
  const resolvedOutputPath = path.resolve(outputPath);

  console.log('Resolved input video path:', resolvedInputPath1);
  console.log('Resolved lower video path:', resolvedInputPath2);
  console.log('Resolved output video path:', resolvedOutputPath);

  const ffmpegPath =
    'C:\\Users\\kumar\\Downloads\\ffmpeg\\ffmpeg-master-latest-win64-gpl\\bin\\ffmpeg.exe';

  const complexFilter =
    '[0:v]scale=1080:960:force_original_aspect_ratio=increase,crop=1080:960:(iw-1080)/2:(ih-960)/2[upper],' +
    '[1:v]scale=1080:960:force_original_aspect_ratio=increase,crop=1080:960:(iw-1080)/2:(ih-960)/2[lower],' +
    '[upper][lower]vstack=inputs=2[stacked],' +
    '[0:a]volume=1.0[upperaudio],' +
    '[upperaudio]anull[audio]';

  const args = [
    '-i',
    resolvedInputPath1,
    '-i',
    resolvedInputPath2,
    '-filter_complex',
    complexFilter,
    '-map',
    '[stacked]',
    '-map',
    '[audio]',
    '-c:v',
    'libx264', // Use H.264 codec for video
    '-c:a',
    'aac', // Use AAC codec for audio
    '-b:v',
    '4M', // Video bitrate (4 Mbps)
    '-b:a',
    '192k', // Audio bitrate (192 kbps)
    '-preset',
    'medium', // Encoding speed vs. compression
    '-movflags',
    '+faststart', // Optimize for streaming
    resolvedOutputPath,
  ];

  execFile(ffmpegPath, args, (error, stdout, stderr) => {
    if (error) {
      console.error(`execFile error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
};
