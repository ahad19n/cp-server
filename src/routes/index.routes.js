const express = require('express');
const router = express.Router();

router.use('/auth', require('./Auth.routes'));
router.use('/getShops', require('./Shop.routes'));
router.use('/transactions', require('./Transaction.routes'));

module.exports = router;
