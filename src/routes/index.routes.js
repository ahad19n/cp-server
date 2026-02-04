const express = require('express');
const router = express.Router();

router.use('/auth', require('./Auth.routes'));
router.use('/getShops', require('./Shop.routes'));

module.exports = router;
