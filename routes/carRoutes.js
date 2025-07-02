const express = require('express');
const {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
} = require('../controllers/carController');

const protect = require('../middlewares/authMiddleware');
const allowRoles = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(protect);
router.use(allowRoles('admin', 'superadmin')); // only admins

router.get('/', getAllCars);
router.get('/:id', getCarById);
router.post('/', createCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

module.exports = router;
