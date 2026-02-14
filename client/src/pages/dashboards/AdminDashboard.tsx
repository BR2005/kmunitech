import StaffDashboard from './StaffDashboard';
import { Shield } from 'lucide-react';

export default function AdminDashboard() {
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

            <StaffDashboard />
        </div>
    );
}
