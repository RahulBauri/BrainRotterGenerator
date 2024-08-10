import { exec } from 'child_process'; // for running external commands

export const generateCaptionsFromAudio = async (inputPath, captionsPath) => {
  return new Promise((resolve, reject) => {
    // Use autosub or a similar tool to generate captions from the audio track
    const command = `autosub ${inputPath} -o ${captionsPath}`;

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
