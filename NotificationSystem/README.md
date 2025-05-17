# 🚗 Rent&Go Notification Microservice

This project is a **Python-based microservice** for the Rent&Go car rental application. It is responsible for sending **notifications** (via email and SMS) and storing notification logs. The service uses **MongoDB** (via Docker) to persist notification history in a database called `history`. This guide includes instructions for setting up the microservice, installing dependencies, running the backend, and testing the API using **Postman**.

## 🛠️ 1. Setup Instructions

### 📁 Clone the Project

```bash
git clone https://github.com/Houssem-Ousji/Rent-Go.git
cd Rent-Go
```

---

### 🐍 Create and Activate a Virtual Environment

#### Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

#### macOS/Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

---

### 📦 Install Python Dependencies

Install all required dependencies listed in `requirements.txt`:

```bash
pip install -r requirements.txt
```

To update `requirements.txt` after adding new packages:

```bash
pip freeze > requirements.txt
```

---

## 🐳 2. Run MongoDB with Docker

This command starts a MongoDB container and creates a database named `history`:

```bash
docker run -d \
  --name rentgo-mongo \
  -p 27017:27017 \
  -e MONGO_INITDB_DATABASE=history \
  mongo:latest
```

### ✅ Verify MongoDB is Running:

```bash
docker ps
```

### 🧪 Access Mongo Shell (Optional):

```bash
docker exec -it rentgo-mongo mongosh
```

---

## 🚀 3. Run the Python Backend

Depending on your framework:

```bash
uvicorn main:app --reload
```
---

## 🧪 5. Test API Using Postman

### 🔔 POST `/notify` — Send Email/SMS Notification

- **URL**: `http://127.0.0.1:8000/notify`
- **Method**: `POST`
- **Body (JSON)**:

```json
{
  "type": "booking_confirmation",
  "email": "ousjihoussem01@gmail.com",
  "booking_date": "2025-01-01",
  "userPhone": "+21625326488",  
  "name": "Houssem Ousji",
  "bookingId": "01"
}
```

---

### 📜 GET `/history` — Get Notification History

- **URL**: `http://127.0.0.1:8000/history`
- **Method**: `GET`

> This will return all notification records stored in the MongoDB `history` database.

---

---

## 📂 6. Project Structure (Example)

```
Rent-Go/
│
├── app.py                # Main application file
├── requirements.txt      # Python dependencies
├── README.md             # Full project guide
└── venv/                 # Virtual environment (excluded from Git)
```

---

## 🧼 7. Docker MongoDB Container Management

Stop MongoDB container:

```bash
docker stop rentgo-mongo
```

Restart MongoDB container:

```bash
docker start rentgo-mongo
```

Remove MongoDB container:

```bash
docker rm -f rentgo-mongo
```

---

## ❓ 8. Troubleshooting

- **MongoDB not connecting?**
  - Check if the container is running: `docker ps`
  - Make sure the URI is correct: `mongodb://localhost:27017/`
  
- **Missing packages?**
  - Run `pip install -r requirements.txt`

- **Permission issues on Linux/macOS?**
  - Try `sudo docker` or add your user to the Docker group.

---

## 🙌 Contributions

Feel free to fork, improve, and contribute via pull requests. If you encounter any issues, open an issue on GitHub.

---
