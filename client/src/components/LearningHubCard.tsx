import { Award, BookOpen, GraduationCap, MonitorPlay, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

type LearningHubCardProps = {
    className?: string;
};

export default function LearningHubCard({ className = '' }: LearningHubCardProps) {
    return (
        <div className={`glass-card gradient-border w-full rounded-3xl p-8 sm:p-9 shadow-2xl shadow-black/30 relative overflow-hidden ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10 pointer-events-none" />
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gold-400/10 blur-3xl" />
            <div className="absolute -bottom-8 -right-6 w-44 h-44 rounded-full bg-teal-500/10 blur-3xl" />

            <div className="relative flex items-start justify-between gap-4 mb-6">
                <div className="space-y-1">
                    <div className="pill-soft text-[11px] uppercase tracking-[0.25em] text-slate-200">Your learning hub</div>
                    <h3
                        className="text-2xl sm:text-3xl font-bold text-white leading-tight"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Learn faster with structure
                    </h3>
                    <p className="text-sm text-slate-300">Daily rhythm, mentor nudges, and the next thing to ship.</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400 to-teal-500 border border-white/15 flex items-center justify-center shadow-lg shadow-cyan-400/20">
                    <GraduationCap className="h-6 w-6 text-slate-950" />
                </div>
            </div>

            {/* Progress / Next lesson */}
            <div className="relative rounded-2xl bg-white/5 border border-white/10 p-5 mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400/10 via-transparent to-teal-500/10 pointer-events-none" />
                <div className="flex items-center justify-between gap-4 relative">
                    <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Today’s plan</p>
                        <p className="text-white font-semibold mt-1 leading-snug line-clamp-1">Finish Modules 3-4 • Quiz 2</p>
                    </div>
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                        <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-gold-400/15 border border-gold-400/30 text-gold-50">Streak 5</span>
                        <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-100">+12% pace</span>
                    </div>
                </div>

                <div className="mt-4 space-y-3 relative">
                    <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                            <span>Weekly progress</span>
                            <span className="text-gold-50">68%</span>
                        </div>
                        <div className="mt-2 h-2.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-gold-400 via-teal-500 to-gold-500" />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-xs text-slate-200">
                        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                            <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400">Focus</p>
                            <p className="font-semibold">React + API</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                            <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400">Next live</p>
                            <div className="flex items-center gap-1.5 font-semibold">
                                <MonitorPlay className="h-3.5 w-3.5 text-gold-300" /> 7:00 PM
                            </div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                            <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400">Time left</p>
                            <p className="font-semibold">1h 20m</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative space-y-3.5">
                {[
                    {
                        icon: BookOpen,
                        title: 'Guided course paths',
                        desc: 'Clear modules, build checks, and portfolio-grade projects.',
                    },
                    {
                        icon: Users,
                        title: 'Community + mentors',
                        desc: 'Live help, async reviews, and weekly office hours.',
                    },
                    {
                        icon: Award,
                        title: 'Certificates that matter',
                        desc: 'Shareable proof backed by shipped work and assessments.',
                    },
                ].map((item) => (
                    <div
                        key={item.title}
                        className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 hover:border-gold-400/40 transition-all"
                    >
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-400/25 to-teal-500/25 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-400/10">
                            <item.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-white font-semibold leading-snug text-base">{item.title}</p>
                            <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative mt-7 flex flex-col sm:flex-row gap-3">
                <Link to="/courses" className="btn-ghost !py-3.5 !rounded-2xl flex-1 text-center">
                    Browse courses
                </Link>
                <Link to="/register" className="btn-primary !py-3.5 !rounded-2xl flex-1 text-center">
                    <span>Get started</span>
                </Link>
            </div>
        </div>
    );
}
