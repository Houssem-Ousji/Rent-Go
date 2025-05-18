# 🚗 Rent&Go Pricing Microservice

This project is a **Node.js-based microservice** for the Rent&Go car rental application. It handles **dynamic price calculations** based on vehicle categories, rental duration, extras, and promotional discounts. The service uses **MySQL** (via Docker) to store and validate promo codes. This guide includes setup instructions, API usage, and testing with **Postman**.

## Project Structure
```plaintext
pricing-service/
├── src/
│   ├── controllers/pricingController.js
│   ├── db/index.js
│   ├── routes/pricing.js
│   ├── services/PricingService.js
│   ├── app.js
│   └── www
├── .env.example
├── dbTest.js
├── package.json
└── package-lock.json
```

## 🛠️ 1. Setup Instructions

### 📁 Clone the Project

```bash
git clone https://github.com/Houssem-Ousji/Rent-Go.git
cd Rent-Go
```
### 📦 Install Dependencies
```bash
npm install
```

### 🐳 Run MySQL with Docker
```bash
docker run -d --name rentgo-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=yourpassword -e MYSQL_DATABASE=rentgo_pricing mysql:latest
```


## Usage
Start server: node src/app.js
API will be available at http://localhost:3000

## API Endpoint
POST /pricing/calculate
### Example Request
```json
{
  "category": "suv",
  "duration": 5,
  "extras": ["gps", "full_insurance", "baby_seat"],
  "promoCode": "SUMMER2025"
}
```

```json
{
  "category": "economy",
  "duration": 5,
  "extras": ["gps", "full_insurance"],
  "promoCode": "SUMMER2025"
}
```


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