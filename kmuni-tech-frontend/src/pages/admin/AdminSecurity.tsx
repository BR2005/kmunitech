import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { ShieldCheck, AlertTriangle, Key, Lock } from 'lucide-react';

const logs = [
  { event: 'Admin login', user: 'admin@isquare.com', ip: '192.168.1.1', time: '10 min ago', type: 'success' },
  { event: 'Password reset', user: 'alex@kmuni.com', ip: '10.0.0.5', time: '1 hour ago', type: 'info' },
  { event: 'Failed login attempt', user: 'unknown', ip: '45.33.22.11', time: '2 hours ago', type: 'warning' },
  { event: 'New instructor approved', user: 'priya@kmuni.com', ip: '192.168.1.5', time: '5 hours ago', type: 'success' },
];

export default function AdminSecurity() {
  return (
    <DashboardLayout>
      <div className="mb-8"><h1 className="text-2xl font-bold text-white">Security Center</h1><p className="text-slate-400 mt-1">Monitor platform security and access logs</p></div>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {[{icon:ShieldCheck,label:'Security Score',value:'98/100',color:'from-emerald-500 to-teal-500'},{icon:AlertTriangle,label:'Active Alerts',value:'1',color:'from-amber-500 to-orange-500'},{icon:Key,label:'Password Resets',value:'3',color:'from-indigo-500 to-purple-500'}].map(s => (
          <div key={s.label} className="card p-5 flex items-center gap-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center`}><s.icon size={20} className="text-white" /></div>
            <div><p className="text-2xl font-bold text-white">{s.value}</p><p className="text-slate-400 text-sm">{s.label}</p></div>
          </div>
        ))}
      </div>
      <div className="card p-6">
        <h2 className="text-white font-bold mb-5">Audit Log</h2>
        <div className="space-y-3">
          {logs.map((log, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white/2 rounded-xl">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${log.type === 'success' ? 'bg-emerald-400' : log.type === 'warning' ? 'bg-amber-400' : 'bg-blue-400'}`} />
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{log.event}</p>
                <p className="text-slate-500 text-xs">{log.user} • {log.ip}</p>
              </div>
              <span className="text-slate-600 text-xs whitespace-nowrap">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
