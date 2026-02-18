import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import LoadingSpinner from './LoadingSpinner';

interface Props { children: React.ReactNode; allowedRoles?: UserRole[]; }

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0f1a]">
      <LoadingSpinner size="lg" text="Loading..." />
    </div>
  );

  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    const redirects: Record<UserRole, string> = {
      student: '/student/dashboard',
      instructor: '/instructor/dashboard',
      admin: '/admin/dashboard',
    };
    return <Navigate to={redirects[user.role]} replace />;
  }

  return <>{children}</>;
}
