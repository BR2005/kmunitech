import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/common/StatCard';
import { BookMarked, CheckCircle, Clock, Award, Play, TrendingUp, ArrowRight, Star } from 'lucide-react';
import { formatPriceINR } from '../../utils/currency';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Activity, Course, Enrollment } from '../../types';
import { fetchFeaturedCourses, fetchStudentActivities, fetchStudentEnrollments } from '../../utils/api';

export default function StudentDashboard() {
  const { user, token } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [recommended, setRecommended] = useState<Course[]>([]);
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
        const [enrollmentsData, activitiesData, featured] = await Promise.all([
          fetchStudentEnrollments(token),
          fetchStudentActivities(token),
          fetchFeaturedCourses(),
        ]);
        if (!mounted) return;
        setEnrollments(enrollmentsData);
        setActivities(activitiesData);
        setRecommended(featured.slice(0, 2));
      } catch (e: any) {
        if (!mounted) return;
        setLoadError(e?.message || 'Failed to load dashboard');
      } finally {
        if (!mounted) return;
        setIsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [token]);

  const completedCount = useMemo(() => enrollments.filter(e => e.progress >= 100 || e.completedAt).length, [enrollments]);

  const timeAgo = (iso: string) => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} day${days === 1 ? '' : 's'} ago`;
    if (hours > 0) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    if (minutes > 0) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    return 'just now';
  };

  const activityIcon = (type: Activity['type']) => {
    if (type === 'completion') return { icon: '📘', color: 'text-emerald-400' };
    if (type === 'achievement') return { icon: '🏆', color: 'text-amber-400' };
    return { icon: '🎯', color: 'text-indigo-400' };
  };

  const recentEnrollments = useMemo(() => enrollments.slice(0, 3), [enrollments]);

  return (
    <DashboardLayout>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">
          Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>! 👋
        </h1>
        <p className="text-slate-400">Ready to continue learning? You're making great progress.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<BookMarked size={18} />} label="Enrolled Courses" value={enrollments.length} color="from-indigo-500 to-purple-500" />
        <StatCard icon={<CheckCircle size={18} />} label="Completed" value={completedCount} color="from-emerald-500 to-teal-500" />
        <StatCard icon={<Clock size={18} />} label="Hours Learned" value="—" color="from-blue-500 to-cyan-500" sub="Not available" />
        <StatCard icon={<Award size={18} />} label="Certificates" value="—" color="from-orange-500 to-red-500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* My Courses */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-bold text-lg">My Courses</h2>
            <Link to="/student/courses" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div className="space-y-4">
            {isLoading ? (
              <div className="py-6">
                <LoadingSpinner text="Loading..." />
              </div>
            ) : loadError ? (
              <p className="text-slate-400 text-sm">{loadError}</p>
            ) : recentEnrollments.length === 0 ? (
              <p className="text-slate-400 text-sm">No enrollments yet.</p>
            ) : recentEnrollments.map((enrollment, i) => (
              <div key={enrollment.id} className="flex items-center gap-4 p-4 bg-white/3 rounded-2xl hover:bg-white/5 transition-all group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 bg-gradient-to-br ${
                  ['from-indigo-500 to-purple-500','from-blue-500 to-cyan-500','from-orange-500 to-red-500'][i]
                }`}>{enrollment.courseTitle.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">{enrollment.courseTitle}</p>
                  <p className="text-slate-500 text-xs">{enrollment.instructorName}</p>
                  <div className="mt-2 progress-bar">
                    <div className="progress-fill" style={{ width: `${enrollment.progress}%` }} />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{enrollment.progress}% complete</p>
                </div>
                <Link to={`/courses/${enrollment.courseId}`}>
                  <button className="w-9 h-9 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/40 rounded-xl flex items-center justify-center text-indigo-400 transition-all group-hover:scale-110">
                    <Play size={14} className="ml-0.5" />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Activity */}
          <div className="card p-5">
            <h3 className="text-white font-bold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {isLoading ? (
                <LoadingSpinner size="sm" text="Loading activity..." />
              ) : activities.length === 0 ? (
                <p className="text-slate-500 text-sm">No recent activity.</p>
              ) : activities.slice(0, 4).map(act => {
                const meta = activityIcon(act.type);
                return (
                  <div key={act.id} className="flex items-start gap-3">
                    <span className="text-xl">{meta.icon}</span>
                    <div>
                      <p className="text-white text-sm font-medium">{act.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{timeAgo(act.timestamp)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended */}
          <div className="card p-5">
            <h3 className="text-white font-bold mb-4">Recommended</h3>
            <div className="space-y-3">
              {recommended.map(c => (
                <Link key={c.id} to={`/courses/${c.id}`} className="flex items-center gap-3 p-3 bg-white/3 rounded-xl hover:bg-white/5 transition-all">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">{c.title.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">{c.title}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={10} className="fill-amber-400 text-amber-400" />
                      <span className="text-slate-500 text-xs">{c.rating}</span>
                      <span className="text-slate-600 text-xs">• {formatPriceINR(c.price)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
