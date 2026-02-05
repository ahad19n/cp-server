const express = require('express');
const router = express.Router();
const { updateUserProfile } = require('../controllers/User.controller'); 

// -------------------------------------------------------------------------- //

router.patch('/', updateUserProfile);

// -------------------------------------------------------------------------- //

module.exports = router;