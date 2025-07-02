const Booking = require('../models/Booking');

exports.getAllBookings = async (req, res) => {
    const bookings = await Booking.find();
    res.json(bookings);
};

exports.getBookingById = async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
};

exports.updateBooking = async (req, res) => {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Booking not found' });
    res.json(updated);
};

exports.deleteBooking = async (req, res) => {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted' });
};

exports.createBooking = async (req, res) => {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
};
