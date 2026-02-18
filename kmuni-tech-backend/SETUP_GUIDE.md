# PostgreSQL Setup and Testing Guide

## 📦 Installing PostgreSQL

### Option 1: Official PostgreSQL Installer (Recommended)

1. **Download PostgreSQL**
   - Visit: https://www.postgresql.org/download/windows/
   - Download the latest version (PostgreSQL 16 recommended)
   - Run the installer

2. **Installation Steps**
   - Choose installation directory (default: `C:\Program Files\PostgreSQL\16`)
   - Select components: PostgreSQL Server, pgAdmin 4, Command Line Tools
   - Set password for `postgres` superuser (remember this!)
   - Port: 5432 (default)
   - Locale: Default

3. **Verify Installation**
   ```bash
   psql --version
   ```

### Option 2: Using Chocolatey

```bash
choco install postgresql
```

### Option 3: Using Docker (Quick Testing)

```bash
docker run --name kmuni-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16
```

---

## 🗄️ Creating the Database

### Method 1: Using pgAdmin 4

1. Open pgAdmin 4 (installed with PostgreSQL)
2. Connect to PostgreSQL Server (password: your postgres password)
3. Right-click "Databases" → "Create" → "Database"
4. Database name: `kmunitech`
5. Owner: `postgres`
6. Click "Save"

### Method 2: Using Command Line

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE kmunitech;

# Verify
\l

# Exit
\q
```

### Method 3: Using SQL Shell

1. Open "SQL Shell (psql)" from Start Menu
2. Press Enter for defaults (Server, Database, Port, Username)
3. Enter postgres password
4. Run: `CREATE DATABASE kmunitech;`

---

## ⚙️ Configure Backend

### Update application.yml

The backend is already configured for PostgreSQL. Just verify the settings:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/kmunitech
    username: postgres
    password: postgres  # Change to your password
```

### Or Use Environment Variables

Create `.env` file in backend root:

```properties
DATABASE_URL=jdbc:postgresql://localhost:5432/kmunitech
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password_here
```

---

## 🚀 Running the Backend

### 1. Install Maven (if not already installed)

**Using Chocolatey:**
```bash
choco install maven
```

**Using Scoop:**
```bash
scoop install maven
```

**Manual Download:**
- Download from: https://maven.apache.org/download.cgi
- Extract to `C:\Program Files\Apache\maven`
- Add to PATH: `C:\Program Files\Apache\maven\bin`

### 2. Build and Run

```bash
cd "E:\SIGMA WD\KM ED TECH\Project-1\kmuni-tech-backend"

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

Expected output:
```
Started KmuniTechBackendApplication in X.XXX seconds
```

---

## 🧪 Testing with Postman

### Step 1: Install Postman

Download from: https://www.postman.com/downloads/

### Step 2: Test Endpoints

#### 1. **Health Check** (Verify server is running)

```
GET http://localhost:8080/api/courses
```

Expected: List of courses (200 OK)

---

#### 2. **Login** (Get JWT Token)

```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

