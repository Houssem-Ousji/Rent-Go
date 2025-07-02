const express = require('express');
const {
    createDiscount,
    getAllDiscounts,
    getValidDiscount,
    deleteDiscount
} = require('../controllers/discountController');

const protect = require('../middlewares/authMiddleware');
const allowRoles = require('../middlewares/roleMiddleware');

const router = express.Router();

// Admin-only routes
router.use(protect, allowRoles('admin', 'superadmin'));

router.post('/', createDiscount);              // Create new
router.get('/', getAllDiscounts);              // View all
router.get('/validate/:code', getValidDiscount); // Called by payment service
router.delete('/:id', deleteDiscount);         // Remove discount

module.exports = router;
