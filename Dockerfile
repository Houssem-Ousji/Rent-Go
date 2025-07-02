FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY . .

EXPOSE 8087

ENTRYPOINT ["java", "-jar", "/app/gateway.jar"]
