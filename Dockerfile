# Étape 1 : base image
FROM python:3.11-slim

# Étape 2 : définir le dossier de travail
WORKDIR /app

# Étape 3 : copier les fichiers
COPY . .

# Étape 4 : installer les dépendances
RUN pip install --upgrade pip \
 && pip install -r requirements.txt

# Étape 5 : exposer le port utilisé par Flask
EXPOSE 5050

# Étape 6 : lancer l'application
CMD ["python", "-m", "app.main"]
