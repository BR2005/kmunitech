import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/common/StatCard';
import { Users, DollarSign, Star, TrendingUp, Eye } from 'lucide-react';
import { formatINRCompact, formatPriceINR } from '../../utils/currency';

export default function InstructorAnalytics() {
  const months = ['Jan','Feb','Mar','Apr','May','Jun'];
  const data = [320, 480, 390, 650, 580, 820];
  const max = Math.max(...data);
  const totalRevenue = 1029200; // approx conversion from $12.4K

  return (
    <DashboardLayout>
      <div className="mb-8"><h1 className="text-2xl font-bold text-white">Analytics</h1><p className="text-slate-400 mt-1">Performance insights for your courses</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Users size={18} />} label="Total Students" value="5,090" color="from-indigo-500 to-purple-500" sub="+12% this month" />
        <StatCard icon={<DollarSign size={18} />} label="Total Revenue" value={formatINRCompact(totalRevenue)} color="from-emerald-500 to-teal-500" sub="+8% this month" />
        <StatCard icon={<Eye size={18} />} label="Course Views" value="24K" color="from-blue-500 to-cyan-500" />
        <StatCard icon={<Star size={18} />} label="Avg Rating" value="4.8" color="from-amber-500 to-orange-500" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-white font-bold mb-5">Student Enrollments</h2>
          <div className="flex items-end gap-3 h-48">
            {data.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-slate-500">{v}</span>
                <div className="w-full bg-indigo-500/20 hover:bg-indigo-500/40 rounded-t-lg transition-all cursor-pointer" style={{ height: `${(v/max)*100}%`, minHeight: '8px' }} />
                <span className="text-xs text-slate-500">{months[i]}</span>
              </div>
            ))}
          </div>
          <p className="text-emerald-400 text-sm font-semibold mt-4 flex items-center gap-1"><TrendingUp size={14} /> +41% growth in 6 months</p>
        </div>

        <div className="card p-6">
          <h2 className="text-white font-bold mb-5">Revenue Breakdown</h2>
          <div className="space-y-4">
            {[{name:'React Masterclass', pct:60, rev:0, color:'bg-indigo-500'},{name:'Spring Boot Pro',pct:40,rev:355240, color:'bg-orange-500'}].map(item => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">{item.name}</span>
                  <span className="text-white font-medium">{item.rev === 0 ? '₹0' : formatPriceINR(item.rev)}</span>
                </div>
                <div className="progress-bar">
                  <div className={`h-full ${item.color} rounded-full`} style={{width:`${item.pct}%`}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
