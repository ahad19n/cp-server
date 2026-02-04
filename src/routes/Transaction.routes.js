const express = require('express');
const router = express.Router();
const { getTransactions } = require('../controllers/Transaction.controller');

router.get('/', getTransactions);

module.exports = router;    