import { exec } from 'child_process'; // for running external commands
import path from 'path';

export const generateCaptionsFromAudio = async (inputPath, captionsPath) => {
  return new Promise((resolve, reject) => {
    // Define the Python command to run whisper
    const resolvedInputPath = path.resolve(inputPath);
    const resolvedCaptionsPath = path.resolve(captionsPath);
    const command = `python -m whisper ${resolvedInputPath} --output_format srt --output_dir ${path.dirname(
      resolvedCaptionsPath
    )} --model tiny`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error generating captions: ${stderr}`);
        return reject(error);
      }
      console.log(stdout);
      resolve();
    });
  });
};
