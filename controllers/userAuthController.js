const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken'); // same function used for admin

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({
        token: generateToken(user),
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
};