Body (raw JSON):
{
  "email": "student@kmuni.com",
  "password": "password123"
}
```

Expected Response:
```json
{
  "success": true,
  "message": "Login successful!",
  "user": {
    "id": "...",
    "name": "Alex Johnson",
    "email": "student@kmuni.com",
    "role": "student",
    ...
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Copy the token** from the response!

---

#### 3. **Get Current User** (Test Authentication)

```
GET http://localhost:8080/api/auth/me
Authorization: Bearer YOUR_TOKEN_HERE
```

Replace `YOUR_TOKEN_HERE` with the token from login.

Expected: User details (200 OK)

---

#### 4. **Get Enrolled Courses** (Test Student Endpoint)

```
GET http://localhost:8080/api/student/courses
Authorization: Bearer YOUR_STUDENT_TOKEN
```

Expected: Empty array initially (200 OK)

---

#### 5. **Enroll in Course** (Test Enrollment)

First, get a course ID from the courses list, then:

```
POST http://localhost:8080/api/courses/{COURSE_ID}/enroll
Authorization: Bearer YOUR_STUDENT_TOKEN
```

Expected: Enrollment details (200 OK)

---

#### 6. **Test Instructor Login**

```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

Body:
{
  "email": "instructor@kmuni.com",
  "password": "password123"
}
```

Then test instructor endpoints:

```
GET http://localhost:8080/api/instructor/courses
Authorization: Bearer YOUR_INSTRUCTOR_TOKEN
```

---

#### 7. **Test Admin Login**

```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

Body:
{
  "email": "admin@isquare.com",
  "password": "password123"
}
```

Then test admin endpoints:

```
GET http://localhost:8080/api/admin/users
Authorization: Bearer YOUR_ADMIN_TOKEN
```

---

## 🔍 Verify Database Connectivity

### Using pgAdmin 4

1. Open pgAdmin 4
2. Navigate to: Servers → PostgreSQL → Databases → kmunitech → Schemas → public → Tables
3. You should see tables: `users`, `courses`, `lessons`, `enrollments`, `activities`, `course_tags`

### Using SQL Queries

```sql
-- Check users
SELECT * FROM users;

-- Check courses
SELECT * FROM courses;

-- Check lessons
SELECT * FROM lessons;

-- Verify data was seeded
SELECT COUNT(*) FROM users;  -- Should be 3
SELECT COUNT(*) FROM courses;  -- Should be 6
```

---

## 📋 Postman Collection (Import This)

Create a new collection in Postman and add these requests:

### Environment Variables

Create environment with:
- `base_url`: `http://localhost:8080`
- `student_token`: (set after login)
- `instructor_token`: (set after login)
- `admin_token`: (set after login)

### Collection Structure

```
KMUni Tech API
├── Auth
│   ├── Login (Student)
│   ├── Login (Instructor)
│   ├── Login (Admin)
│   ├── Signup
│   └── Get Current User
├── Courses (Public)
│   ├── Get All Courses
│   ├── Get Course by ID
│   ├── Get Featured Courses
│   └── Enroll in Course
├── Student
│   ├── Get Enrolled Courses
│   ├── Get Activities
│   ├── Update Profile
│   └── Update Progress
├── Instructor
│   ├── Get My Courses
│   ├── Create Course
│   ├── Update Course
│   ├── Delete Course
│   └── Get Analytics
└── Admin
    ├── Get All Users
    ├── Reset Password
    ├── Delete User
    ├── Get All Courses
    └── Get Analytics
```

---

## ✅ Verification Checklist

- [ ] PostgreSQL installed and running
- [ ] Database `kmunitech` created
- [ ] Maven installed
- [ ] Backend builds successfully (`mvn clean install`)
- [ ] Backend runs without errors (`mvn spring-boot:run`)
- [ ] Can access http://localhost:8080/api/courses
- [ ] Login returns JWT token
- [ ] Authenticated endpoints work with token
- [ ] Database tables created automatically
- [ ] Seed data loaded (3 users, 6 courses)
- [ ] All role-based endpoints accessible

---

## 🐛 Troubleshooting

### Issue: "psql: command not found"

**Solution:** Add PostgreSQL to PATH
- Windows: Add `C:\Program Files\PostgreSQL\16\bin` to System PATH
- Restart terminal

### Issue: "Connection refused to localhost:5432"

**Solution:** Start PostgreSQL service
```bash
# Windows
net start postgresql-x64-16

# Or use Services app (services.msc)
```

### Issue: "password authentication failed"

**Solution:** Update application.yml with correct password
```yaml
spring:
  datasource:
    password: your_actual_postgres_password
```

### Issue: "mvn: command not found"

**Solution:** Install Maven (see above) and add to PATH

### Issue: Port 8080 already in use

**Solution:** Change port in application.yml
```yaml
server:
  port: 8081
```

---

## 🎯 Quick Start (TL;DR)

```bash
# 1. Install PostgreSQL
choco install postgresql

# 2. Create database
psql -U postgres -c "CREATE DATABASE kmunitech;"

# 3. Install Maven
choco install maven

# 4. Run backend
cd "E:\SIGMA WD\KM ED TECH\Project-1\kmuni-tech-backend"
mvn spring-boot:run

# 5. Test in Postman
# POST http://localhost:8080/api/auth/login
# Body: {"email":"student@kmuni.com","password":"password123"}
```

Done! 🎉
