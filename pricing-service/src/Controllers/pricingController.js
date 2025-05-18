const { calculatePrice: calculate } = require('../services/PricingService');

exports.calculatePrice = async (req, res) => {
    try {
        const result = await calculate(req.body);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to calculate price' });
    }
};
