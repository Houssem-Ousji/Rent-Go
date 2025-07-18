const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const KcAdminClient = require('@keycloak/keycloak-admin-client').default;
exports.register = async (req, res) => {
    const kcAdmin=new KcAdminClient({
    baseUrl: 'http://keycloack:9098',
    realmName: 'master',             
    });
    await kcAdmin.auth({
        username:"admin",
        password:"admin",
        grantType:"password",
        clientId:"admin-cli"
    })
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ username, password: hashedPassword, role });
   await kcAdmin.users.create({
  realm: "master",
  username: username,
  email:username+"@esprit.tn",
  firstName: "User",       // You can get this from req.body if available
  lastName: "Example",     // You can also get this dynamically
  enabled: true,
  credentials: [
    {
      type: 'password',
      value: password,
      temporary: false
    }
  ]
});
    res.status(201).json({ token: generateToken(admin) });
};
const fetch = require('node-fetch').default;
async function getKeycloakToken(username, password) {
  const response = await fetch('http://keycloack:9098/realms/master/protocol/openid-connect/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: 'admin-cli',
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
  console.log(data.access_token)
  return data.access_token;
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
   // if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const tok=await getKeycloakToken(username+"@esprit.tn",password);
    res.json({ token: tok });
};
