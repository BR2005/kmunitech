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

This frontend is wired to the **NestJS backend** in `../kmuni-tech-backend-nest`.

### Backend Base URL

Create `kmuni-tech-frontend/.env.local`:

```
VITE_API_BASE_URL=http://localhost:3000
```

The frontend calls endpoints like:

```
POST /api/auth/login
POST /api/auth/signup
GET  /api/courses
GET  /api/courses/:id
POST /api/courses/:id/enroll
GET  /api/student/courses
GET  /api/instructor/courses
POST /api/instructor/courses
GET  /api/media/lessons/:lessonId/playback
```

### Supabase (Lesson Video Storage)

When an instructor creates a course, lesson video files are uploaded to **Supabase Storage** from the browser and the resulting public URL is sent to the backend.

Add these to `kmuni-tech-frontend/.env.local`:

```
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your_anon_publishable_key>
VITE_SUPABASE_VIDEO_BUCKET=edtechkmunitek
```

Notes:
- The Storage bucket must already exist.
- `uploadLessonVideoToSupabase()` uses `getPublicUrl()`, so the bucket/object needs to be publicly readable (or you will need to switch to signed URLs).

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
