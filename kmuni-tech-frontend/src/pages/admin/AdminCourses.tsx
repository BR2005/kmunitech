import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { CheckCircle, XCircle, Eye, Trash2, Star, Users } from 'lucide-react';
import { formatPriceINR } from '../../utils/currency';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Course } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { fetchAdminCourses } from '../../utils/api';

export default function AdminCourses() {
  const { token } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
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
        const data = await fetchAdminCourses(token);
        if (!mounted) return;
        setCourses(data);
      } catch (e: any) {
        if (!mounted) return;
        setLoadError(e?.message || 'Failed to load courses');
      } finally {
        if (!mounted) return;
        setIsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [token]);

  return (
    <DashboardLayout>
      <div className="mb-8"><h1 className="text-2xl font-bold text-white">Course Management</h1><p className="text-slate-400 mt-1">Review, approve, and manage all platform courses</p></div>
      <div className="space-y-3">
        {isLoading ? (
          <div className="py-10">
            <LoadingSpinner text="Loading courses..." />
          </div>
        ) : loadError ? (
          <p className="text-slate-400 text-sm">{loadError}</p>
        ) : courses.map(course => (
          <div key={course.id} className="card p-4 hover:border-white/15 transition-all">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {course.title.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm">{course.title}</h3>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500">
                  <span>{course.instructorName}</span>
                  <span className="flex items-center gap-1"><Star size={11} className="text-amber-400" />{course.rating}</span>
                  <span className="flex items-center gap-1"><Users size={11} />{course.studentsCount.toLocaleString()}</span>
                  <span className={course.price === 0 ? 'text-emerald-400' : 'text-orange-400'}>{course.price === 0 ? 'Free' : formatPriceINR(course.price)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 text-[10px]">Published</span>
                <button className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"><Eye size={14} /></button>
                <button className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
