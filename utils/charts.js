const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const width = 600;
const height = 400;

const canvas = new ChartJSNodeCanvas({ width, height });

exports.generateBookingsPerMonthChart = async (bookingsByMonth) => {
    const labels = Object.keys(bookingsByMonth);
    const data = Object.values(bookingsByMonth);

    const config = {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Bookings per Month',
                data,
                backgroundColor: '#4a90e2'
            }]
        }
    };

    return await canvas.renderToBuffer(config);
};

exports.generateStatusPieChart = async ({ confirmed, cancelled, pending }) => {
    const config = {
        type: 'pie',
        data: {
            labels: ['Confirmed', 'Cancelled', 'Pending'],
            datasets: [{
                data: [confirmed, cancelled, pending],
                backgroundColor: ['#28a745', '#dc3545', '#ffc107']
            }]
        }
    };

    return await canvas.renderToBuffer(config);
};
