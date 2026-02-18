import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { User, Lock, Save } from 'lucide-react';

export default function InstructorSettings() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [saved, setSaved] = useState(false);

  return (
    <DashboardLayout>
      <div className="mb-8"><h1 className="text-2xl font-bold text-white">Settings</h1></div>
      <div className="max-w-2xl space-y-6">
        <div className="card p-6">
          <div className="flex items-center gap-2.5 mb-5"><User size={18} className="text-indigo-400" /><h2 className="text-white font-semibold">Instructor Profile</h2></div>
          <div className="space-y-4">
            <div><label className="block text-slate-300 text-sm font-medium mb-2">Full Name</label><input value={name} onChange={e => setName(e.target.value)} className="input-field" /></div>
            <div><label className="block text-slate-300 text-sm font-medium mb-2">Email</label><input value={user?.email || ''} disabled className="input-field opacity-50" /></div>
            <div><label className="block text-slate-300 text-sm font-medium mb-2">Professional Bio</label><textarea value={bio} onChange={e => setBio(e.target.value)} rows={4} className="input-field resize-none" placeholder="Your background and expertise..." /></div>
            <div><label className="block text-slate-300 text-sm font-medium mb-2">Expertise (comma-separated)</label><input className="input-field" placeholder="React, Node.js, AWS..." /></div>
          </div>
          <button onClick={() => { updateUser({ name, bio }); setSaved(true); setTimeout(() => setSaved(false), 2000); }}
            className={`btn-primary mt-5 flex items-center gap-2 ${saved ? 'bg-emerald-600 hover:bg-emerald-600' : ''}`}>
            <Save size={15} /> {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-2.5 mb-5"><Lock size={18} className="text-indigo-400" /><h2 className="text-white font-semibold">Change Password</h2></div>
          <div className="space-y-4">
            <div><label className="block text-slate-300 text-sm font-medium mb-2">Current Password</label><input type="password" placeholder="••••••••" className="input-field" /></div>
            <div><label className="block text-slate-300 text-sm font-medium mb-2">New Password</label><input type="password" className="input-field" /></div>
            <div><label className="block text-slate-300 text-sm font-medium mb-2">Confirm New Password</label><input type="password" className="input-field" /></div>
          </div>
          <button className="btn-secondary mt-5 text-sm">Update Password</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
