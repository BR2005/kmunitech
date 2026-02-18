# Quick Start Guide - PostgreSQL + Backend Testing

## 🚀 Automated Setup (Recommended)

### Option 1: Run PowerShell Script (Recommended)

1. **Right-click** on `setup.ps1` → **Run with PowerShell as Administrator**
2. Follow the prompts
3. Close and reopen terminal after installation

### Option 2: Run Batch Script

1. **Right-click** on `setup.bat` → **Run as Administrator**
2. Follow the prompts
3. Close and reopen terminal after installation

---

## 📦 Manual Installation

### 1. Install PostgreSQL

**Download:** https://www.postgresql.org/download/windows/

- Choose PostgreSQL 16
- During installation, set password for `postgres` user (remember this!)
- Port: 5432 (default)
- Install all components

**Or use Chocolatey:**
```powershell
# Run PowerShell as Administrator
choco install postgresql16 -y
```

### 2. Install Maven

**Download:** https://maven.apache.org/download.cgi

**Or use Chocolatey:**
```powershell
choco install maven -y
```

### 3. Verify Installation

```bash
# Check PostgreSQL
psql --version

# Check Maven
mvn --version

# Check Java
java -version
```

---

## 🗄️ Create Database

### Method 1: SQL Shell (psql)

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

### Method 2: One-liner

```bash
psql -U postgres -c "CREATE DATABASE kmunitech;"
```

### Method 3: pgAdmin 4

1. Open pgAdmin 4
2. Connect to PostgreSQL Server
3. Right-click "Databases" → Create → Database
4. Name: `kmunitech`
5. Save

---

## ▶️ Run the Backend

```bash
# Navigate to backend directory
cd "E:\SIGMA WD\KM ED TECH\Project-1\kmuni-tech-backend"

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

**Expected Output:**
```
Started KmuniTechBackendApplication in 8.234 seconds
```

Server will be running on: **http://localhost:8080**

---

## 🧪 Test with Postman

### 1. Install Postman

Download: https://www.postman.com/downloads/

### 2. Import Collection

1. Open Postman
2. Click **Import**
3. Select file: `KMUni-Tech-API.postman_collection.json`
4. Collection will be imported with all endpoints

### 3. Test Endpoints

#### Step 1: Login as Student

1. Open: **Authentication** → **Login - Student**
2. Click **Send**
3. Token will be automatically saved to collection variables

#### Step 2: Get All Courses

1. Open: **Courses (Public)** → **Get All Courses**
2. Click **Send**
3. You should see 6 courses

#### Step 3: Get Current User

1. Open: **Authentication** → **Get Current User**
2. Click **Send**
3. You should see student details

#### Step 4: Enroll in a Course

1. First, copy a course ID from the courses list
2. Open: **Courses (Public)** → **Enroll in Course**
3. In URL, replace `:id` with the course ID
4. Click **Send**
5. You should see enrollment details

#### Step 5: Check Enrolled Courses

1. Open: **Student** → **Get Enrolled Courses**
2. Click **Send**
3. You should see the course you just enrolled in

---

## ✅ Verification Checklist

Run these tests in order:

### Public Endpoints (No Auth Required)

- [ ] `GET /api/courses` - Returns 6 courses
- [ ] `GET /api/courses/featured` - Returns featured courses
- [ ] `GET /api/courses/{id}` - Returns course details with lessons

### Authentication

- [ ] `POST /api/auth/login` (student) - Returns token
- [ ] `POST /api/auth/login` (instructor) - Returns token
- [ ] `POST /api/auth/login` (admin) - Returns token
- [ ] `GET /api/auth/me` - Returns current user

### Student Endpoints (Requires Student Token)

- [ ] `POST /api/courses/{id}/enroll` - Enrolls in course
- [ ] `GET /api/student/courses` - Returns enrolled courses
- [ ] `GET /api/student/activities` - Returns activities
- [ ] `PUT /api/student/profile` - Updates profile
- [ ] `PUT /api/student/enrollments/{id}/progress` - Updates progress

### Instructor Endpoints (Requires Instructor Token)

- [ ] `GET /api/instructor/courses` - Returns instructor's courses (6 courses)
- [ ] `POST /api/instructor/courses` - Creates new course
- [ ] `PUT /api/instructor/courses/{id}` - Updates course
- [ ] `DELETE /api/instructor/courses/{id}` - Deletes course
- [ ] `GET /api/instructor/analytics` - Returns analytics

### Admin Endpoints (Requires Admin Token)

- [ ] `GET /api/admin/users` - Returns all users (3 users)
- [ ] `GET /api/admin/courses` - Returns all courses
- [ ] `POST /api/admin/users/{id}/reset-password` - Resets password
- [ ] `GET /api/admin/analytics` - Returns platform analytics

---

## 🔍 Verify Database

### Using pgAdmin 4

1. Open pgAdmin 4
2. Navigate to: PostgreSQL → Databases → kmunitech → Schemas → public → Tables
3. You should see:
   - `users` (3 rows)
   - `courses` (6 rows)
   - `lessons` (multiple rows)
   - `enrollments` (empty initially)
   - `activities` (empty initially)
   - `course_tags`

### Using SQL Queries

```sql
-- Check users
SELECT id, name, email, role FROM users;

