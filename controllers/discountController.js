const Discount = require('../models/Discount');
const { generateCouponPdf } = require('../utils/generateCouponPdf');
const { sendCouponEmail } = require('../utils/sendEmail');

exports.getAllDiscounts = async (req, res) => {
    const discounts = await Discount.find().populate('createdBy', 'username');
    res.json(discounts);
};

exports.getValidDiscount = async (req, res) => {
    const { code } = req.params;
    const now = new Date();

    const discount = await Discount.findOne({ code: code.toUpperCase(), isActive: true, expiresAt: { $gt: now } });
    if (!discount) return res.status(404).json({ message: 'Invalid or expired discount code' });

    res.json(discount);
};

exports.deleteDiscount = async (req, res) => {
    const { id } = req.params;
    const discount = await Discount.findByIdAndDelete(id);
    if (!discount) return res.status(404).json({ message: 'Discount not found' });
    res.json({ message: 'Discount deleted' });
};


exports.createDiscount = async (req, res) => {
    try {
        const { code, expiresAt, percentage } = req.body;
        const createdBy = req.admin.id;
        const discount = await Discount.create({
            code,
            expiresAt,
            percentage,
            createdBy
        });
        const admin = req.admin;
        const pdfBuffer = await generateCouponPdf(discount, admin);
        await sendCouponEmail(pdfBuffer, "wassimmalouch2001@gmail.com", discount); // Or any target email
        res.status(201).json({ message: 'Discount created and coupon emailed', discount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating discount', error: err.message });
    }
};

