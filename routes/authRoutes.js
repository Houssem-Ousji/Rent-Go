const express = require('express');
const { register, login } = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');
const allowRoles = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/register', protect, allowRoles('superadmin'), register);
router.post('/login', login);

module.exports = router;
