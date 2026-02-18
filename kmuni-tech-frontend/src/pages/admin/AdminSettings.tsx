import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Shield, Save, Settings } from 'lucide-react';

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);
  return (
    <DashboardLayout>
      <div className="mb-8"><h1 className="text-2xl font-bold text-white">Admin Settings</h1><p className="text-slate-400 mt-1">Platform-wide configuration</p></div>
      <div className="max-w-2xl space-y-6">
        <div className="card p-6">
          <div className="flex items-center gap-2.5 mb-5"><Settings size={18} className="text-orange-400" /><h2 className="text-white font-semibold">Platform Settings</h2></div>
          <div className="space-y-4">
            <div><label className="block text-slate-300 text-sm font-medium mb-2">Platform Name</label><input defaultValue="KMUni Tech" className="input-field" /></div>
            <div><label className="block text-slate-300 text-sm font-medium mb-2">Support Email</label><input defaultValue="support@kmunitech.com" type="email" className="input-field" /></div>
            <div><label className="block text-slate-300 text-sm font-medium mb-2">Admin Contact (ISquare)</label><input defaultValue="admin@isquare.com" type="email" className="input-field" /></div>
          </div>
          <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} className={`btn-primary mt-5 flex items-center gap-2 ${saved ? 'bg-emerald-600 hover:bg-emerald-600' : ''}`}>
            <Save size={15} /> {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-2.5 mb-5"><Shield size={18} className="text-orange-400" /><h2 className="text-white font-semibold">Security Settings</h2></div>
          <div className="space-y-4">
            {['Require email verification for new accounts','Allow instructor self-registration','Enable two-factor authentication','Auto-suspend accounts on suspicious activity'].map(item => (
              <div key={item} className="flex items-center justify-between py-2">
                <span className="text-slate-300 text-sm">{item}</span>
                <button className="w-10 h-5 bg-indigo-600 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
