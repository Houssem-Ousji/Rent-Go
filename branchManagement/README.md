# 🚗 Rent&Go Branch Management Microservice

This project is a **Python-based microservice** for the Rent&Go car rental system. It handles **branch data**, **car inventory**, and provides endpoints to manage branch information and locate vehicles. It uses **FastAPI**, **MongoDB**, and is containerized with **Docker** for seamless deployment.

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
  -e MONGO_INITDB_DATABASE=location_service \
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
uvicorn app.main:app --reload
```
---

## 🧪 5. Test API Using Postman

### 🔔 POST `/branches/` — Creates a new branch

- **URL**: `http://localhost:8000/branches/`
- **Method**: `POST`
- **Body (JSON)**:

```json
{
    "branch_id" : "123",
  "name": "Tunis Center",
  "address": "Rue de Marseille",
  "city": "Sousse",
  "lat": 36.8,
  "lon": 10.2,
  "opening_hours": "08:00-18:00",
  "active": true
}
```

---

### 📜 GET `/branches/` — Get All branches

- **URL**: `http://localhost:8000/branches/`
- **Method**: `GET`

> This will return all the branchs stored in the MongoDB `location_service` database.

---

---

## 📂 6. Project Structure (Example)

```
Rent-Go/
│
├── app/
│   ├── main.py                  # FastAPI entrypoint
│   ├── api/                     # Route handlers
│   ├── models/                  # Pydantic models
│   └── database/                # MongoDB connection
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── README.md"
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
