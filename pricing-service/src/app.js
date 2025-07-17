require('dotenv').config();
const express = require('express');
const app = express();
const pricingRoutes = require('./routes/pricing');

app.use(express.json());
app.use('/pricing', pricingRoutes);

module.exports = app;

