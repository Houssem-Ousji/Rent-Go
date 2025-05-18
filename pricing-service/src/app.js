require('dotenv').config();
const express = require('express');
const app = express();
const pricingRoutes = require('./routes/pricing');

app.use(express.json());
app.use('/pricing', pricingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Pricing Service running on port ${PORT}`);
});
