const PDFDocument = require('pdfkit');

exports.generateCouponPdf = (discount, admin) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer);
        });
        doc
            .font('Helvetica-Bold')
            .fontSize(18)
            .fillColor('#004d99')
            .text('RENT&GO', { align: 'left' });

        doc
            .font('Helvetica')
            .fontSize(10)
            .fillColor('#555')
            .text('www.rentandgo.com | Phone: 71 717 171', { align: 'left' });

        doc
            .text('Road 5, Tunis, Tunisia', { align: 'left' });

        // Line under header
        doc.moveTo(50, doc.y + 10).lineTo(545, doc.y + 10).strokeColor('#cccccc').stroke();
        doc.moveDown(2);

        doc.font('Helvetica-Bold').fontSize(24).fillColor('#d9534f').text('Discount Coupon', { align: 'center' });
        doc.moveDown(2);

        doc.fontSize(16).fillColor('#000').text(`Coupon Code: `, { continued: true }).fillColor('#0275d8').text(discount.code);
        doc.moveDown();
        doc.fillColor('#000').text(`Discount: `, { continued: true }).fillColor('#5cb85c').text(`${discount.percentage}%`);
        doc.moveDown();
        doc.fillColor('#000').text(`Valid Until: `, { continued: true }).fillColor('#f0ad4e').text(new Date(discount.expiresAt).toLocaleString());
        doc.moveDown();

        doc.fontSize(10).fillColor('#aaa').text(`Generated at ${new Date().toLocaleString()}`, { align: 'center' });

        doc.end();
    });
};
