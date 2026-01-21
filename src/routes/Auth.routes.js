const express = require('express');
const router = express.router();

const { generateOtp, verifyOtp } = require('../controllers/Auth.controller');

router.post('/otp', generateOtp);
router.post('/verify', verifyOtp);

module.exports = router;
