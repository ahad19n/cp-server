const express = require('express');
const router = express.Router();

const { getUserJobs, createNewJob } = require('../controllers/Jobs.controller');

router.get('/', getUserJobs);
router.post('/', createNewJob);

module.exports = router;
