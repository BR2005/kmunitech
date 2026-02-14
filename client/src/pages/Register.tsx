import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:3000/auth/register', { name, email, password, role });
            login(res.data.access_token, res.data.user);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const roles = [
        { value: 'student', label: 'Student', desc: 'Learn from expert courses' },
        { value: 'staff', label: 'Instructor', desc: 'Create and manage courses' },
        { value: 'admin', label: 'Admin', desc: 'Full platform control' },
    ];

    return (
        <div className="min-h-screen bg-[#050816] text-slate-100 relative">
            <div className="orb cyan -left-24 -top-16" />
            <div className="orb violet right-0 top-10" />
            <Navbar />

            <div className="flex items-center justify-center px-4 py-16 min-h-[calc(100vh-4rem)] relative z-10">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Join KM UniTech</h1>
                        <p className="text-slate-300">Start your next chapter with a cohort that ships.</p>
                    </div>

                    <div className="glass-card rounded-2xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-crimson-500/10 text-crimson-100 p-4 rounded-xl text-sm border border-crimson-500/30">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-slate-200 mb-2">Full name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30 outline-none transition-all bg-white/5 text-slate-100 placeholder:text-slate-500"
                                        placeholder="Alex Doe"
                                        required
                                    />
                                </div>
                            </div>

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

                            <div>
                                <label className="block text-sm font-medium text-slate-200 mb-3">I am a</label>
                                <div className="space-y-2">
                                    {roles.map((r) => (
                                        <label
                                            key={r.value}
                                            className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all hover:bg-white/5 ${role === r.value
                                                ? 'border-gold-400 bg-gold-400/10'
                                                : 'border-white/10 hover:border-white/20'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="role"
                                                value={r.value}
                                                checked={role === r.value}
                                                onChange={(e) => setRole(e.target.value)}
                                                className="w-4 h-4 mt-1 text-gold-500 focus:ring-gold-400 bg-transparent border-white/30"
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium text-white text-base">{r.label}</div>
                                                <div className="text-sm text-slate-400 mt-0.5">{r.desc}</div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full !py-3 !rounded-xl flex items-center justify-center gap-2 disabled:opacity-60"
                            >
                                {loading ? 'Creating account...' : 'Create account'}
                                {!loading && <ArrowRight className="h-5 w-5" />}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-slate-400 text-sm">
                                Already have an account?{' '}
                                <Link to="/login" className="text-gold-300 hover:text-gold-200 font-semibold">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
