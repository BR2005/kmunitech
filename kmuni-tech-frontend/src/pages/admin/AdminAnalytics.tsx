import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/common/StatCard';
import { TrendingUp, Users, BookOpen, DollarSign } from 'lucide-react';
import { formatINRCompact } from '../../utils/currency';

export default function AdminAnalytics() {
  const data = [280, 420, 380, 550, 490, 720, 650];
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const max = Math.max(...data);
  const revenueToday = 235720; // approx conversion from $2,840

  return (
    <DashboardLayout>
      <div className="mb-8"><h1 className="text-2xl font-bold text-white">Platform Analytics</h1><p className="text-slate-400 mt-1">Real-time performance metrics</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Users size={18} />} label="Active Users (Today)" value="1,284" color="from-indigo-500 to-purple-500" sub="+8.2% vs yesterday" />
        <StatCard icon={<BookOpen size={18} />} label="Lessons Completed" value="8,430" color="from-blue-500 to-cyan-500" sub="Today" />
        <StatCard icon={<DollarSign size={18} />} label="Revenue Today" value={formatINRCompact(revenueToday)} color="from-emerald-500 to-teal-500" />
        <StatCard icon={<TrendingUp size={18} />} label="New Signups" value="340" color="from-orange-500 to-red-500" sub="+22% this week" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-white font-bold mb-5">Weekly Active Users</h2>
          <div className="flex items-end gap-3 h-48">
            {data.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-slate-500">{v}</span>
                <div className="w-full bg-indigo-500/20 hover:bg-indigo-500/50 rounded-t-lg transition-all" style={{ height: `${(v/max)*100}%`, minHeight: '8px' }} />
                <span className="text-xs text-slate-500">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h2 className="text-white font-bold mb-5">User Distribution</h2>
          <div className="space-y-4">
            {[{label:'Students',count:'50,200',pct:96,color:'bg-emerald-500'},{label:'Instructors',count:'150',pct:2,color:'bg-blue-500'},{label:'Admins',count:'5',pct:0.1,color:'bg-orange-500'}].map(r => (
              <div key={r.label}>
                <div className="flex justify-between text-sm mb-2"><span className="text-slate-300">{r.label}</span><span className="text-white font-medium">{r.count}</span></div>
                <div className="progress-bar"><div className={`h-full ${r.color} rounded-full`} style={{width:`${r.pct}%`}} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
