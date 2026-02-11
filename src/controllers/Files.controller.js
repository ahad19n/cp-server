const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const { resp } = require('../func');
const { STORAGE_DIR } = require('../middlewares/handleFile');

exports.checkIfFileExists = async (req, res) => {
  const { hash } = req.params || {};

  if (!hash || !/^[a-f0-9]{64}$/.test(hash)) {
    return res.sendStatus(404);
  }

  const filePath = path.join(STORAGE_DIR, hash);

  if (fs.existsSync(filePath)) {
    return res.sendStatus(200);
  }

  return res.sendStatus(404);
};

exports.processFileUpload = async (req, res) => {
  const { file } = req;
  if (!file) return resp(res, 400, 'No file provided');

  const tempPath = req.file.path;
  const rawHash = crypto.createHash('sha256');
  const readStream = fs.createReadStream(tempPath);

  await new Promise((resolve, reject) => {
    readStream.on('end', resolve);
    readStream.on('error', reject);
    readStream.on('data', chunk => rawHash.update(chunk));
  });

  const hexHash = rawHash.digest('hex');
  const finalPath = path.join(STORAGE_DIR, hexHash);

  if (!fs.existsSync(finalPath)) {
    fs.renameSync(tempPath, finalPath);
  } else {
    fs.unlinkSync(tempPath);
  }

  return resp(res, 201, 'Uploaded file successfully', { hash: hexHash });
};

exports.downloadFile = async (req, res) => {
  const { hash } = req.params || {};

  if (!hash || !/^[a-f0-9]{64}$/.test(hash)) {
    return resp(res, 404, 'File not Found');
  }

  const filePath = path.join(STORAGE_DIR, hash);

  if (!fs.existsSync(filePath)) {
    return resp(res, 404, 'File not Found');
  }

  const stat = fs.statSync(filePath);
  res.setHeader('ETag', hash);
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', `inline; filename="${hash}"`);

  const readStream = fs.createReadStream(filePath);

  readStream.on('error', (err) => {
    console.error(err);
    res.destroy();
  });

  return readStream.pipe(res);
};
