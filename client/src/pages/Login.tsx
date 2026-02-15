import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../lib/api';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/login', { email, password });
            login(res.data.access_token, res.data.user);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050816] text-slate-100 relative">
            <div className="orb cyan -left-24 -top-10" />
            <div className="orb violet right-0 -bottom-10" />
            <Navbar />

            <div className="flex items-center justify-center px-4 py-16 min-h-[calc(100vh-4rem)] relative z-10">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Welcome back</h1>
                        <p className="text-slate-300">Sign in and pick up where you left off.</p>
                    </div>

                    <div className="glass-card rounded-2xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-crimson-500/10 text-crimson-100 p-4 rounded-xl text-sm border border-crimson-500/30">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-slate-200 mb-2">Email address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30 outline-none transition-all bg-white/5 text-slate-100 placeholder:text-slate-500"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-200 mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30 outline-none transition-all bg-white/5 text-slate-100 placeholder:text-slate-500"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full !py-3 !rounded-xl flex items-center justify-center gap-2 disabled:opacity-60"
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                                {!loading && <ArrowRight className="h-5 w-5" />}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-slate-400 text-sm">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-gold-300 hover:text-gold-200 font-semibold">
                                    Create one now
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
