💸 API de Paiement - FastAPI & MongoDB

Cette application backend est développée avec **FastAPI** et utilise **MongoDB** comme base de données. Elle permet la gestion des paiements, dépôts et remboursements pour les utilisateurs.

---
🚀 Fonctionnalités

- 🔐 Authentification à intégrer (Keycloak ou autre)
- 💳 Création et suppression de paiements
- 💰 Enregistrement des dépôts utilisateur
- 🔁 Gestion des remboursements
- 🧪 Endpoint de vérification du statut MongoDB

---

📦 Technologies utilisées

- [FastAPI](https://fastapi.tiangolo.com/)
- [Motor (MongoDB async driver)](https://motor.readthedocs.io/en/stable/)
- [Pydantic](https://docs.pydantic.dev/)
- [Uvicorn](https://www.uvicorn.org/) (serveur ASGI)

---

FastAPI – Framework web moderne et ultra-rapide pour construire des APIs avec Python 3.7+ basé sur les annotations de type. Il est asynchrone, performant, et simple à utiliser.

Motor (MongoDB async driver) – Driver asynchrone pour MongoDB conçu pour fonctionner avec asyncio, idéal pour les applications FastAPI.

Pydantic – Librairie pour la validation de données et la gestion des modèles via les annotations de type Python. Elle garantit des données fiables et bien structurées.

Uvicorn – Serveur ASGI rapide et léger, utilisé pour exécuter les applications FastAPI avec des performances optimales.

📁 Structure du projet

.
├── main.py # Code principal de l'application
├── config.py # Configuration MongoDB
├── requirements.txt # Dépendances Python
└── README.md # Ce fichier

## ▶️ Lancer l'application
uvicorn main:app --reload
