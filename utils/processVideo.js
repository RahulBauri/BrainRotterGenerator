import path from 'path';
import { execFile } from 'child_process';

export const processVideo = async (
  inputPath1,
  inputPath2,
  outputPath,
  captionsPath
) => {
  // Resolve paths
  const resolvedInputPath1 = path.resolve(inputPath1);
  const resolvedInputPath2 = path.resolve(inputPath2);
  const resolvedOutputPath = path.resolve(outputPath);

  console.log('Resolved input video path:', resolvedInputPath1);
  console.log('Resolved lower video path:', resolvedInputPath2);
  console.log('Resolved output video path:', resolvedOutputPath);
  console.log('captions path:', captionsPath);

  const ffmpegPath =
    'C:\\Users\\kumar\\Downloads\\ffmpeg\\ffmpeg-master-latest-win64-gpl\\bin\\ffmpeg.exe';

  const complexFilter =
    `[0:v]scale=1080:960:force_original_aspect_ratio=increase,crop=1080:960:(iw-1080)/2:(ih-960)/2[upper],` +
    `[1:v]scale=1080:960:force_original_aspect_ratio=increase,crop=1080:960:(iw-1080)/2:(ih-960)/2[lower],` +
    `[upper][lower]vstack=inputs=2[stacked],` +
    `[stacked]subtitles=${captionsPath}:force_style='Alignment=6'[stacked_with_subtitles],` +
    `[0:a]volume=1.0[upperaudio],` +
    `[upperaudio]anull[audio]`;

  const args = [
    '-i',
    resolvedInputPath1,
    '-i',
    resolvedInputPath2,
    '-filter_complex',
    complexFilter,
    '-map',
    '[stacked_with_subtitles]',
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
