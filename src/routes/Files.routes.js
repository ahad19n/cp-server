const express = require('express');
const router = express.Router();

const { handleFile } = require('../middlewares/handleFile');
const { downloadFile, checkIfFileExists, processFileUpload } = require('../controllers/Files.controller');

router.head('/:hash', checkIfFileExists);
router.post('/', handleFile, processFileUpload);
router.get('/:hash', downloadFile);

module.exports = router;
