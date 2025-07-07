# 🚗 Vehicle Service - Microservice Flask

Ce microservice `vehicle-service` fait partie d'une architecture **microservices** pour un système de location de voitures.

Il permet de gérer les véhicules disponibles : ajout, mise à jour, suppression et consultation.

---

## 📦 Fonctionnalités

- `GET /vehicles` — Liste des véhicules
- `GET /vehicles/<id>` — Détails d’un véhicule
- `POST /vehicles` — Ajouter un véhicule
- `PUT /vehicles/<id>` — Mettre à jour un véhicule
- `DELETE /vehicles/<id>` — Supprimer un véhicule
- `GET /ping` — Vérification que le service est vivant

---

## 🧑‍💻 Tech Stack

- Python 3.11
- Flask
- SQLAlchemy
- SQLite (dev) / extensible vers PostgreSQL
- Docker

---

## 🚀 Lancer le projet en local
python -m app.main

### 📁 Cloner le projet

```bash
git clone https://github.com/<ton-username>/vehicle-service.git
cd vehicle-service

📦 Créer un environnement virtuel (optionnel)
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate sous Windows

⚙️ Installer les dépendances
pip install -r requirements.txt

▶️ Lancer l'application
python -m app.main
