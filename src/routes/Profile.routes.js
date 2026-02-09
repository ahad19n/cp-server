const express = require('express');
const router = express.Router();

const { fetchUserProfile, updateUserProfile } = require('../controllers/Profile.controller'); 

// -------------------------------------------------------------------------- //

router.get('/', fetchUserProfile);
router.patch('/', updateUserProfile);

// -------------------------------------------------------------------------- //

module.exports = router;
