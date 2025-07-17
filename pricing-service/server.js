// server.js
require('dotenv').config(); // Load environment variables

const app = require('./app');

// Use environment port or fallback
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Pricing Service is running on${PORT}`);
});
