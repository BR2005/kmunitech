import React, { useState, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  BookOpen, LayoutDashboard, GraduationCap, Settings, LogOut,
  Menu, X, Bell, ChevronRight, Users, PlusCircle, BarChart3,
  ShieldCheck, BookMarked, Award, Home
} from 'lucide-react';

interface NavItem { label: string; icon: React.ElementType; path: string; }

const studentNav: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
  { label: 'My Courses', icon: BookMarked, path: '/student/courses' },
  { label: 'Browse Courses', icon: GraduationCap, path: '/courses' },
  { label: 'Certificates', icon: Award, path: '/student/certificates' },
  { label: 'Settings', icon: Settings, path: '/student/settings' },
];

const instructorNav: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/instructor/dashboard' },
  { label: 'My Courses', icon: BookMarked, path: '/instructor/courses' },
  { label: 'Create Course', icon: PlusCircle, path: '/instructor/create-course' },
  { label: 'Analytics', icon: BarChart3, path: '/instructor/analytics' },
  { label: 'Settings', icon: Settings, path: '/instructor/settings' },
];

const adminNav: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { label: 'Users', icon: Users, path: '/admin/users' },
  { label: 'Courses', icon: BookOpen, path: '/admin/courses' },
  { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
  { label: 'Security', icon: ShieldCheck, path: '/admin/security' },
  { label: 'Settings', icon: Settings, path: '/admin/settings' },
];

interface Props { children: ReactNode; }

export default function DashboardLayout({ children }: Props) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  const navItems = user.role === 'student' ? studentNav : user.role === 'instructor' ? instructorNav : adminNav;

  const roleColors = {
    student: { bg: 'from-emerald-500 to-teal-500', badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20', label: 'Student' },
    instructor: { bg: 'from-blue-500 to-indigo-500', badge: 'bg-blue-500/15 text-blue-400 border-blue-500/20', label: 'Instructor' },
    admin: { bg: 'from-orange-500 to-red-500', badge: 'bg-orange-500/15 text-orange-400 border-orange-500/20', label: 'Admin' },
  };
  const rc = roleColors[user.role];

  const handleLogout = () => { logout(); navigate('/'); };

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? '' : ''}`}>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen size={15} className="text-white" />
          </div>
          <span className="text-white font-bold">KMUni<span className="text-indigo-400"> Tech</span></span>
        </Link>
      </div>

      {/* User Card */}
      <div className="px-4 py-4 border-b border-white/5">
        <div className="flex items-center gap-3 p-3 bg-white/3 rounded-xl">
          <div className={`w-10 h-10 bg-gradient-to-br ${rc.bg} rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm truncate">{user.name}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${rc.badge}`}>{rc.label}</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}
              onClick={() => mobile && setSidebarOpen(false)}
              className={active ? 'sidebar-item-active' : 'sidebar-item'}>
              <item.icon size={17} />
              <span className="text-sm">{item.label}</span>
              {active && <ChevronRight size={13} className="ml-auto text-indigo-400" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/5 space-y-1">
        <Link to="/" className="sidebar-item">
          <Home size={17} /> <span className="text-sm">Back to Home</span>
        </Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/8 transition-all">
          <LogOut size={17} /> <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#0d0f1a] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-[#0f1120] border-r border-white/5 flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed left-0 top-0 bottom-0 w-60 bg-[#0f1120] border-r border-white/5 z-50 md:hidden flex flex-col">
            <Sidebar mobile />
          </aside>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 bg-[#0f1120]/80 border-b border-white/5 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 flex-shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5">
            <Menu size={20} />
          </button>

          <div className="hidden md:block">
            <h2 className="text-white font-semibold text-sm">
              {navItems.find(n => n.path === location.pathname)?.label || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
            </button>
            <div className={`w-8 h-8 bg-gradient-to-br ${rc.bg} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
