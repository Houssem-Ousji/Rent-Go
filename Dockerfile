FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY target/gateway-0.0.1-SNAPSHOT.jar /app/gateway.jar

EXPOSE 8087

ENTRYPOINT ["java", "-jar", "/app/gateway.jar"]
