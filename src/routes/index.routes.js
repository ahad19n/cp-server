const express = require('express');
const router = express.Router();

const verifyAuthFactory = require('../middlewares/verifyAuth');
const anyAuth = verifyAuthFactory();

router.use('/auth',               require('./Auth.routes'));
router.use('/jobs',     anyAuth,  require('./Jobs.routes'));
router.use('/files',    anyAuth,  require('./Files.routes'));
router.use('/shops',    anyAuth,  require('./Shops.routes'));
router.use('/history',  anyAuth,  require('./History.routes'));
router.use('/profile',  anyAuth,  require('./Profile.routes'));

module.exports = router;
