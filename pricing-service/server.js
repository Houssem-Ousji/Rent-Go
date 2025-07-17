require('dotenv').config();

const app = require('./src/app'); // App imported from src/app.js

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Pricing Service is running on port ${PORT}`);
});

