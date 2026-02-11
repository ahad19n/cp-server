const fs = require('fs');
const path = require('path');
const multer = require('multer');

const STORAGE_DIR = path.join(process.cwd(), 'files');
const UPLOAD_DIR = path.join(process.cwd(), 'files/temp');

if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const upload = multer({
  dest: UPLOAD_DIR,
  limits: {
    fileSize: 100 * 1024 * 1024
  },
});

module.exports = {
  STORAGE_DIR,
  handleFile: upload.single('file')
};
