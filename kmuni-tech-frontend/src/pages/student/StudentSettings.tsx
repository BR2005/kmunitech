import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { User, Lock, Bell, Save } from 'lucide-react';

export default function StudentSettings() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateUser({ name, bio });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-1">Manage your account preferences</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Profile */}
        <div className="card p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <User size={18} className="text-indigo-400" />
            <h2 className="text-white font-semibold">Profile Information</h2>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
              {user?.name.charAt(0)}
            </div>
            <button className="btn-secondary text-sm py-2">Change Photo</button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
              <input type="email" value={user?.email || ''} disabled className="input-field opacity-50 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Bio</label>
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} placeholder="Tell us about yourself..." className="input-field resize-none" />
            </div>
          </div>
          <button onClick={handleSave} className={`btn-primary mt-5 flex items-center gap-2 ${saved ? 'bg-emerald-600 hover:bg-emerald-600' : ''}`}>
            <Save size={15} /> {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        {/* Password */}
        <div className="card p-6">
          <div className="flex items-center gap-2.5 mb-5"><Lock size={18} className="text-indigo-400" /><h2 className="text-white font-semibold">Change Password</h2></div>
          <div className="space-y-4">
            <div><label className="block text-slate-300 text-sm font-medium mb-2">Current Password</label><input type="password" placeholder="••••••••" className="input-field" /></div>
            <div><label className="block text-slate-300 text-sm font-medium mb-2">New Password</label><input type="password" placeholder="Min 8 characters" className="input-field" /></div>
            <div><label className="block text-slate-300 text-sm font-medium mb-2">Confirm New Password</label><input type="password" placeholder="Repeat new password" className="input-field" /></div>
          </div>
          <button className="btn-secondary mt-5 text-sm">Update Password</button>
        </div>

        {/* Notifications */}
        <div className="card p-6">
          <div className="flex items-center gap-2.5 mb-5"><Bell size={18} className="text-indigo-400" /><h2 className="text-white font-semibold">Notifications</h2></div>
          <div className="space-y-4">
            {['Course updates and new content', 'New course recommendations', 'Weekly progress reports', 'Certificate achievements'].map(item => (
              <div key={item} className="flex items-center justify-between py-2">
                <span className="text-slate-300 text-sm">{item}</span>
                <button className="w-10 h-5 bg-indigo-600 rounded-full relative transition-all">
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
