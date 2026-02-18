import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/common/StatCard';
import { BookOpen, Users, DollarSign, Star, PlusCircle, BarChart3, TrendingUp, ArrowRight } from 'lucide-react';
import { MOCK_COURSES } from '../../data/mockCourses';
import { formatINRCompact, formatPriceINR } from '../../utils/currency';

export default function InstructorDashboard() {
  const { user } = useAuth();
  const myCourses = MOCK_COURSES.slice(0, 2);
  const revenueThisMonth = 355240; // approx conversion from $4,280

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">
          Welcome, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>! 👋
        </h1>
        <p className="text-slate-400">Here's how your courses are performing today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<BookOpen size={18} />} label="Total Courses" value="2" color="from-indigo-500 to-purple-500" />
        <StatCard icon={<Users size={18} />} label="Total Students" value="5,090" color="from-blue-500 to-cyan-500" sub="+12% this month" />
        <StatCard icon={<DollarSign size={18} />} label="Revenue" value={formatINRCompact(revenueThisMonth)} color="from-emerald-500 to-teal-500" sub="This month" />
        <StatCard icon={<Star size={18} />} label="Avg Rating" value="4.8" color="from-amber-500 to-orange-500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* My Courses */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-bold text-lg">My Courses</h2>
            <Link to="/instructor/courses" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div className="space-y-4">
            {myCourses.map((course, i) => (
              <div key={course.id} className="flex items-center gap-4 p-4 bg-white/3 rounded-2xl">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 bg-gradient-to-br ${
                  ['from-indigo-500 to-purple-500','from-orange-500 to-red-500'][i]
                }`}>{course.title.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">{course.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Users size={11} />{course.studentsCount.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Star size={11} className="text-amber-400" />{course.rating}</span>
                    <span>{formatPriceINR(course.price)}</span>
                  </div>
                </div>
                <Link to={`/instructor/courses`}>
                  <button className="btn-secondary text-xs py-2 px-3">Manage</button>
                </Link>
              </div>
            ))}
          </div>
          <Link to="/instructor/create-course" className="btn-primary mt-5 text-sm flex items-center justify-center gap-2 py-3">
            <PlusCircle size={16} /> Create New Course
          </Link>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <div className="card p-5">
            <h3 className="text-white font-bold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { icon: PlusCircle, label: 'New Course', path: '/instructor/create-course', color: 'text-indigo-400' },
                { icon: BarChart3, label: 'View Analytics', path: '/instructor/analytics', color: 'text-blue-400' },
                { icon: BookOpen, label: 'Manage Courses', path: '/instructor/courses', color: 'text-emerald-400' },
              ].map(({ icon: Icon, label, path, color }) => (
                <Link key={path} to={path} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all">
                  <Icon size={16} className={color} />
                  <span className="text-slate-300 text-sm">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="card p-5">
            <h3 className="text-white font-bold mb-4">Revenue Trend</h3>
            <div className="flex items-end gap-1 h-24">
              {[40, 60, 45, 80, 65, 90, 75].map((h, i) => (
                <div key={i} className="flex-1 bg-indigo-500/20 hover:bg-indigo-500/40 rounded-t-md transition-all cursor-pointer"
                  style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-600 mt-2">
              {['M','T','W','T','F','S','S'].map((d, i) => <span key={i}>{d}</span>)}
            </div>
            <p className="text-emerald-400 text-sm font-semibold mt-3 flex items-center gap-1">
              <TrendingUp size={14} /> +18% this week
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
