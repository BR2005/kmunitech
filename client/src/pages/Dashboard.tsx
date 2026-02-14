import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import StudentDashboard from './dashboards/StudentDashboard';
import StaffDashboard from './dashboards/StaffDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import { BookOpen, TrendingUp, Clock } from 'lucide-react';

export default function Dashboard() {
    const { user } = useAuth();

    const renderDashboard = () => {
        switch (user?.role) {
            case 'student':
                return <StudentDashboard />;
            case 'staff':
                return <StaffDashboard />;
            case 'admin':
                return <AdminDashboard />;
            default:
                return <div className="text-dark-400">Unknown role</div>;
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="min-h-screen bg-dark-950 relative overflow-hidden">
            <Navbar />
            
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 relative z-10">
                {/* Welcome Header */}
                <div className="mb-8 animate-fade-in-up">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                        <div>
                            <p className="text-dark-500 text-sm font-medium mb-1 uppercase tracking-wide">{getGreeting()}</p>
                            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-baseline gap-3" style={{ fontFamily: 'var(--font-heading)' }}>
                                {user?.name}
                                <span className="text-dark-500 font-normal text-lg capitalize px-3 py-1 rounded-full bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20">
                                    {user?.role}
                                </span>
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="glass-light rounded-xl px-5 py-3 flex items-center gap-3 shadow-lg shadow-black/5">
                                <Clock className="h-5 w-5 text-primary-400" />
                                <span className="text-sm text-dark-200 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { icon: BookOpen, label: 'Active Courses', value: '—', color: 'from-primary-500 to-primary-700' },
                            { icon: TrendingUp, label: 'Your Progress', value: '—', color: 'from-emerald-400 to-emerald-500' },
                            { icon: Clock, label: 'Hours Learned', value: '—', color: 'from-accent-400 to-accent-500' },
                        ].map((stat, idx) => (
                            <div key={idx} className={`glass-light rounded-2xl p-6 flex items-center gap-4 group hover:bg-white/[0.06] transition-all cursor-default stagger-${idx + 1} animate-fade-in-up`}>
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-dark-400 text-xs font-semibold uppercase tracking-wider mb-1">{stat.label}</p>
                                    <p className="text-white text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/5">
                    {renderDashboard()}
                </div>
            </div>
        </div>
    );
}