-- Check courses
SELECT id, title, price, level, category, students_count FROM courses;

-- Check lessons
SELECT id, title, duration, lesson_order, is_preview, course_id FROM lessons;

-- Count records
SELECT 
    (SELECT COUNT(*) FROM users) as users,
    (SELECT COUNT(*) FROM courses) as courses,
    (SELECT COUNT(*) FROM lessons) as lessons;
```

Expected output:
- Users: 3
- Courses: 6
- Lessons: 14-16

---

## 🐛 Troubleshooting

### Backend won't start

**Error:** `Connection refused to localhost:5432`

**Solution:** Start PostgreSQL service
```bash
# Windows
net start postgresql-x64-16

# Or use Services app (services.msc)
```

### Authentication failed

**Error:** `password authentication failed for user "postgres"`

**Solution:** Update `application.yml`:
```yaml
spring:
  datasource:
    password: your_actual_password
```

### Port already in use

**Error:** `Port 8080 is already in use`

**Solution:** Kill the process or change port:
```bash
# Find process on port 8080
netstat -ano | findstr :8080

# Kill process (replace PID)
taskkill /PID <PID> /F

# Or change port in application.yml
server:
  port: 8081
```

### Maven not found

**Solution:** Add Maven to PATH and restart terminal
```
C:\Program Files\Apache\maven\bin
```

---

## 📊 Expected Test Results

### Login Response
```json
{
  "success": true,
  "message": "Login successful!",
  "user": {
    "id": "uuid-here",
    "name": "Alex Johnson",
    "email": "student@kmuni.com",
    "role": "student"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Get Courses Response
```json
[
  {
    "id": "uuid",
    "title": "Complete React & TypeScript Masterclass",
    "price": 0,
    "level": "beginner",
    "category": "web-dev",
    "studentsCount": 3240,
    "rating": 4.9,
    "isFeatured": true
  },
  ...
]
```

### Enrollment Response
```json
{
  "id": "uuid",
  "courseId": "uuid",
  "courseTitle": "Complete React & TypeScript Masterclass",
  "progress": 0,
  "enrolledAt": "2026-02-17T22:48:25"
}
```

---

## 🎯 Success Criteria

✅ PostgreSQL installed and running  
✅ Database `kmunitech` created  
✅ Maven installed  
✅ Backend builds without errors  
✅ Backend starts on port 8080  
✅ All 3 login endpoints work  
✅ Public endpoints accessible  
✅ Student can enroll in courses  
✅ Instructor can create courses  
✅ Admin can manage users  
✅ Database tables populated with seed data  

---

## 📞 Need Help?

If you encounter issues:

1. Check the logs in the terminal
2. Verify PostgreSQL is running: `pg_isready`
3. Check database exists: `psql -U postgres -l`
4. Verify backend is running: `curl http://localhost:8080/api/courses`
5. Review `SETUP_GUIDE.md` for detailed troubleshooting

---

**You're all set! 🎉**

The backend is now ready to integrate with your React frontend.
