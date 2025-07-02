// routes/userRoutes.js
const express = require('express');
const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const protect = require('../middlewares/authMiddleware'); // verify JWT
const allowRoles = require('../middlewares/roleMiddleware'); // check role

const router = express.Router();

router.use(protect);
router.use(allowRoles('admin', 'superadmin')); // only admins can manage users

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
