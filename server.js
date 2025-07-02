require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const app = express();
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const userAuthRoutes = require('./routes/userAuthRoutes');
const discountRoutes = require('./routes/discountRoutes');

connectDB();



app.use(helmet());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/', userAuthRoutes);
app.use('/api/discounts', discountRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Admin Auth Service running on port ${PORT}`));
