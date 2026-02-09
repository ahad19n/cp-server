const express = require('express');
const router = express.Router();

const handleFile = require('../middlewares/handleFile');
const { downloadFile, checkIfFileExists, processFileUpload } = require('../controllers/Files.controller');

router.get('/:hash', downloadFile);
router.head('/:hash', checkIfFileExists);
router.post('/', handleFile, processFileUpload);

module.exports = router;
