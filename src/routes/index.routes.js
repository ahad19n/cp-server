const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/Auth.middleware');

// -------------------------------------------------------------------------- //

router.use('/auth', require('./Auth.routes'));
router.use('/files', verifyToken, require('./Files.routes'));
router.use('/shops', verifyToken, require('./Shops.routes'));
router.use('/history', verifyToken, require('./History.routes'));
router.use('/profile', verifyToken, require('./Profile.routes'));

// -------------------------------------------------------------------------- //

module.exports = router;
