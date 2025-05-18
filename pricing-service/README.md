# Rent-Go Pricing Service


## Installation
1. git clone https://github.com/your-username/Rent-Go.git
2. cd Rent-Go/pricing-service
3. npm install
4. cp .env.example .env
5. Edit .env with your DB credentials

## Database Setup
1. Run in MySQL: CREATE DATABASE rentgo_pricing;
2. Initialize tables: node dbTest.js

## Usage
Start server: node src/app.js
API will be available at http://localhost:3000

## API Endpoint
POST /pricing/calculate
Example Request:
{"category":"standard","duration":3,"extras":["gps","baby_seat"],"promoCode":"SUMMER2025"}
Example Response:
{"total":139.20}

## Pricing Rules
Base Rates:
- Economy: $30/day
- Standard: $50/day
- Luxury: $100/day
- Van: $80/day
- Truck: $120/day
- SUV: $70/day

Extras:
- Baby seat: +$5/day
- GPS: +$3/day
- Full insurance: +$15/day

## Configuration
Edit .env:
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=rentgo_pricing
PORT=3000

## Dependencies
- Express
- MySQL2
- Dotenv

## License
MIT