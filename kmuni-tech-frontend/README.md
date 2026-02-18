# KMUni Tech — Frontend

**Client:** KMUni Tech  
**Built by:** ISquare Tech Solutions  
**Stack:** React 18 + Vite + TypeScript + Tailwind CSS

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## 🔑 Demo Credentials

| Role       | Email                   | Password      |
|------------|-------------------------|---------------|
| Student    | student@kmuni.com       | password123   |
| Instructor | instructor@kmuni.com    | password123   |
| Admin      | admin@isquare.com       | password123   |

> ⚠️ Admin login works via direct email — the public signup/login UI only shows Student & Instructor options.

---

## 📁 Project Structure

```
src/
├── App.tsx                    # Routes & Providers
├── main.tsx                   # Entry point
├── index.css                  # Tailwind + design system
│
├── types/index.ts             # TypeScript interfaces
├── context/AuthContext.tsx    # Auth state management
├── data/mockCourses.ts        # Mock course data
│
├── components/
│   ├── common/
│   │   ├── CourseCard.tsx     # Reusable course card
│   │   ├── StatCard.tsx       # Dashboard stat card
│   │   ├── LoadingSpinner.tsx
│   │   └── ProtectedRoute.tsx # Role-based route guard
│   └── layout/
│       ├── Navbar.tsx         # Public navigation
│       ├── Footer.tsx
│       └── DashboardLayout.tsx # Sidebar dashboard shell
│
└── pages/
    ├── public/
    │   ├── HomePage.tsx       # Landing page
    │   ├── CoursesPage.tsx    # Browse & filter courses
    │   ├── CourseDetailPage.tsx
    │   ├── LoginPage.tsx
    │   └── SignupPage.tsx
    ├── student/
    │   ├── StudentDashboard.tsx
    │   ├── StudentCourses.tsx
    │   ├── StudentCertificates.tsx
    │   └── StudentSettings.tsx
    ├── instructor/
    │   ├── InstructorDashboard.tsx
    │   ├── InstructorCourses.tsx
    │   ├── CreateCourse.tsx
    │   ├── InstructorAnalytics.tsx
    │   └── InstructorSettings.tsx
    └── admin/
        ├── AdminDashboard.tsx
        ├── AdminUsers.tsx     # With password reset modal
        ├── AdminCourses.tsx
        ├── AdminAnalytics.tsx
        ├── AdminSecurity.tsx
        └── AdminSettings.tsx
```

---

## 🔌 Connecting to Spring Boot API

All API calls are currently mocked. Search for `TODO:` comments in `src/context/AuthContext.tsx` to replace with real endpoints.

### Recommended API Endpoints (Spring Boot):

```
POST /api/auth/login           → Login
POST /api/auth/signup          → Register
GET  /api/courses              → List courses
GET  /api/courses/:id          → Course detail
POST /api/courses/:id/enroll   → Enroll
GET  /api/student/courses      → My enrolled courses
GET  /api/instructor/courses   → Instructor's courses
POST /api/instructor/courses   → Create course
GET  /api/admin/users          → All users
POST /api/admin/users/:id/reset-password → Admin reset
```

### API Client Setup (recommended):

```ts
// src/utils/apiClient.ts
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const apiClient = {
  get: (path: string) => fetch(`${BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('kmuni_token')}` }
  }).then(r => r.json()),
  
  post: (path: string, body: any) => fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('kmuni_token')}`
    },
    body: JSON.stringify(body)
  }).then(r => r.json())
};
```

### Environment Variables:
Create `.env.local`:
```
VITE_API_URL=http://localhost:8080
```

---

## 🎨 Design System

- **Dark theme** with Indigo/Purple primary palette
- **Font:** Sora (Google Fonts)
- **CSS Utilities:** Defined in `index.css` (`.btn-primary`, `.card`, `.input-field`, etc.)
- **Color tokens:** CSS variables in `:root`

---

## 🛡️ Security Notes

- Admin accounts are NOT publicly visible — admin login is via direct email (provided by ISquare)
- `ProtectedRoute` enforces role-based access
- JWT stored in `localStorage` — backend should implement refresh tokens for production

## 📦 Build

```bash
npm run build
# Output: dist/ folder → deploy to Vercel, Netlify, Nginx, etc.
```
