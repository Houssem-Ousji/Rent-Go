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
- 📦 Modular and scalable Node.js architecture

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
├── models/              # Mongoose models (Admin, User, Car, Booking, Discount)
├── controllers/         # Core logic for each entity
├── routes/              # Express route files
├── middlewares/         # JWT auth middleware
├── utils/               # Helper files (PDF, email, CSV, charts)
│   ├── generateCouponPdf.js
│   ├── generateBookingReportPdf.js
│   ├── exportCsv.js
│   ├── charts.js
│   └── sendEmail.js
├── exports/             # Exported CSV files
├── .env                 # Environment variables
├── server.js            # App entry point
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

## 🔐 Authentication

Admins login via:

```http
POST /api/auth/login
{
  "username": "adminuser",
  "password": "admin1234"
}
```

Token is returned and must be sent in headers:

```
Authorization: Bearer <token>
```

---

## 👤 Admin Features

Admins can:

- ✅ Login and manage own session
- 👥 Create / Update / Delete Users
- 🚗 Create / Update / Delete Cars
- 🎁 Create discount coupons
- 📄 Generate booking reports
- 📧 Send email reports to self or clients

---

## 🎁 Discount Coupon

**Create discount coupon** with PDF + email:

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

A PDF coupon is generated and emailed. It contains:

- Coupon code
- Discount %
- Valid until date
- Admin who created it
- RENT&GO header:
  - Site: www.rentandgo.com
  - Phone: 71 717 171
  - Address: Road 5, Tunis, Tunisia

---

## 📄 Booking Reports

Admins can generate advanced reports with analytics and charts:

```http
GET /api/bookings/report
Headers:
  Authorization: Bearer <admin_token>
```

Generates:

- PDF report:
  - Total bookings
  - Confirmed / Cancelled / Pending
  - Bookings by car, month, weekday
  - Top booked cars
  - Average duration
  - Pie + bar charts
- CSV export of all bookings
- Both files emailed to admin

---

## 🧪 Testing

Use Postman or Swagger to test endpoints:

- `/api/auth/login`
- `/api/users`
- `/api/cars`
- `/api/discounts`
- `/api/bookings/report`

---

## 🧬 Sample Models

### Admin

```js
{
  username: String,
  password: String (hashed),
  role: 'admin' | 'superadmin'
}
```

### Booking

```js
{
  clientName: String,
  startTime: Date,
  endTime: Date,
  carId: ObjectId,
  status: 'CONFIRMED' | 'CANCELLED' | 'PENDING'
}
```

### Discount

```js
{
  code: String,
  validUntil: Date,
  percentage: Number,
  createdBy: ObjectId (Admin)
}
```

---

## ✅ TODO

- [x] Admin login with JWT
- [x] Admin manage users and cars
- [x] Booking report PDF + CSV
- [x] Email notifications
- [x] Discount coupon PDF
- [ ] Swagger documentation
- [ ] Unit tests
- [ ] Role-based permissions

---

## 📧 Gmail Setup

1. Enable 2FA on your Gmail
2. Go to: https://myaccount.google.com/apppasswords
3. Create a new app password for "Mail"
4. Use that 16-digit password in `.env` as `EMAIL_PASS`

---

## 📜 License

MIT © 2025 RENT&GO – All rights reserved.
