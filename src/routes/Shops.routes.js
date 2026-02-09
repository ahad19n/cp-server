const express = require('express');
const router = express.Router();

const { getAllShops } = require('../controllers/Shops.controller');

router.get('/', getAllShops);

module.exports = router;
