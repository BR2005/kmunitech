import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/common/StatCard';
import { Users, BookOpen, DollarSign, GraduationCap, TrendingUp, ShieldCheck, ArrowRight, AlertTriangle } from 'lucide-react';
import { MOCK_COURSES } from '../../data/mockCourses';
import { formatINRCompact } from '../../utils/currency';

const recentUsers = [
  { name: 'Alex Johnson', email: 'alex@kmuni.com', role: 'student', joined: '2 hours ago', status: 'active' },
  { name: 'Dr. Sarah Chen', email: 'sarah@kmuni.com', role: 'instructor', joined: '1 day ago', status: 'active' },
  { name: 'Mike Torres', email: 'mike@kmuni.com', role: 'student', joined: '2 days ago', status: 'pending' },
  { name: 'Priya Patel', email: 'priya@kmuni.com', role: 'student', joined: '3 days ago', status: 'active' },
];

const roleColors: Record<string, string> = {
  student: 'bg-emerald-500/15 text-emerald-400',
  instructor: 'bg-blue-500/15 text-blue-400',
  admin: 'bg-orange-500/15 text-orange-400',
};

export default function AdminDashboard() {
  const platformRevenue = 10624000; // approx conversion from $128K
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-2">
          <ShieldCheck size={22} className="text-orange-400" />
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        </div>
        <p className="text-slate-400">Platform overview and management console — ISquare Tech Solutions</p>
      </div>

      {/* Alert */}
      <div className="flex items-center gap-3 p-4 bg-amber-500/8 border border-amber-500/20 rounded-xl mb-6">
        <AlertTriangle size={16} className="text-amber-400 flex-shrink-0" />
        <p className="text-amber-300 text-sm">3 instructor applications are awaiting review. <Link to="/admin/users" className="underline underline-offset-2 font-medium">Review now →</Link></p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Users size={18} />} label="Total Users" value="52,480" color="from-indigo-500 to-purple-500" sub="+340 this week" />
        <StatCard icon={<GraduationCap size={18} />} label="Students" value="50,200" color="from-blue-500 to-cyan-500" />
        <StatCard icon={<BookOpen size={18} />} label="Courses" value="214" color="from-emerald-500 to-teal-500" sub="12 pending review" />
        <StatCard icon={<DollarSign size={18} />} label="Platform Revenue" value={formatINRCompact(platformRevenue)} color="from-orange-500 to-red-500" sub="+22% this month" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-bold text-lg">Recent Users</h2>
            <Link to="/admin/users" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">View all <ArrowRight size={13} /></Link>
          </div>
          <div className="space-y-3">
            {recentUsers.map(u => (
              <div key={u.email} className="flex items-center gap-3 p-3 bg-white/2 rounded-xl hover:bg-white/4 transition-all">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {u.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">{u.name}</p>
                  <p className="text-slate-500 text-xs truncate">{u.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge ${roleColors[u.role]} text-[10px] capitalize`}>{u.role}</span>
                  <span className={`badge text-[10px] capitalize ${u.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'}`}>{u.status}</span>
                </div>
                <span className="text-slate-600 text-xs whitespace-nowrap">{u.joined}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Platform Health */}
          <div className="card p-5">
            <h3 className="text-white font-bold mb-4">Platform Health</h3>
            <div className="space-y-4">
              {[
                { label: 'Server Uptime', value: 99.9, color: 'bg-emerald-500' },
                { label: 'Course Completion Rate', value: 72, color: 'bg-indigo-500' },
                { label: 'Student Satisfaction', value: 96, color: 'bg-blue-500' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-white font-medium">{item.value}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-5">
            <h3 className="text-white font-bold mb-4">Admin Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'Manage Users', path: '/admin/users', icon: Users },
                { label: 'Review Courses', path: '/admin/courses', icon: BookOpen },
                { label: 'Security Logs', path: '/admin/security', icon: ShieldCheck },
              ].map(({ label, path, icon: Icon }) => (
                <Link key={path} to={path} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all">
                  <Icon size={15} className="text-orange-400" />
                  <span className="text-slate-300 text-sm">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
