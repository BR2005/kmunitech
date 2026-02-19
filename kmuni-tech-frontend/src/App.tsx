import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy load page components
const HomePage = React.lazy(() => import('./pages/public/HomePage'));
const CoursesPage = React.lazy(() => import('./pages/public/CoursesPage'));
const CourseDetailPage = React.lazy(() => import('./pages/public/CourseDetailPage'));
const LoginPage = React.lazy(() => import('./pages/public/LoginPage'));
const SignupPage = React.lazy(() => import('./pages/public/SignupPage'));
const CollaborationsPage = React.lazy(() => import('./pages/public/CollaborationsPage'));
const AboutPage = React.lazy(() => import('./pages/public/AboutPage'));

const StudentDashboard = React.lazy(() => import('./pages/student/StudentDashboard'));
const StudentCourses = React.lazy(() => import('./pages/student/StudentCourses'));
const StudentCertificates = React.lazy(() => import('./pages/student/StudentCertificates'));
const StudentSettings = React.lazy(() => import('./pages/student/StudentSettings'));

const InstructorDashboard = React.lazy(() => import('./pages/instructor/InstructorDashboard'));
const InstructorCourses = React.lazy(() => import('./pages/instructor/InstructorCourses'));
const CreateCourse = React.lazy(() => import('./pages/instructor/CreateCourse'));
const InstructorAnalytics = React.lazy(() => import('./pages/instructor/InstructorAnalytics'));
const InstructorSettings = React.lazy(() => import('./pages/instructor/InstructorSettings'));

const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsers = React.lazy(() => import('./pages/admin/AdminUsers'));
const AdminCourses = React.lazy(() => import('./pages/admin/AdminCourses'));
const AdminAnalytics = React.lazy(() => import('./pages/admin/AdminAnalytics'));
const AdminSecurity = React.lazy(() => import('./pages/admin/AdminSecurity'));
const AdminSettings = React.lazy(() => import('./pages/admin/AdminSettings'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* ── Public ──────────────────────────────────────────── */}
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/collaborations" element={<CollaborationsPage />} />
            <Route path="/about" element={<AboutPage />} />

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
        </React.Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
