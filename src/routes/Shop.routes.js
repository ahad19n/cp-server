const express = require('express');
const router = express.Router();

const { getAllShops } = require('../controllers/Shop.model');

// -------------------------------------------------------------------------- //

router.get('/', getAllShops);

// -------------------------------------------------------------------------- //

module.exports = router;
