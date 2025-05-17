
# 🚗 Booking Service - Gestion des Réservations

Ce projet est un **service Spring Boot** pour gérer les réservations de voitures. Il permet de créer, confirmer, compléter, annuler des réservations, gérer les voitures associées, et éviter les chevauchements pour la même voiture.

Le service utilise **MySQL** (via Docker) comme base de données.

---

## 🛠️ 1. Instructions de Setup

### 📁 Cloner le projet

```bash
git clone https://github.com/Houssem-Ousji/Rent-Go.git
cd Rent-Go
```

---

### 🐳 Lancer MySQL avec Docker

Pour démarrer une base MySQL avec Docker (base `booking_db` sur le port 3306), utilise la commande suivante :

```bash
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=MySql -d -p 3306:3306 mysql:latest
```

- Le service Spring Boot se connectera à cette base via le port `3306`.

---

### ⚙️ Configurer la connexion MySQL dans `application.properties`


```properties
spring.application.name=BookingService
spring.datasource.url=jdbc:mysql://localhost:3306/BookingService?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=MySql
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.datasource.hikari.initializationFailTimeout=0
server.port=8090
```
- Au lancement du Spring la base de données sera créer automatiquement si elle n'existe pas
---

### 🚀 Lancer le service

Le service Spring Boot tourne sur le port **8090** (configuré ci-dessus).

Lancer avec :

```bash
./mvnw spring-boot:run
```

ou

```bash
mvn spring-boot:run
```

---

## 🧪 2. Test de l'API avec Postman

Tu peux importer cette collection dans Postman pour tester facilement les endpoints de réservation.

### 📌 Endpoints Principaux

| Méthode | URL                                                   | Description                                                             |
|---------|--------------------------------------------------------|-------------------------------------------------------------------------|
| POST    | `http://localhost:8090/bookings`                      | ➕ Créer une réservation                                                |
| GET     | `http://localhost:8090/bookings`                      | 📄 Récupérer toutes les réservations                                   |
| GET     | `http://localhost:8090/bookings/{id}`                 | 🔍 Récupérer une réservation par ID                                    |
| GET     | `http://localhost:8090/bookings/car/{carId}`          | 🚗 Récupérer toutes les réservations liées à une voiture donnée        |
| PUT     | `http://localhost:8090/bookings/{bookingId}/car`      | 🔁 Mettre à jour le car_id d'une réservation                           |
| PUT     | `http://localhost:8090/bookings/{id}/confirm`         | ✅ Confirmer une réservation                                            |
| PUT     | `http://localhost:8090/bookings/{id}/complete`        | 🏁 Marquer une réservation comme complétée                             |
| DELETE  | `http://localhost:8090/bookings/{id}`                 | ❌ Annuler une réservation                                              |


---

### Exemple de requête POST pour créer une réservation

- **URL** : `http://localhost:8090/bookings`
- **Méthode** : `POST`
- **Body JSON** :

```json
{
  "carId": 1,
  "startTime": "2025-05-20T09:00:00",
  "endTime": "2025-05-20T11:00:00"
}
```

---

### Exemple de requête PUT pour modifier la voiture d’une réservation

- **URL** : `http://localhost:8090/bookings/1/car`
- **Méthode** : `PUT`
- **Body JSON** :

```json
{
  "newCarId": 2
}
```

---

## 🧼 3. Structure du projet (exemple)

```
Booking-Service/
│
├── src/main/java/tn/esprit/spring/booking/   # Code source Java
│   ├── BookingServiceImpl.java
│   ├── BookingRepository.java
│   ├── BookingController.java
│   └── ...
├── src/main/resources/
│   └── application.properties                  # Configuration Spring Boot
├── pom.xml                                    # Dépendances Maven
└── README.md                                  # Ce fichier
```

---

## ❓ 4. Dépannage

- **MySQL ne démarre pas ou ne se connecte pas ?**
    - Vérifie si le container Docker est bien en marche avec : `docker ps`
    - Vérifie la configuration de la connexion (host, port, user, password)
    - Si besoin, connecte-toi au container : `docker exec -it booking-mysql mysql -uroot -p`

- **Port 8090 déjà utilisé ?**
    - Change le port dans `application.properties`

- **Chevauchement détecté lors de la création ou modification**
    - Vérifie les plages horaires et la voiture associée, une même voiture ne peut pas être réservée sur des plages horaires qui se chevauchent.

---

## 🙌 Contributions

N’hésite pas à forker le projet, proposer des améliorations via des pull requests ou signaler des bugs via des issues.

---

Merci d’utiliser ce service de gestion de réservations !
