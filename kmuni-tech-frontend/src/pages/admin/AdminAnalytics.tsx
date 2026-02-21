import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/common/StatCard';
import { Users, BookOpen, GraduationCap, TrendingUp } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAuth } from '../../context/AuthContext';
import { fetchAdminAnalytics } from '../../utils/api';

export default function AdminAnalytics() {
  const { token } = useAuth();
  const [analytics, setAnalytics] = useState<{
    totalUsers: number;
    totalStudents: number;
    totalInstructors: number;
    totalCourses: number;
    totalEnrollments: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!token) {
        setIsLoading(false);
        setLoadError('Not authenticated');
        return;
      }
      try {
        setLoadError('');
        const data = await fetchAdminAnalytics(token);
        if (!mounted) return;
        setAnalytics(data);
      } catch (e: any) {
        if (!mounted) return;
        setLoadError(e?.message || 'Failed to load analytics');
      } finally {
        if (!mounted) return;
        setIsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [token]);

  return (
    <DashboardLayout>
      <div className="mb-8"><h1 className="text-2xl font-bold text-white">Platform Analytics</h1><p className="text-slate-400 mt-1">Real-time performance metrics</p></div>
      {isLoading ? (
        <LoadingSpinner text="Loading analytics..." />
      ) : loadError ? (
        <p className="text-slate-400 text-sm">{loadError}</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Users size={18} />} label="Total Users" value={analytics?.totalUsers ?? '—'} color="from-indigo-500 to-purple-500" />
          <StatCard icon={<GraduationCap size={18} />} label="Students" value={analytics?.totalStudents ?? '—'} color="from-blue-500 to-cyan-500" />
          <StatCard icon={<TrendingUp size={18} />} label="Instructors" value={analytics?.totalInstructors ?? '—'} color="from-orange-500 to-red-500" />
          <StatCard icon={<BookOpen size={18} />} label="Courses" value={analytics?.totalCourses ?? '—'} color="from-emerald-500 to-teal-500" />
        </div>
      )}

      {!isLoading && !loadError && (
        <div className="card p-6">
          <h2 className="text-white font-bold mb-4">Enrollments</h2>
          <p className="text-slate-400 text-sm">Total enrollments: <span className="text-white font-semibold">{analytics?.totalEnrollments ?? '—'}</span></p>
        </div>
      )}
    </DashboardLayout>
  );
}
