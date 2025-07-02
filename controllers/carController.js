const Car = require('../models/Car');

exports.getAllCars = async (req, res) => {
    const cars = await Car.find();
    res.json(cars);
};

exports.getCarById = async (req, res) => {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
};

exports.createCar = async (req, res) => {
    try {
        const car = await Car.create(req.body);
        res.status(201).json(car);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCar = async (req, res) => {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCar) return res.status(404).json({ message: 'Car not found' });
    res.json(updatedCar);
};

exports.deleteCar = async (req, res) => {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car deleted' });
};
