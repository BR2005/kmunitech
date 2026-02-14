import Navbar from '../components/Navbar';
import {
    ArrowRight,
    BarChart3,
    Brain,
    CheckCircle2,
    Globe2,
    Layers,
    MonitorPlay,
    Rocket,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const pillars = [
    {
        icon: Brain,
        title: 'AI-first curriculum',
        desc: 'Stay ahead with projects built around real tools: LLM apps, data pipelines, deployment, and automation.',
        tag: 'Updated weekly',
    },
    {
        icon: MonitorPlay,
        title: 'Live + on-demand',
        desc: 'Blend live sprints, mentor hours, and async video so you never fall behind your cohort.',
        tag: 'Hybrid learning',
    },
    {
        icon: ShieldCheck,
        title: 'Career outcomes',
        desc: 'Portfolio-grade case studies, interview prep, and referrals directly from hiring partners.',
        tag: 'Placement-ready',
    },
];

const tracks = [
    {
        title: 'Full-Stack Launchpad',
        badge: '12-week intensive',
        color: 'from-gold-500/30 to-teal-500/30',
        points: ['React, Next.js, and API engineering', 'TypeScript-first practices', 'Cloud deployments with CI/CD', 'System design drills'],
    },
    {
        title: 'Data & AI Studio',
        badge: '10-week applied',
        color: 'from-teal-500/30 to-gold-500/30',
        points: ['Python + notebooks to production', 'ML fundamentals with real datasets', 'LLM workflows and retrieval', 'Dashboards that tell a story'],
    },
    {
        title: 'Product Design Systems',
        badge: '8-week creator',
        color: 'from-crimson-500/30 to-teal-500/30',
        points: ['Design ops and tokens', 'Interactive prototyping in Figma', 'Research to confident decision-making', 'Portfolio polish for hiring managers'],
    },
];

const outcomes = [
    'Instructor feedback in under 24 hours',
    'Career office hours twice weekly',
    'Showcase nights with hiring managers',
    'Dedicated success coach for every cohort',
];

export default function Home() {
    return (
        <div className="min-h-screen bg-[#050816] text-slate-100 relative overflow-hidden">
            <div className="orb cyan -left-20 -top-10" />
            <div className="orb violet right-0 top-10" />
            <div className="orb pink -right-10 bottom-0" />
            <Navbar />

            <main className="relative z-10">
                {/* Hero */}
                <section className="container-center pt-16 md:pt-24 pb-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="pill-soft w-fit">
                                <Sparkles className="h-4 w-4 text-gold-400" />
                                <span className="text-xs uppercase tracking-[0.25em] text-slate-200">Future-ready learning</span>
                            </div>
                            <h1 className="text-responsive-xl font-bold leading-tight text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                                Build the skills to lead the AI-powered workplace.
                            </h1>
                            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                                KM UniTech is a modern edtech platform for builders, analysts, and designers. Learn through production-grade projects, not theory slides.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <Link to="/register" className="btn-primary !px-8 !py-3.5 !rounded-xl">
                                    <span className="flex items-center gap-2">
                                        Start free
                                        <ArrowRight className="h-5 w-5" />
                                    </span>
                                </Link>
                                <Link to="/courses" className="btn-ghost !px-8 !py-3.5 !rounded-xl">
                                    View catalog
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                                {[
                                    { label: 'Learners placed', value: '12,400+' },
                                    { label: 'Hiring partners', value: '180+' },
                                    { label: 'Avg. salary uplift', value: '32%' },
                                ].map((item, idx) => (
                                    <div key={idx} className="glass-light rounded-2xl p-4 border border-white/10">
                                        <p className="text-sm text-slate-400">{item.label}</p>
                                        <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="glass-card rounded-3xl p-6 md:p-8 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-teal-500/5 pointer-events-none" />
                                <div className="flex items-center justify-between mb-6 relative">
                                    <div>
                                        <p className="text-sm text-slate-400">Live cohort</p>
                                        <p className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>AI Product Sprint</p>
                                    </div>
                                    <span className="badge-soft">Happening now</span>
                                </div>

                                <div className="space-y-4 relative">
                                    {[{ title: 'Ship an LLM-powered feature', progress: 72 }, { title: 'Data storytelling dashboard', progress: 48 }].map((item, idx) => (
                                        <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="font-semibold text-slate-100">{item.title}</p>
                                                <span className="text-sm text-slate-300">{item.progress}%</span>
                                            </div>
                                            <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                                                <div className="h-full rounded-full bg-gradient-to-r from-gold-400 via-teal-500 to-gold-600" style={{ width: `${item.progress}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-gold-500/10 via-white/5 to-teal-500/10 border border-white/10 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-300">Next live session</p>
                                        <p className="text-lg font-semibold text-white">Designing evaluation loops for AI features</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                                        <MonitorPlay className="h-6 w-6 text-gold-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trust row */}
                <section className="container-center pb-8">
                    <div className="glass-light rounded-2xl px-6 py-4 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-slate-300 text-sm">
                            <Globe2 className="h-4 w-4 text-gold-400" />
                            Trusted by teams in 22 countries
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.15em] text-slate-400">
                            <span className="pill-soft">Cloud Native</span>
                            <span className="pill-soft">AI & Data</span>
                            <span className="pill-soft">Product Design</span>
                            <span className="pill-soft">Career Studio</span>
                        </div>
                    </div>
                </section>

                {/* Pillars */}
                <section className="section-spacing container-center">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <p className="badge-soft mx-auto w-fit mb-4">How we teach</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            The edtech stack built for ambitious technologists.
                        </h2>
                        <p className="text-slate-300">
                            Structured learning paths, career-grade mentorship, and production-level tools—packaged into one platform.
                        </p>
                    </div>
                    <div className="grid-perfect max-w-6xl mx-auto">
                        {pillars.map((pillar, idx) => (
                            <div key={pillar.title} className={`glass-card rounded-2xl p-7 hover:-translate-y-2 transition-all stagger-${(idx % 6) + 1} animate-fade-in-up`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-400 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-400/20">
                                        <pillar.icon className="h-5 w-5 text-slate-950" />
                                    </div>
                                    <span className="text-xs uppercase tracking-[0.16em] text-slate-400">{pillar.tag}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {pillar.title}
                                </h3>
                                <p className="text-slate-300 leading-relaxed text-sm">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tracks */}
                <section className="container-center section-spacing">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                        <div className="space-y-3 max-w-2xl">
                            <p className="badge-soft w-fit">Cohort-based tracks</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                                Choose a path. Ship outcomes.
                            </h2>
                            <p className="text-slate-300">Each path blends labs, mentor code reviews, and hiring prep. Ship portfolio-ready work in weeks, not months.</p>
                        </div>
                        <Link to="/courses" className="btn-ghost">See all courses</Link>
                    </div>

                    <div className="grid-perfect">
                        {tracks.map((track) => (
                            <div key={track.title} className="glass-card rounded-3xl p-7 relative overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-60 pointer-events-none`} />
                                <div className="relative space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="badge-soft">{track.badge}</span>
                                        <Layers className="h-5 w-5 text-gold-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>{track.title}</h3>
                                    <div className="space-y-3">
                                        {track.points.map((point) => (
                                            <div key={point} className="flex items-start gap-2 text-slate-200">
                                                <CheckCircle2 className="h-5 w-5 text-gold-400 mt-0.5" />
                                                <span className="text-sm">{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link to="/courses" className="inline-flex items-center gap-2 text-slate-100 font-semibold hover:text-gold-200 transition-colors">
                                        Explore track <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Outcomes */}
                <section className="section-spacing container-center">
                    <div className="glass-card rounded-3xl p-8 lg:p-10 relative overflow-hidden">
                        <div className="grid-overlay" />
                        <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between relative z-10">
                            <div className="space-y-4 max-w-xl">
                                <p className="badge-soft w-fit">Career studio</p>
                                <h3 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                                    We built support around what employers actually check.
                                </h3>
                                <p className="text-slate-300">We remove the guesswork: every learner gets a structured outcomes plan, a coach, and time-boxed checkpoints.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:max-w-xl">
                                {outcomes.map((item) => (
                                    <div key={item} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                                        <BarChart3 className="h-5 w-5 text-gold-400 mt-0.5" />
                                        <span className="text-slate-100 text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="section-spacing container-center">
                    <div className="glass-card rounded-3xl p-10 text-center border border-white/10">
                        <p className="badge-soft mx-auto mb-4 w-fit">Ready to move?</p>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            Level up with KM UniTech.
                        </h3>
                        <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                            Join a community of engineers, analysts, and designers who learn by building and get hired by shipping.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link to="/register" className="btn-primary !px-10 !py-4 !rounded-xl">Enroll now</Link>
                            <Link to="/login" className="btn-ghost !px-10 !py-4 !rounded-xl">I already have an account</Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-white/5 bg-[#040714] py-8">
                <div className="container-center flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <Rocket className="h-5 w-5 text-slate-950" />
                        </div>
                        <div>
                            <p className="font-semibold text-slate-100" style={{ fontFamily: 'var(--font-heading)' }}>KM UniTech</p>
                            <p className="text-[11px] uppercase tracking-[0.2em]">Learn. Build. Deploy.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to="/" className="hover:text-gold-200 transition-colors">Home</Link>
                        <Link to="/courses" className="hover:text-gold-200 transition-colors">Courses</Link>
                        <Link to="/register" className="hover:text-gold-200 transition-colors">Enroll</Link>
                    </div>
                    <p className="text-xs text-slate-500">© 2026 KM UniTech. Built for the next wave of talent.</p>
                </div>
            </footer>
        </div>
    );
}
