import { execFile } from 'child_process';

export const processVideo = async (
  inputPath1,
  inputPath2,
  outputPath,
  captionsPath
) => {
  return new Promise((resolve, reject) => {
    const ffmpegPath =
      'C:\\Users\\kumar\\Downloads\\ffmpeg\\ffmpeg-master-latest-win64-gpl\\bin\\ffmpeg.exe';

    // Escape backslashes and single quotes
    const escapedCaptionsPath = captionsPath
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'");

    const complexFilter = `
      [0:v]scale=1080:960:force_original_aspect_ratio=increase,crop=1080:960:(iw-1080)/2:(ih-960)/2[upper];
      [upper]subtitles=${escapedCaptionsPath}:force_style='Fontsize=24,Fontcolor=white,Box=1,Boxcolor=black@0.5,Boxborderw=5'[upper_subtitled];
      [1:v]scale=1080:960:force_original_aspect_ratio=increase,crop=1080:960:(iw-1080)/2:(ih-960)/2[lower];
      [upper_subtitled][lower]vstack=inputs=2[stacked];
      [0:a]volume=1.0[upperaudio];
      [upperaudio]anull[audio]`;

    const args = [
      '-i',
      inputPath1,
      '-i',
      inputPath2,
      '-filter_complex',
      complexFilter.replace(/\n/g, ''),
      '-map',
      '[stacked]',
      '-map',
      '[audio]',
      '-c:v',
      'libx264',
      '-c:a',
      'aac',
      '-b:v',
      '4M',
      '-b:a',
      '192k',
      '-preset',
      'medium',
      '-movflags',
      '+faststart',
      outputPath,
    ];

    execFile(ffmpegPath, args, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during video processing: ${stderr}`);
        return reject(error);
      }
      console.log(`Video processed successfully: ${stdout}`);
      resolve(outputPath);
    });
  });
};
