const express = require('express');
const router = express.Router();

const verifyAuth = require('../middlewares/verifyAuth');
const { handleFile } = require('../middlewares/handleFile');
const { downloadFile, uploadFile, getFileStatus, updateFile } = require('../controllers/Files.controller');

// -------------------------------------------------------------------------- //

router.get('/:hash', downloadFile);
router.post('/', handleFile, uploadFile);
router.get('/:hash/status', getFileStatus);
router.post('/:hash/update', verifyAuth({ type: 'key' }), updateFile);

// -------------------------------------------------------------------------- //

module.exports = router;
