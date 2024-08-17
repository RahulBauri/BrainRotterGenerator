import multer from 'multer';
import path from 'path';
import { EXTERNAL_STORAGE_PATHS } from '../config.js';

// Define storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where files will be uploaded
    cb(null, EXTERNAL_STORAGE_PATHS.uploads); // Use the external uploads directory
  },
  filename: function (req, file, cb) {
    // Specify the file name
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Define file filter to accept only MP4 files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp4/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  console.log(file.originalname, file.mimetype);

  if (mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only MP4 files are allowed'), false);
  }
};

// Create multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // Optional: limit file size (e.g., 100MB)
});

export default upload;
