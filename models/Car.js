const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { type: String, required: true },       // e.g., "Toyota"
    model: { type: String, required: true },      // e.g., "Corolla"
    year: { type: Number, required: true },       // e.g., 2020
    color: { type: String, default: 'Unknown' },  // optional
    registrationNumber: { type: String, unique: true, required: true },
    available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
