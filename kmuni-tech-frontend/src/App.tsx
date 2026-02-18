import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import HomePage from './pages/public/HomePage';
import CoursesPage from './pages/public/CoursesPage';
import CourseDetailPage from './pages/public/CourseDetailPage';
import LoginPage from './pages/public/LoginPage';
import SignupPage from './pages/public/SignupPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentCourses from './pages/student/StudentCourses';
import StudentCertificates from './pages/student/StudentCertificates';
import StudentSettings from './pages/student/StudentSettings';

// Instructor Pages
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import InstructorCourses from './pages/instructor/InstructorCourses';
import CreateCourse from './pages/instructor/CreateCourse';
import InstructorAnalytics from './pages/instructor/InstructorAnalytics';
import InstructorSettings from './pages/instructor/InstructorSettings';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCourses from './pages/admin/AdminCourses';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSecurity from './pages/admin/AdminSecurity';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ── Public ──────────────────────────────────────────── */}
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* ── Student (protected) ─────────────────────────────── */}
          <Route path="/student/dashboard" element={
            <ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>
          } />
          <Route path="/student/courses" element={
            <ProtectedRoute allowedRoles={['student']}><StudentCourses /></ProtectedRoute>
          } />
          <Route path="/student/certificates" element={
            <ProtectedRoute allowedRoles={['student']}><StudentCertificates /></ProtectedRoute>
          } />
          <Route path="/student/settings" element={
            <ProtectedRoute allowedRoles={['student']}><StudentSettings /></ProtectedRoute>
          } />

          {/* ── Instructor (protected) ──────────────────────────── */}
          <Route path="/instructor/dashboard" element={
            <ProtectedRoute allowedRoles={['instructor']}><InstructorDashboard /></ProtectedRoute>
          } />
          <Route path="/instructor/courses" element={
            <ProtectedRoute allowedRoles={['instructor']}><InstructorCourses /></ProtectedRoute>
          } />
          <Route path="/instructor/create-course" element={
            <ProtectedRoute allowedRoles={['instructor']}><CreateCourse /></ProtectedRoute>
          } />
          <Route path="/instructor/analytics" element={
            <ProtectedRoute allowedRoles={['instructor']}><InstructorAnalytics /></ProtectedRoute>
          } />
          <Route path="/instructor/settings" element={
            <ProtectedRoute allowedRoles={['instructor']}><InstructorSettings /></ProtectedRoute>
          } />

          {/* ── Admin (protected) ───────────────────────────────── */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>
          } />
          <Route path="/admin/courses" element={
            <ProtectedRoute allowedRoles={['admin']}><AdminCourses /></ProtectedRoute>
          } />
          <Route path="/admin/analytics" element={
            <ProtectedRoute allowedRoles={['admin']}><AdminAnalytics /></ProtectedRoute>
          } />
          <Route path="/admin/security" element={
            <ProtectedRoute allowedRoles={['admin']}><AdminSecurity /></ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>
          } />

          {/* ── Fallback ────────────────────────────────────────── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
