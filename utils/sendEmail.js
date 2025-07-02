const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendReportEmail = async (pdfBuffer, csvPath, toEmail) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: `"Booking System" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: '📋 Booking Report',
        text: 'Attached is your booking statistics report.',
        attachments: [
            { filename: 'booking-report.pdf', content: pdfBuffer },
            { filename: 'bookings.csv', path: csvPath }
        ]
    });
};

exports.sendCouponEmail = async (pdfBuffer, toEmail, discount) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: `"Admin Portal" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: `🎁 Your ${discount.percentage}% Discount Code`,
        text: `Here is your coupon code: ${discount.code}`,
        attachments: [
            {
                filename: `${discount.code}-coupon.pdf`,
                content: pdfBuffer,
            }
        ]
    });
};

