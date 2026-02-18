import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/common/StatCard';
import { BookMarked, CheckCircle, Clock, Award, Play, TrendingUp, ArrowRight, Star } from 'lucide-react';
import { MOCK_COURSES } from '../../data/mockCourses';
import { formatPriceINR } from '../../utils/currency';

const recentActivity = [
  { icon: '📘', title: 'Completed "TypeScript Basics"', time: '2 hours ago', color: 'text-emerald-400' },
  { icon: '🎯', title: 'Enrolled in React Masterclass', time: '1 day ago', color: 'text-indigo-400' },
  { icon: '🏆', title: 'Earned DevOps Badge', time: '3 days ago', color: 'text-amber-400' },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const enrolledCourses = MOCK_COURSES.slice(0, 3);
  const progress = [65, 35, 20];

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
        <StatCard icon={<BookMarked size={18} />} label="Enrolled Courses" value="3" color="from-indigo-500 to-purple-500" />
        <StatCard icon={<CheckCircle size={18} />} label="Completed" value="1" color="from-emerald-500 to-teal-500" sub="+1 this month" />
        <StatCard icon={<Clock size={18} />} label="Hours Learned" value="12" color="from-blue-500 to-cyan-500" sub="This week" />
        <StatCard icon={<Award size={18} />} label="Certificates" value="1" color="from-orange-500 to-red-500" />
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
            {enrolledCourses.map((course, i) => (
              <div key={course.id} className="flex items-center gap-4 p-4 bg-white/3 rounded-2xl hover:bg-white/5 transition-all group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 bg-gradient-to-br ${
                  ['from-indigo-500 to-purple-500','from-blue-500 to-cyan-500','from-orange-500 to-red-500'][i]
                }`}>{course.title.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">{course.title}</p>
                  <p className="text-slate-500 text-xs">{course.instructorName}</p>
                  <div className="mt-2 progress-bar">
                    <div className="progress-fill" style={{ width: `${progress[i]}%` }} />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{progress[i]}% complete</p>
                </div>
                <Link to={`/courses/${course.id}`}>
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
              {recentActivity.map(act => (
                <div key={act.title} className="flex items-start gap-3">
                  <span className="text-xl">{act.icon}</span>
                  <div>
                    <p className="text-white text-sm font-medium">{act.title}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div className="card p-5">
            <h3 className="text-white font-bold mb-4">Recommended</h3>
            <div className="space-y-3">
              {MOCK_COURSES.slice(3, 5).map(c => (
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
