const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    carId: { type: Number, required: true },
    status: {
        type: String,
        enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
        default: 'PENDING'
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
