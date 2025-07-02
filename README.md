# 🛡️ Admin Authorization Microservice – RENT&GO

This microservice manages admin authentication, user and car management, bookings reporting, and discount coupon generation for the **RENT&GO** car rental platform.

---

## 🚀 Features

- 🔐 Admin authentication with JWT
- 👥 User and 🚗 Car CRUD operations
- 📄 Booking report generation (PDF + CSV)
- 📧 Email notifications with attached reports or coupons
- 🎁 Discount coupon creation with PDF generation
- 🧠 Booking data analysis with charts
- ☁️ MongoDB Atlas integration with Mongoose
- 🐳 Docker support for easy deployment

---

## 🛠️ Tech Stack

- **Node.js + Express.js**
- **MongoDB Atlas** (Cloud) via Mongoose
- **JWT** for secure token-based auth
- **PDFKit** for PDF generation
- **Chart.js + Puppeteer** for visual reporting
- **Nodemailer** for sending email reports
- **dotenv**, **bcrypt**, **moment** for utilities

---

## 📁 Project Structure

```
admin-auth-service/
│
├── models/
├── controllers/
├── routes/
├── middlewares/
├── utils/
│   ├── generateCouponPdf.js
│   ├── generateBookingReportPdf.js
│   ├── exportCsv.js
│   ├── charts.js
│   └── sendEmail.js
├── exports/
├── .env
├── Dockerfile
├── .dockerignore
├── server.js
├── package.json
└── README.md
```

---

## 📦 Installation & Setup

```bash
git clone https://github.com/your-username/admin-auth-service.git
cd admin-auth-service
npm install
```

### Configure environment variables in `.env`:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/admin-auth
JWT_SECRET=your_jwt_secret
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password
```

> 🔐 Use a Gmail **App Password** (not your real Gmail password). See Gmail docs for app passwords.

---

## 🐳 Docker Setup

### 1. Create `Dockerfile`

```Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### 2. Create `.dockerignore`

```
node_modules
.env
```

### 3. Build Docker Image

```bash
docker build -t admin-auth-service .
```

### 4. Run the Container

```bash
docker run -d --name admin-auth -p 3000:3000 --env-file .env admin-auth-service
```

> 📝 Make sure MongoDB Atlas allows access from Docker’s IP.

---

## 🔐 Authentication

```http
POST /api/auth/login
{
  "username": "adminuser",
  "password": "admin1234"
}
```

Use the returned token as:

```
Authorization: Bearer <token>
```

---

## 🎁 Discount Coupon

```http
POST /api/discounts
Headers:
  Authorization: Bearer <admin_token>
Body:
{
  "code": "SUMMER25",
  "percentage": 25,
  "validUntil": "2025-08-30T23:59:59Z"
}
```

PDF + Email with:

- Code
- %
- Validity
- Admin info
- RENT&GO branding (site, phone, address)

---

## 📄 Booking Reports

```http
GET /api/bookings/report
Headers:
  Authorization: Bearer <admin_token>
```

Output:

- PDF with stats, charts
- CSV of raw data
- Both emailed

---

## 🧪 Testing

Test endpoints:

- `/api/auth/login`
- `/api/users`
- `/api/cars`
- `/api/discounts`
- `/api/bookings/report`

---

## 🧬 Sample Models

### Admin

```js
{ username, password (hashed), role: 'admin' | 'superadmin' }
```

### Booking

```js
{ clientName, startTime, endTime, carId, status }
```

### Discount

```js
{ code, validUntil, percentage, createdBy }
```

---

## ✅ TODO

- [x] Admin login with JWT
- [x] Admin manage users and cars
- [x] Booking report PDF + CSV
- [x] Email notifications
- [x] Discount coupon PDF
- [x] Docker support
- [ ] Swagger documentation
- [ ] Unit tests

---

## 📧 Gmail Setup

1. Enable 2FA on Gmail
2. Visit https://myaccount.google.com/apppasswords
3. Create an app password
4. Use it as `EMAIL_PASS` in `.env`

---

## 📜 License

MIT © 2025 RENT&GO – All rights reserved.
