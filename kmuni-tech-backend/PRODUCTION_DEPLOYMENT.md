# Production Deployment Guide

## 🚀 Quick Production Setup

### 1. Environment Variables

Create `.env` file in backend root:

```properties
# Database (Production)
DATABASE_URL=jdbc:postgresql://your-prod-host:5432/kmunitech
DATABASE_USERNAME=your_prod_user
DATABASE_PASSWORD=your_strong_password_here

# JWT Configuration (CRITICAL - Generate new secret!)
# Generate with: openssl rand -base64 64
JWT_SECRET=your-super-secure-random-secret-key-here-minimum-64-characters
JWT_EXPIRATION=86400000

# CORS (Update to your domain)
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Server
PORT=8080
```

### 2. Application Configuration for Production

Update `application.yml` for production:

```yaml
spring:
  jpa:
    hibernate:
      ddl-auto: validate  # Change from 'update' to 'validate'
    show-sql: false       # Disable SQL logging
  
logging:
  level:
    root: WARN
    com.kmunitech.backend: INFO
    org.springframework.security: WARN
    org.hibernate.SQL: WARN
```

### 3. Build Production JAR

```bash
cd "E:\SIGMA WD\KM ED TECH\Project-1\kmuni-tech-backend"

# Clean and build
mvn clean package -DskipTests

# JAR will be created at:
# target/kmuni-tech-backend-1.0.0.jar
```

### 4. Run Production JAR

```bash
# With environment variables
java -jar target/kmuni-tech-backend-1.0.0.jar

# Or with custom port
java -jar -Dserver.port=8080 target/kmuni-tech-backend-1.0.0.jar
```

---

## 🔒 Security Hardening

### Generate Strong JWT Secret

```bash
# Windows PowerShell
$bytes = New-Object byte[] 64
[Security.Cryptography.RNGCryptoServiceProvider]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)

# Or use online generator (ensure HTTPS):
# https://www.grc.com/passwords.htm
```

### Enable HTTPS

#### Option 1: Using Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### Option 2: Spring Boot SSL

Add to `application.yml`:

```yaml
server:
  port: 8443
  ssl:
    key-store: classpath:keystore.p12
    key-store-password: your-password
    key-store-type: PKCS12
    key-alias: tomcat
```

---

## 🗄️ Database Setup

### PostgreSQL Production Setup

```sql
-- Create database
CREATE DATABASE kmunitech;

-- Create user
CREATE USER kmuni_prod WITH ENCRYPTED PASSWORD 'strong_password_here';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE kmunitech TO kmuni_prod;

-- Connect to database
\c kmunitech

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO kmuni_prod;
```

### Database Backup

```bash
# Backup
pg_dump -U kmuni_prod -d kmunitech > backup_$(date +%Y%m%d).sql

# Restore
psql -U kmuni_prod -d kmunitech < backup_20260217.sql
```

---

## 🐳 Docker Deployment (Optional)

### Create Dockerfile

```dockerfile
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY target/kmuni-tech-backend-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Create docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: kmunitech
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: jdbc:postgresql://postgres:5432/kmunitech
      DATABASE_USERNAME: postgres
      DATABASE_PASSWORD: postgres
      JWT_SECRET: your-secret-here
    depends_on:
      - postgres

volumes:
  postgres_data:
```

### Run with Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop
docker-compose down
```

---

## ☁️ Cloud Deployment

### AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p java-17 kmuni-tech-backend

# Create environment
eb create kmuni-tech-prod

# Deploy
eb deploy

# Set environment variables
eb setenv DATABASE_URL=jdbc:postgresql://... JWT_SECRET=...
```

### Heroku

```bash
# Login
heroku login

# Create app
heroku create kmuni-tech-backend

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET=your-secret-here

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Azure App Service

```bash
# Login
az login

# Create resource group
az group create --name kmuni-tech-rg --location eastus

# Create app service plan
az appservice plan create --name kmuni-tech-plan --resource-group kmuni-tech-rg --sku B1 --is-linux

# Create web app
az webapp create --resource-group kmuni-tech-rg --plan kmuni-tech-plan --name kmuni-tech-backend --runtime "JAVA:17-java17"

# Deploy JAR
az webapp deploy --resource-group kmuni-tech-rg --name kmuni-tech-backend --src-path target/kmuni-tech-backend-1.0.0.jar --type jar

# Set environment variables
az webapp config appsettings set --resource-group kmuni-tech-rg --name kmuni-tech-backend --settings DATABASE_URL=... JWT_SECRET=...
```

---

## 📊 Monitoring & Logging

### Add Spring Boot Actuator

Add to `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

Update `application.yml`:

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
  endpoint:
    health:
      show-details: always
```

### Health Check Endpoint

```
GET http://yourdomain.com/actuator/health
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
    
    - name: Build with Maven
      run: mvn clean package -DskipTests
    
    - name: Deploy to server
      uses: appleboy/scp-action@master
      with:
        host: ${{ secrets.SERVER_HOST }}
        username: ${{ secrets.SERVER_USER }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        source: "target/kmuni-tech-backend-1.0.0.jar"
        target: "/app"
    
    - name: Restart application
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.SERVER_HOST }}
        username: ${{ secrets.SERVER_USER }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          sudo systemctl restart kmuni-tech-backend
```

---

## 🎯 Performance Tuning

### JVM Options

```bash
java -Xms512m -Xmx2048m \
     -XX:+UseG1GC \
     -XX:MaxGCPauseMillis=200 \
     -jar target/kmuni-tech-backend-1.0.0.jar
```

### Database Connection Pool

```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
```

---

## ✅ Pre-Launch Checklist

- [ ] Generate strong JWT secret
- [ ] Update database credentials
- [ ] Update CORS allowed origins
- [ ] Change `ddl-auto` to `validate`
- [ ] Disable SQL logging
- [ ] Build production JAR
- [ ] Test JAR locally
- [ ] Set up production database
- [ ] Run database migrations
- [ ] Enable HTTPS
- [ ] Configure reverse proxy
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Test all endpoints
- [ ] Load test (optional)
- [ ] Deploy to production
- [ ] Smoke test production
- [ ] Set up alerts

---

## 🆘 Troubleshooting

### Application won't start

```bash
# Check logs
tail -f logs/spring.log

# Check if port is in use
netstat -ano | findstr :8080

# Check Java version
java -version
```

### Database connection failed

```bash
# Test connection
psql -h your-host -U your-user -d kmunitech

# Check firewall
telnet your-host 5432
```

### High memory usage

```bash
# Check memory
jmap -heap <PID>

# Generate heap dump
jmap -dump:format=b,file=heap.bin <PID>
```

---

**Ready for production! 🚀**
