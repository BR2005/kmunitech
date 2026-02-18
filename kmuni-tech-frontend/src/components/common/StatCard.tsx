import React, { ReactNode } from 'react';
interface Props { icon: ReactNode; label: string; value: string | number; color?: string; sub?: string; }
export default function StatCard({ icon, label, value, color = 'from-indigo-500 to-purple-500', sub }: Props) {
  return (
    <div className="card p-5 hover:border-white/15 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg text-white`}>{icon}</div>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-slate-400 text-sm">{label}</p>
      {sub && <p className="text-indigo-400 text-xs mt-1">{sub}</p>}
    </div>
  );
}
