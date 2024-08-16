import path from 'path';
import dotenv from 'dotenv';

// export const EXTERNAL_STORAGE_PATH = path.resolve(
//   __dirname,
//   '../../../external_storage'
// );

// Load environment variables from .env file
dotenv.config();

const EXTERNAL_STORAGE_BASE_PATH = path.resolve(
  process.env.EXTERNAL_STORAGE_BASE_PATH
);

export const EXTERNAL_STORAGE_PATHS = {
  uploads: path.join(EXTERNAL_STORAGE_BASE_PATH, process.env.UPLOADS_DIR),
  outputs: path.join(EXTERNAL_STORAGE_BASE_PATH, process.env.OUTPUTS_DIR),
  brainRottingVideos: path.join(
    EXTERNAL_STORAGE_BASE_PATH,
    process.env.BRAIN_ROTTING_VIDEOS_DIR
  ),
  brainRottingAudios: path.join(
    EXTERNAL_STORAGE_BASE_PATH,
    process.env.BRAIN_ROTTING_AUDIOS_DIR
  ),
};
