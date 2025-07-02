const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ username, password: hashedPassword, role });
    res.status(201).json({ token: generateToken(admin) });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ token: generateToken(admin) });
};
