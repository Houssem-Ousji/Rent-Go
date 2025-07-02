const express = require('express');
const {
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    createBooking
} = require('../controllers/bookingController');

const { generatePdfReport } = require('../controllers/bookingReportController');
const protect = require('../middlewares/authMiddleware');
const allowRoles = require('../middlewares/roleMiddleware');

const router = express.Router();

// All routes require admin or superadmin
router.use(protect, allowRoles('admin', 'superadmin'));

router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.post('/', createBooking);         // optional
router.put('/:id', updateBooking);
router.get('/generate/report', generatePdfReport); // Only for admin routes
router.delete('/:id', deleteBooking);

module.exports = router;
