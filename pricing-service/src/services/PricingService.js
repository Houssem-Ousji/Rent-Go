const db = require('../db');

exports.calculatePrice = async ({ category, duration, location, extras, promoCode }) => {
    let baseRate;

    // Example: category-based pricing
    switch (category) {
        case 'economy': baseRate = 30; break;
        case 'standard': baseRate = 50; break;
        case 'luxury': baseRate = 100; break;
        case 'van': baseRate = 80; break;    // Verify this value
        case 'truck': baseRate = 120; break;
        case 'suv': baseRate = 70; break;
        default: baseRate = 40;
    }

    let total = baseRate * duration;

    // Extras
    if (extras?.includes('baby_seat')) total += 5 * duration;
    if (extras?.includes('gps')) total += 3 * duration;
    if (extras?.includes('full_insurance')) total += 15 * duration;


    // Fetch promo discount from DB
    if (promoCode) {
        const [rows] = await db.query('SELECT discount FROM promotions WHERE code = ?', [promoCode]);
        if (rows.length > 0) {
            total = total * (1 - rows[0].discount);
        }
    }


    return { total };
};
