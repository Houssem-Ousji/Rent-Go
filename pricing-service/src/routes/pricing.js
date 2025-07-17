
const express = require('express');
const router = express.Router();
const pricingController = require('../Controllers/pricingController');

router.post('/calculate', pricingController.calculatePrice);

module.exports = router;
