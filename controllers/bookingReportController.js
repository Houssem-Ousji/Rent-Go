const Booking = require('../models/Booking');
const PDFDocument = require('pdfkit');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

const { generateBookingsPerMonthChart, generateStatusPieChart } = require('../utils/charts');
const { generateBookingCsv } = require('../utils/exportCsv');
const { sendReportEmail } = require('../utils/sendEmail');

exports.generatePdfReport = async (req, res) => {
    try {
        const bookings = await Booking.find();

        const total = bookings.length;
        const confirmed = bookings.filter(b => b.status === 'CONFIRMED');
        const cancelled = bookings.filter(b => b.status === 'CANCELLED');
        const pending = bookings.filter(b => b.status === 'PENDING');

        const getPct = (count) => ((count / total) * 100).toFixed(1);
        const confirmedPct = getPct(confirmed.length);
        const cancelledPct = getPct(cancelled.length);
        const pendingPct = getPct(pending.length);

        const bookingsByCar = {};
        bookings.forEach(b => {
            bookingsByCar[b.carId] = (bookingsByCar[b.carId] || 0) + 1;
        });

        const topCars = Object.entries(bookingsByCar)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([carId, count], i) => `${i + 1}. Car ID ${carId}: ${count} bookings`);

        const bookingsByMonth = {};
        bookings.forEach(b => {
            const month = moment(b.startTime).format('YYYY-MM');
            bookingsByMonth[month] = (bookingsByMonth[month] || 0) + 1;
        });

        const avgDurationHrs = (
            bookings.reduce((sum, b) => {
                return sum + moment(b.endTime).diff(moment(b.startTime), 'hours', true);
            }, 0) / total
        ).toFixed(2);

        const weekdayMap = {};
        bookings.forEach(b => {
            const day = moment(b.startTime).format('dddd');
            weekdayMap[day] = (weekdayMap[day] || 0) + 1;
        });

        // Generate charts
        const chartBar = await generateBookingsPerMonthChart(bookingsByMonth);
        const chartPie = await generateStatusPieChart({
            confirmed: confirmed.length,
            cancelled: cancelled.length,
            pending: pending.length
        });

        // CSV export
        const csvData = generateBookingCsv(bookings);
        const csvDir = path.join(__dirname, '../exports');
        if (!fs.existsSync(csvDir)) fs.mkdirSync(csvDir);
        const csvPath = path.join(csvDir, 'bookings.csv');
        fs.writeFileSync(csvPath, csvData);

        // PDF generation
        const doc = new PDFDocument({ margin: 50, size: 'A4' });
        const chunks = [];
        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', async () => {
            const pdfBuffer = Buffer.concat(chunks);

            // Send email with PDF + CSV
            await sendReportEmail(pdfBuffer, csvPath, 'wassimmalouch2001@gmail.com');

            // Stream PDF to client
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="booking-report.pdf"');
            res.send(pdfBuffer);
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

        // --- TITLE ---
        doc.font('Helvetica-Bold').fontSize(24).fillColor('#004d99').text('Booking Statistics Report', { align: 'center' });
        doc.moveDown(2);

        // --- STYLIZED TABLE ---
        const tableTop = doc.y;
        const leftEdge = 50;
        const columnSpacing = 300;
        const rowHeight = 28;
        const tableWidth = 500;

        // Table header
        doc.rect(leftEdge, tableTop, tableWidth, rowHeight).fill('#007acc');
        doc.fillColor('white').font('Helvetica-Bold').fontSize(14);
        doc.text('Metric', leftEdge + 10, tableTop + 7);
        doc.text('Value', leftEdge + columnSpacing + 10, tableTop + 7);

        // Table rows
        const tableData = [
            ['Total bookings', total.toString()],
            ['Confirmed', `${confirmed.length} (${confirmedPct}%)`],
            ['Cancelled', `${cancelled.length} (${cancelledPct}%)`],
            ['Pending', `${pending.length} (${pendingPct}%)`],
            ['Average Duration', `${avgDurationHrs} hours`],
        ];

        doc.fontSize(12).font('Helvetica');
        tableData.forEach((row, i) => {
            const y = tableTop + rowHeight * (i + 1);
            // Alternate row color
            if (i % 2 === 0) {
                doc.rect(leftEdge, y, tableWidth, rowHeight).fill('#e6f2ff');
            } else {
                doc.rect(leftEdge, y, tableWidth, rowHeight).fill('white');
            }
            // Text color black on colored backgrounds
            doc.fillColor('#000');
            doc.text(row[0], leftEdge + 10, y + 7);
            doc.text(row[1], leftEdge + columnSpacing + 10, y + 7);
        });

        doc.moveDown(4);

        // --- SECTIONS ---
        const sectionTitleColor = '#004d99';

        doc.font('Helvetica-Bold').fontSize(16).fillColor(sectionTitleColor).text('Top 3 Most Booked Cars:');
        doc.font('Helvetica').fontSize(12).fillColor('#000');
        topCars.forEach(line => doc.text(`• ${line}`));
        doc.moveDown(2);

        doc.font('Helvetica-Bold').fontSize(16).fillColor(sectionTitleColor).text('Bookings Per Month:');
        doc.font('Helvetica').fontSize(12).fillColor('#000');
        Object.entries(bookingsByMonth).forEach(([month, count]) => {
            doc.text(`• ${month}: ${count}`);
        });
        doc.moveDown(2);

        doc.font('Helvetica-Bold').fontSize(16).fillColor(sectionTitleColor).text('Bookings by Weekday:');
        doc.font('Helvetica').fontSize(12).fillColor('#000');
        Object.entries(weekdayMap).forEach(([day, count]) => {
            doc.text(`• ${day}: ${count}`);
        });
        doc.moveDown(4);

        // --- CHARTS PAGE ---
        doc.addPage();

        doc.font('Helvetica-Bold').fontSize(20).fillColor('#004d99').text('Bookings Per Month Chart', { align: 'center' });
        doc.moveDown(2);
        doc.image(chartBar, {
            fit: [500, 300],
            align: 'center',
            valign: 'center',
        });

        doc.addPage();

        doc.font('Helvetica-Bold').fontSize(20).fillColor('#004d99').text('Booking Status Distribution', { align: 'center' });
        doc.moveDown(2);
        doc.image(chartPie, {
            fit: [300, 300],
            align: 'center',
            valign: 'center',
        });

        doc.moveDown(4);
        doc.font('Helvetica-Oblique').fontSize(10).fillColor('#666').text(
            'Report generated at: ' + new Date().toLocaleString(),
            { align: 'center' }
        );

        doc.end();

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to generate booking report', error: err.message });
    }
};
