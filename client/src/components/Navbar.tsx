import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Menu, X, GraduationCap } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const linkBase = 'text-sm font-semibold tracking-tight transition-all duration-200';

    return (
        <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#050816]/80 backdrop-blur-2xl">
            <div className="container-center">
                <div className="flex items-center justify-between h-16 gap-4">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-gold-400 via-teal-500 to-gold-600 flex items-center justify-center shadow-lg shadow-cyan-400/20 group-hover:scale-105 transition-transform">
                            <GraduationCap className="h-5 w-5 text-slate-950" />
                        </div>
                        <div className="leading-tight">
                            <p className="text-[11px] uppercase tracking-[0.32em] text-slate-400">KM EdTech</p>
                            <p className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>UniTech Learning</p>
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-7">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `${linkBase} ${isActive ? 'text-white underline decoration-2 decoration-gold-400' : 'text-slate-300 hover:text-white hover:decoration-gold-400 underline-offset-8'}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/courses"
                            className={({ isActive }) =>
                                `${linkBase} ${isActive ? 'text-white underline decoration-2 decoration-gold-400' : 'text-slate-300 hover:text-white hover:decoration-gold-400 underline-offset-8'}`
                            }
                        >
                            Courses
                        </NavLink>
                        {user && (
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    `${linkBase} px-3 py-1.5 rounded-xl border ${isActive
                                        ? 'border-gold-500/80 bg-gold-500/10 text-white'
                                        : 'border-white/10 text-slate-200 hover:border-gold-400/50 hover:text-white'}`
                                }
                            >
                                Dashboard
                            </NavLink>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-3">
                            {user ? (
                                <>
                                    <div className="flex items-center gap-3 px-2 py-1 rounded-xl bg-white/5 border border-white/10">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-gold-500 flex items-center justify-center text-slate-950 text-sm font-bold shadow-lg shadow-cyan-500/20">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-sm"
                                        >
                                            <LogOut className="h-4 w-4" /> Logout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="btn-ghost text-sm px-4 py-2">Sign in</Link>
                                    <Link to="/register" className="btn-primary !px-6 !py-2.5 !rounded-xl text-sm">Start free</Link>
                                </>
                            )}
                        </div>

                        <button
                            className="md:hidden p-2 rounded-lg text-slate-200 hover:bg-white/5 border border-white/10 transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {mobileOpen && (
                    <div className="md:hidden pb-4 border-t border-white/5">
                        <div className="flex flex-col gap-2 pt-4">
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    `px-4 py-3 rounded-xl font-semibold ${isActive ? 'bg-white/10 text-white' : 'text-slate-200 hover:bg-white/5'}`
                                }
                                onClick={() => setMobileOpen(false)}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/courses"
                                className={({ isActive }) =>
                                    `px-4 py-3 rounded-xl font-semibold ${isActive ? 'bg-white/10 text-white' : 'text-slate-200 hover:bg-white/5'}`
                                }
                                onClick={() => setMobileOpen(false)}
                            >
                                Courses
                            </NavLink>
                            {user ? (
                                <>
                                    <NavLink
                                        to="/dashboard"
                                        className={({ isActive }) =>
                                            `px-4 py-3 rounded-xl font-semibold ${isActive ? 'bg-white/10 text-white' : 'text-slate-200 hover:bg-white/5'}`
                                        }
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        Dashboard
                                    </NavLink>
                                    <button
                                        onClick={() => { handleLogout(); setMobileOpen(false); }}
                                        className="px-4 py-3 rounded-xl font-semibold text-slate-200 hover:bg-white/5 text-left flex items-center gap-2"
                                    >
                                        <LogOut className="h-4 w-4" /> Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-4 py-3 rounded-xl font-semibold text-slate-200 hover:bg-white/5"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="btn-primary !rounded-xl mx-4"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        Start free
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
