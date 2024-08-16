import fs from 'fs';
import path from 'path';
import { EXTERNAL_STORAGE_PATHS } from '../config.js';

export const getRandomFile = (directoryPath, extension) => {
  return new Promise((resolve, reject) => {
    fs.readdir(EXTERNAL_STORAGE_PATHS[directoryPath], (err, files) => {
      if (err) return reject(err);

      // Filter to only include files with the specified extension
      const filteredFiles = files.filter(
        (file) => path.extname(file) === extension
      );

      if (filteredFiles.length === 0) {
        return reject(
          new Error(
            `No files found in the directory with extension ${extension}`
          )
        );
      }

      // Pick a random file
      const randomFile =
        filteredFiles[Math.floor(Math.random() * filteredFiles.length)];
      resolve(path.join(EXTERNAL_STORAGE_PATHS[directoryPath], randomFile));
    });
  });
};
