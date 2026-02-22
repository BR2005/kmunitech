import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Menu, X, ChevronDown, LogOut, Settings, LayoutDashboard, User } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = () => { logout(); navigate('/'); };

  const getDashboardPath = () => {
    if (!user) return '/';
    const map = { student: '/student/dashboard', instructor: '/instructor/dashboard', admin: '/admin/dashboard' };
    return map[user.role] || '/';
  };

  const getRoleColor = () => {
    const colors = { student: 'text-emerald-400', instructor: 'text-blue-400', admin: 'text-orange-400' };
    return user ? colors[user.role] : '';
  };

  const logoSrc = `${import.meta.env.BASE_URL}kmunitech-logo.jpeg`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${(isScrolled || mobileOpen) ? 'bg-[#0d0f1a]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all">
              <img src={logoSrc} alt="KMUniTech logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-white font-bold text-lg">KMUni</span>
              <span className="text-indigo-400 font-bold text-lg">Tech</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className="text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all text-sm font-medium">
              Home
            </Link>
            <Link to="/courses" className="text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all text-sm font-medium">
              Courses
            </Link>
            <Link to="/unilink" className="text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all text-sm font-medium">
              Unilink
            </Link>
            <Link to="/self-learn" className="text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all text-sm font-medium">
              Self Learn
            </Link>
            <Link to="/about" className="text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all text-sm font-medium">
              About
            </Link>
            <Link to="/collaborations" className="text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all text-sm font-medium">
              Collaborations
            </Link>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-medium leading-none">{user.name.split(' ')[0]}</p>
                    <p className={`text-xs capitalize mt-0.5 ${getRoleColor()}`}>{user.role}</p>
                  </div>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#12141f] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-fade-in">
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-white font-semibold text-sm">{user.name}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <button onClick={() => { navigate(getDashboardPath()); setDropdownOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 text-sm transition-all">
                        <LayoutDashboard size={15} /> Dashboard
                      </button>
                      <button onClick={() => { navigate(`/${user.role}/settings`); setDropdownOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 text-sm transition-all">
                        <Settings size={15} /> Settings
                      </button>
                    </div>
                    <div className="p-2 border-t border-white/5">
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm transition-all">
                        <LogOut size={15} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-slate-300 hover:text-white px-4 py-2 text-sm font-medium transition-colors">
                  Log in
                </Link>
                <Link to="/signup" className="btn-primary text-sm py-2.5">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white p-2 rounded-lg hover:bg-white/5">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0d0f1a]/98 border-t border-white/5 px-4 py-4 space-y-2 animate-slide-up">
          <Link to="/" className="block px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all">Home</Link>
          <Link to="/courses" className="block px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all">Courses</Link>
          <Link to="/unilink" className="block px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all">Unilink</Link>
          <Link to="/self-learn" className="block px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all">Self Learn</Link>
          <Link to="/about" className="block px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all">About</Link>
          <Link to="/collaborations" className="block px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all">Collaborations</Link>
          {isAuthenticated && user ? (
            <>
              <div className="border-t border-white/5 pt-2 mt-2" />
              <button onClick={() => navigate(getDashboardPath())} className="w-full text-left flex items-center gap-2.5 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                <LayoutDashboard size={16} /> Dashboard
              </button>
              <button onClick={handleLogout} className="w-full text-left flex items-center gap-2.5 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <Link to="/login" className="btn-secondary text-center text-sm py-2.5">Log in</Link>
              <Link to="/signup" className="btn-primary text-center text-sm py-2.5">Get Started</Link>
            </div>
          )}
        </div>
      )}

      {/* Dropdown overlay */}
      {dropdownOpen && <div className="fixed inset-0 z-[-1]" onClick={() => setDropdownOpen(false)} />}
    </nav>
  );
}
