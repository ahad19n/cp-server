const express = require('express');
const router = express.Router();

// -------------------------------------------------------------------------- //

router.use('/auth', require('./Auth.routes'));
router.use('/shops', require('./Shop.routes'));
router.use('/history', require('./History.routes'));
router.use('/user', require('./User.routes'));

// -------------------------------------------------------------------------- //

module.exports = router;
