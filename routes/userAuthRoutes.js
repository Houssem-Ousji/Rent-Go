const express = require('express');
const { login } = require('../controllers/userAuthController');

const router = express.Router();

router.post('/login', login);

module.exports = router;
