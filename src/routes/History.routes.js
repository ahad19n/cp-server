const express = require('express');
const router = express.Router();

const { getUserHistory } = require('../controllers/History.controller');

router.get('/', getUserHistory);

module.exports = router;
