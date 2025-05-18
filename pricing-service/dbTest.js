require('dotenv').config();
const db = require('./src/db');

(async () => {
    try {
        console.log('Checking DB connection...');
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        console.log('✔ DB connected. Test query result:', rows[0].result);

        console.log('Creating `promotions` table...');
        await db.query(`
      CREATE TABLE IF NOT EXISTS promotions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) NOT NULL UNIQUE,
        discount FLOAT NOT NULL
      )
    `);

        console.log('Inserting sample promo code...');
        await db.query(`
      INSERT IGNORE INTO promotions (code, discount)
      VALUES ('SUMMER2025', 0.2)
    `);

        console.log('✔ DB setup completed successfully.');
        process.exit(0);
    } catch (err) {
        console.error('❌ DB setup failed:', err.message);
        process.exit(1);
    }
})();
