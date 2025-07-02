const { Parser } = require('json2csv');

exports.generateBookingCsv = (bookings) => {
    const fields = [
        {
            label: 'Booking ID',
            value: '_id'
        },
        {
            label: 'Client Name',
            value: 'clientName'
        },
        {
            label: 'Car ID',
            value: 'carId'
        },
        {
            label: 'Status',
            value: 'status'
        },
        {
            label: 'Start Time',
            value: row => new Date(row.startTime).toLocaleString()
        },
        {
            label: 'End Time',
            value: row => new Date(row.endTime).toLocaleString()
        },
        {
            label: 'Duration (hrs)',
            value: row => {
                const start = new Date(row.startTime);
                const end = new Date(row.endTime);
                const diff = (end - start) / (1000 * 60 * 60);
                return diff.toFixed(2);
            }
        }
    ];

    const opts = { fields, withBOM: true };

    try {
        const parser = new Parser(opts);
        const csv = parser.parse(bookings);
        return csv;
    } catch (err) {
        console.error('❌ Error generating CSV:', err);
        throw err;
    }
};
