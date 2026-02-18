# KMUni Tech Backend

**Professional Spring Boot backend for KMUni Tech edutech platform**

Built with Java 17, Spring Boot 3.2, PostgreSQL, and JWT authentication.

---

## 🚀 Features

- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Student, Instructor, and Admin roles
- **RESTful API** - Clean and well-documented endpoints
- **Course Management** - Full CRUD operations for courses and lessons
- **Enrollment System** - Students can enroll in courses and track progress
- **Activity Tracking** - Log user activities (enrollments, completions, achievements)
- **Exception Handling** - Comprehensive error handling with meaningful messages
- **Database Seeding** - Automatic initialization with demo data

---

## 📋 Prerequisites

- **Java 17** or higher
- **Maven 3.6+**
- **PostgreSQL 12+** (or use H2 for development)
- **Git**

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
cd "E:\SIGMA WD\KM ED TECH\Project-1\kmuni-tech-backend"
```

### 2. Configure Database

Create a PostgreSQL database:

```sql
CREATE DATABASE kmunitech;
```

Update `src/main/resources/application.yml` or create a `.env` file:

```properties
DATABASE_URL=jdbc:postgresql://localhost:5432/kmunitech
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
JWT_SECRET=your-secret-key-here
```

### 3. Build the Project

```bash
mvn clean install
```

### 4. Run the Application

```bash
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

---

## 🔑 Demo Credentials

The database is automatically seeded with demo accounts:

| Role       | Email                   | Password      |
|------------|-------------------------|---------------|
| Student    | student@kmuni.com       | password123   |
| Instructor | instructor@kmuni.com    | password123   |
| Admin      | admin@isquare.com       | password123   |

---

## 📚 API Documentation

### Authentication Endpoints

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "student@kmuni.com",
  "password": "password123"
}
```

#### Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "student"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

---

### Course Endpoints (Public)

#### Get All Courses
```http
GET /api/courses
```

#### Get Course by ID
```http
GET /api/courses/{id}
```

#### Get Featured Courses
```http
GET /api/courses/featured
```

#### Enroll in Course (Student)
```http
POST /api/courses/{id}/enroll
Authorization: Bearer {token}
```

---

### Student Endpoints

#### Get Enrolled Courses
```http
GET /api/student/courses
Authorization: Bearer {student_token}
```

#### Get Activities
```http
GET /api/student/activities
Authorization: Bearer {student_token}
```

#### Update Profile
```http
PUT /api/student/profile
Authorization: Bearer {student_token}
Content-Type: application/json

{
  "name": "New Name",
  "avatar": "https://example.com/avatar.jpg",
  "bio": "My bio"
}
```

#### Update Course Progress
```http
PUT /api/student/enrollments/{enrollmentId}/progress
Authorization: Bearer {student_token}
Content-Type: application/json

{
  "progress": 75
}
```

---

### Instructor Endpoints

#### Get Instructor Courses
```http
GET /api/instructor/courses
Authorization: Bearer {instructor_token}
```

#### Create Course
```http
POST /api/instructor/courses
Authorization: Bearer {instructor_token}
Content-Type: application/json

{
  "title": "New Course",
  "description": "Course description",
  "price": 49.99,
  "level": "beginner",
  "category": "web-dev",
  "tags": ["React", "JavaScript"],
  "lessons": [
    {
      "title": "Lesson 1",
      "description": "Introduction",
      "duration": 30,
      "order": 1,
      "isPreview": true
    }
  ]
}
```

#### Update Course
```http
PUT /api/instructor/courses/{id}
Authorization: Bearer {instructor_token}
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 59.99
}
```

#### Delete Course
```http
DELETE /api/instructor/courses/{id}
Authorization: Bearer {instructor_token}
```

#### Get Analytics
```http
GET /api/instructor/analytics
Authorization: Bearer {instructor_token}
```

---

### Admin Endpoints

#### Get All Users
```http
GET /api/admin/users
Authorization: Bearer {admin_token}
```

#### Reset User Password
```http
POST /api/admin/users/{id}/reset-password
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "newPassword": "newpassword123"
}
```

#### Delete User
```http
DELETE /api/admin/users/{id}
Authorization: Bearer {admin_token}
```

#### Get Platform Analytics
```http
GET /api/admin/analytics
Authorization: Bearer {admin_token}
```

---

## 🗂️ Project Structure

```
src/main/java/com/kmunitech/backend/
├── config/
│   ├── SecurityConfig.java          # Spring Security configuration
│   └── DataInitializer.java         # Database seeding
├── controller/
│   ├── AuthController.java          # Authentication endpoints
│   ├── CourseController.java        # Public course endpoints
│   ├── StudentController.java       # Student-specific endpoints
│   ├── InstructorController.java    # Instructor-specific endpoints
│   └── AdminController.java         # Admin-specific endpoints
├── dto/
│   ├── AuthDTOs.java               # Authentication DTOs
│   ├── CourseDTOs.java             # Course DTOs
│   ├── EnrollmentDTO.java          # Enrollment DTO
│   └── ActivityDTO.java            # Activity DTO
├── entity/
│   ├── User.java                   # User entity
│   ├── Course.java                 # Course entity
│   ├── Lesson.java                 # Lesson entity
│   ├── Enrollment.java             # Enrollment entity
│   └── Activity.java               # Activity entity
├── exception/
│   ├── GlobalExceptionHandler.java # Exception handling
│   ├── ResourceNotFoundException.java
│   ├── UnauthorizedException.java
│   ├── ForbiddenException.java
│   └── ValidationException.java
├── repository/
│   ├── UserRepository.java
│   ├── CourseRepository.java
│   ├── LessonRepository.java
│   ├── EnrollmentRepository.java
│   └── ActivityRepository.java
├── security/
│   ├── JwtUtil.java                # JWT token utilities
│   ├── JwtAuthenticationFilter.java # JWT filter
│   └── CustomUserDetailsService.java
├── service/
│   ├── AuthService.java            # Authentication logic
│   ├── CourseService.java          # Course management
│   ├── EnrollmentService.java      # Enrollment logic
│   ├── UserService.java            # User management
│   └── ActivityService.java        # Activity tracking
└── KmuniTechBackendApplication.java # Main application
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file or set environment variables:

```properties
DATABASE_URL=jdbc:postgresql://localhost:5432/kmunitech
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=86400000
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
PORT=8080
```

### CORS Configuration

By default, the backend allows requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (React dev server)

Update `application.yml` to add more origins.

---

## 🧪 Testing

### Run Tests

```bash
mvn test
```

### Test with cURL

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@kmuni.com","password":"password123"}'

# Get courses
curl http://localhost:8080/api/courses

# Get enrolled courses (requires token)
curl http://localhost:8080/api/student/courses \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📦 Build for Production

```bash
mvn clean package
java -jar target/kmuni-tech-backend-1.0.0.jar
```

---

## 🔗 Frontend Integration

1. Start the backend: `mvn spring-boot:run`
2. Update frontend `.env.local`:
   ```
   VITE_API_URL=http://localhost:8080
   ```
3. Start the frontend: `npm run dev`

The frontend will now communicate with the backend API.

---

## 🛡️ Security Notes

- JWT tokens are used for authentication
- Passwords are encrypted with BCrypt
- Role-based access control enforces permissions
- CORS is configured for allowed origins only
- **Change JWT_SECRET in production!**

---

## 📝 License

Built by **ISquare Tech Solutions** for **KMUni Tech**

---

## 🤝 Support

For issues or questions, contact the development team.
