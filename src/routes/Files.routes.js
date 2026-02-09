const express = require('express');
const router = express.Router();

const { handleIncomingFile } = require('../middlewares/Files.middleware');
const { downloadFile, checkIfFileExists, processFileUpload } = require('../controllers/Files.controller');

// -------------------------------------------------------------------------- //

router.get('/:hash', downloadFile);
router.head('/:hash', checkIfFileExists);
router.post('/', handleIncomingFile, processFileUpload);

// -------------------------------------------------------------------------- //

module.exports = router;
