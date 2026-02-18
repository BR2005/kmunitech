import React, { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Search, Key, Trash2, Edit3, UserPlus } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { User } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { adminDeleteUser, adminResetUserPassword, fetchAdminUsers } from '../../utils/api';

const roleColors: Record<string, string> = {
  student: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  instructor: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  admin: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
};

export default function AdminUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [search, setSearch] = useState('');
  const [resetModal, setResetModal] = useState<string | null>(null);
  const [newPwd, setNewPwd] = useState('');
  const [actionError, setActionError] = useState('');
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!token) {
        setIsLoading(false);
        setLoadError('Not authenticated');
        return;
      }
      try {
        setLoadError('');
        const data = await fetchAdminUsers(token);
        if (!mounted) return;
        setUsers(data);
      } catch (e: any) {
        if (!mounted) return;
        setLoadError(e?.message || 'Failed to load users');
      } finally {
        if (!mounted) return;
        setIsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [token]);

  const selectedUser = useMemo(() => users.find(u => u.id === resetModal) || null, [users, resetModal]);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const formatJoined = (iso: string) => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString();
  };

  const handleResetPassword = async () => {
    if (!token || !resetModal) return;
    if (!newPwd || newPwd.length < 6) {
      setActionError('Password must be at least 6 characters.');
      return;
    }

    try {
      setActionError('');
      setIsWorking(true);
      await adminResetUserPassword(resetModal, newPwd, token);
      setResetModal(null);
      setNewPwd('');
    } catch (e: any) {
      setActionError(e?.message || 'Failed to reset password');
    } finally {
      setIsWorking(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!token) return;
    try {
      setActionError('');
      setIsWorking(true);
      await adminDeleteUser(userId, token);
      setUsers(prev => prev.filter(u => u.id !== userId));
    } catch (e: any) {
      setActionError(e?.message || 'Failed to delete user');
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold text-white">User Management</h1><p className="text-slate-400 mt-1">Manage all platform users and their access</p></div>
        <button className="btn-primary flex items-center gap-2 text-sm"><UserPlus size={15} /> Add User</button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input type="text" placeholder="Search users by name or email..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {actionError && !resetModal && (
          <div className="px-5 py-3 border-b border-white/5 text-red-400 text-xs">
            {actionError}
          </div>
        )}
        {isLoading ? (
          <div className="p-8">
            <LoadingSpinner text="Loading users..." />
          </div>
        ) : loadError ? (
          <div className="p-8">
            <p className="text-slate-400 text-sm">{loadError}</p>
          </div>
        ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-5 py-4 text-slate-500 text-xs font-semibold uppercase tracking-wide">User</th>
              <th className="text-left px-5 py-4 text-slate-500 text-xs font-semibold uppercase tracking-wide hidden md:table-cell">Role</th>
              <th className="text-left px-5 py-4 text-slate-500 text-xs font-semibold uppercase tracking-wide hidden lg:table-cell">Joined</th>
              <th className="text-right px-5 py-4 text-slate-500 text-xs font-semibold uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/3">
            {filtered.map(user => (
              <tr key={user.id} className="hover:bg-white/2 transition-all">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div><p className="text-white text-sm font-medium">{user.name}</p><p className="text-slate-500 text-xs">{user.email}</p></div>
                  </div>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className={`badge ${roleColors[user.role]} capitalize text-xs`}>{user.role}</span>
                </td>
                <td className="px-5 py-4 text-slate-500 text-xs hidden lg:table-cell">{formatJoined(user.createdAt)}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => { setResetModal(user.id); setNewPwd(''); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/40 rounded-lg text-indigo-400 text-xs font-medium transition-all">
                      <Key size={12} /> Reset PWD
                    </button>
                    <button className="p-1.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"><Edit3 size={14} /></button>
                    <button
                      disabled={isWorking}
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    ><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>

      {/* Reset Password Modal */}
      {resetModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card p-6 w-full max-w-md animate-slide-up">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-orange-500/15 border border-orange-500/20 rounded-xl flex items-center justify-center"><Key size={18} className="text-orange-400" /></div>
              <div><h3 className="text-white font-bold">Reset Password</h3><p className="text-slate-500 text-sm">For {selectedUser?.name}</p></div>
            </div>
            <div className="mb-5">
              <label className="block text-slate-300 text-sm font-medium mb-2">New Password</label>
              <input type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="Enter new password" className="input-field" />
            </div>
            {actionError && <p className="text-red-400 text-xs mb-4">{actionError}</p>}
            <div className="flex gap-3">
              <button onClick={() => setResetModal(null)} className="flex-1 btn-secondary text-sm py-2.5">Cancel</button>
              <button
                disabled={isWorking}
                onClick={handleResetPassword}
                className="flex-1 btn-primary text-sm py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >Reset Password</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
