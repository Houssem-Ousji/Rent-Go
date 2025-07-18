const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken'); // same function used for admin
const fetch = require('node-fetch');
async function getKeycloakToken(username, password) {
  const response = await fetch('http://keycloack:9098/realms/master/protocol/openid-connect/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: 'master-realm',
      grant_type: 'password',
      username: username,
      password: password,
    }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(`Failed to get token: ${err.error_description}`);
  }

  const data = await response.json();
  return data.access_token;
}


exports.login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    console.log(getKeycloakToken(user.username,password))
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
