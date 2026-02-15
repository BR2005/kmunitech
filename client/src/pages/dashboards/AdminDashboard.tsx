import StaffDashboard from './StaffDashboard';
import { Shield } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import api from '../../lib/api';

type AdminUser = {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'staff' | 'student';
    createdAt?: string;
};

export default function AdminDashboard() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [usersError, setUsersError] = useState<string>('');

    const [resetUserId, setResetUserId] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [resetSaving, setResetSaving] = useState(false);
    const [resetError, setResetError] = useState<string>('');
    const [resetSuccess, setResetSuccess] = useState<string>('');

    useEffect(() => {
        const load = async () => {
            setLoadingUsers(true);
            setUsersError('');
            try {
                const res = await api.get('/admin/users');
                setUsers(res.data);
            } catch (err: any) {
                setUsersError(err.response?.data?.message || 'Failed to load users');
            } finally {
                setLoadingUsers(false);
            }
        };
        load();
    }, []);

    const startReset = (userId: string) => {
        setResetUserId(userId);
        setNewPassword('');
        setResetError('');
        setResetSuccess('');
    };

    const cancelReset = () => {
        setResetUserId('');
        setNewPassword('');
        setResetError('');
        setResetSuccess('');
        setResetSaving(false);
    };

    const submitReset = async () => {
        setResetSaving(true);
        setResetError('');
        setResetSuccess('');
        try {
            await api.patch(`/admin/users/${resetUserId}/password`, { password: newPassword });
            setResetSuccess('Password updated');
            setNewPassword('');
            setResetUserId('');
        } catch (err: any) {
            setResetError(err.response?.data?.message || 'Failed to reset password');
        } finally {
            setResetSaving(false);
        }
    };

    const instructors = useMemo(() => users.filter((u) => u.role === 'staff'), [users]);
    const students = useMemo(() => users.filter((u) => u.role === 'student'), [users]);

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Admin Banner */}
            <div className="glass-card rounded-2xl p-5 flex items-center gap-4 border-primary-500/20 animate-fade-in-up">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-500/20">
                    <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                    <p className="text-white font-semibold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Administrator Access</p>
                    <p className="text-dark-400 text-xs mt-0.5">Full platform control — manage users, courses, and system settings</p>
                </div>
            </div>

            {/* Users */}
            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5">
                    <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>Users</h2>
                    <p className="text-dark-500 text-sm mt-1">Passwords are stored securely (hashed) and cannot be viewed.</p>
                </div>

                {usersError && (
                    <div className="px-6 py-4 text-sm text-crimson-100 bg-crimson-500/10 border-b border-crimson-500/20">
                        {usersError}
                    </div>
                )}

                <div className="p-6 space-y-6">
                    {(resetError || resetSuccess) && (
                        <div className={`px-4 py-3 rounded-xl text-sm border ${resetError
                            ? 'bg-crimson-500/10 text-crimson-100 border-crimson-500/20'
                            : 'bg-emerald-500/10 text-emerald-100 border-emerald-500/20'
                            }`}>
                            {resetError || resetSuccess}
                        </div>
                    )}

                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white font-semibold">Instructors</h3>
                            <span className="text-xs text-dark-500">{loadingUsers ? '—' : instructors.length} total</span>
                        </div>
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-white/5">
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-dark-400 uppercase tracking-wider">Name</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-dark-400 uppercase tracking-wider">Email</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-dark-400 uppercase tracking-wider">Role</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-dark-400 uppercase tracking-wider">Created</th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-dark-400 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {loadingUsers ? (
                                        <tr><td colSpan={4} className="px-4 py-6"><div className="glass-light rounded-xl h-10 animate-shimmer" /></td></tr>
                                    ) : instructors.length === 0 ? (
                                        <tr><td colSpan={4} className="px-4 py-6 text-sm text-dark-500">No instructors found</td></tr>
                                    ) : (
                                        instructors.map((u) => (
                                            <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="px-4 py-3 text-sm text-white font-medium">
                                                    {u.name}
                                                    {resetUserId === u.id && (
                                                        <div className="mt-2 flex flex-col sm:flex-row gap-2">
                                                            <input
                                                                type="password"
                                                                value={newPassword}
                                                                onChange={(e) => setNewPassword(e.target.value)}
                                                                className="input-modern !h-10 !py-2 !pl-3 !text-sm"
                                                                placeholder="New password (min 6 chars)"
                                                            />
                                                            <div className="flex gap-2">
                                                                <button
                                                                    type="button"
                                                                    disabled={resetSaving || newPassword.trim().length < 6}
                                                                    onClick={submitReset}
                                                                    className="btn-primary !py-2 !px-4 text-sm disabled:opacity-60"
                                                                >
                                                                    {resetSaving ? 'Saving...' : 'Save'}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    disabled={resetSaving}
                                                                    onClick={cancelReset}
                                                                    className="btn-ghost !py-2 !px-4 text-sm disabled:opacity-60"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-dark-300">{u.email}</td>
                                                <td className="px-4 py-3 text-sm text-dark-300 capitalize">{u.role}</td>
                                                <td className="px-4 py-3 text-sm text-dark-400">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() => startReset(u.id)}
                                                        className="btn-ghost text-sm !py-2"
                                                    >
                                                        Reset password
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white font-semibold">Students</h3>
                            <span className="text-xs text-dark-500">{loadingUsers ? '—' : students.length} total</span>
                        </div>
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-white/5">
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-dark-400 uppercase tracking-wider">Name</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-dark-400 uppercase tracking-wider">Email</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-dark-400 uppercase tracking-wider">Role</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-dark-400 uppercase tracking-wider">Created</th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-dark-400 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {loadingUsers ? (
                                        <tr><td colSpan={4} className="px-4 py-6"><div className="glass-light rounded-xl h-10 animate-shimmer" /></td></tr>
                                    ) : students.length === 0 ? (
                                        <tr><td colSpan={4} className="px-4 py-6 text-sm text-dark-500">No students found</td></tr>
                                    ) : (
                                        students.map((u) => (
                                            <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="px-4 py-3 text-sm text-white font-medium">
                                                    {u.name}
                                                    {resetUserId === u.id && (
                                                        <div className="mt-2 flex flex-col sm:flex-row gap-2">
                                                            <input
                                                                type="password"
                                                                value={newPassword}
                                                                onChange={(e) => setNewPassword(e.target.value)}
                                                                className="input-modern !h-10 !py-2 !pl-3 !text-sm"
                                                                placeholder="New password (min 6 chars)"
                                                            />
                                                            <div className="flex gap-2">
                                                                <button
                                                                    type="button"
                                                                    disabled={resetSaving || newPassword.trim().length < 6}
                                                                    onClick={submitReset}
                                                                    className="btn-primary !py-2 !px-4 text-sm disabled:opacity-60"
                                                                >
                                                                    {resetSaving ? 'Saving...' : 'Save'}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    disabled={resetSaving}
                                                                    onClick={cancelReset}
                                                                    className="btn-ghost !py-2 !px-4 text-sm disabled:opacity-60"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-dark-300">{u.email}</td>
                                                <td className="px-4 py-3 text-sm text-dark-300 capitalize">{u.role}</td>
                                                <td className="px-4 py-3 text-sm text-dark-400">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() => startReset(u.id)}
                                                        className="btn-ghost text-sm !py-2"
                                                    >
                                                        Reset password
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <StaffDashboard />
        </div>
    );
}
