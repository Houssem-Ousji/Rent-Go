FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY target/gateway.jar /app/gateway.jar

EXPOSE 8087

ENTRYPOINT ["java", "-jar", "/app/gateway.jar"]
