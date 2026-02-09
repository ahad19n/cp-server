const express = require('express');
const router = express.Router();

const { uploadFile, downloadFile, checkIfFileExists } = require('../controllers/Files.controller');

// -------------------------------------------------------------------------- //

router.post('/', uploadFile);
router.get('/:hash', downloadFile);
router.head('/:hash', checkIfFileExists);

// -------------------------------------------------------------------------- //

module.exports = router;
