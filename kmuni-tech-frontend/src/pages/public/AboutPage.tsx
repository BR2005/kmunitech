import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Link } from 'react-router-dom';
import { Award, Target, Users, Code, BookOpen, Heart, ArrowRight, Linkedin } from 'lucide-react';

const baseUrl = import.meta.env.BASE_URL;

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0d0f1a]">
            <Navbar />

            <main className="pt-24 pb-20">
                {/* ─── Hero Section ────────────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

                    <div className="text-center relative z-10">
                        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-8">
                            <span className="text-indigo-300 text-xs font-bold uppercase tracking-widest">Our Story & Mission</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
                            Empowering the Next Generation of <span className="gradient-text">Tech Leaders</span>
                        </h1>
                        <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
                            KMUniTech is a hybrid product- and service-based technology startup focused on IT education,
                            software upskilling, and digital solutions. We bridge the gap between academic education
                            and industry requirements.
                        </p>
                    </div>
                </section>

                {/* ─── Vision & Values ─────────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[#12141f] border border-white/5 p-8 rounded-[2rem] hover:border-indigo-500/30 transition-all">
                            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
                                <Target className="text-indigo-400" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Our Vision</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                To build a unified platform for learning, innovation, and impact across diverse technology domains.
                                "All Domains, One Destination – KMUniTech."
                            </p>
                        </div>

                        <div className="bg-[#12141f] border border-white/5 p-8 rounded-[2rem] hover:border-purple-500/30 transition-all">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                                <BookOpen className="text-purple-400" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Practical Learning</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                We deliver hands-on, practical training in UI/UX, Blockchain, SQL, and emerging technologies
                                through live webinars and structured internships.
                            </p>
                        </div>

                        <div className="bg-[#12141f] border border-white/5 p-8 rounded-[2rem] hover:border-emerald-500/30 transition-all">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                                <Heart className="text-emerald-400" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Social Impact</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Growth shouldn't just be about metrics. We donate a significant portion of our funds
                                to NGOs and food distribution for underprivileged communities.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ─── CEO & Founder Section ───────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                    <div className="bg-gradient-to-br from-[#1a1c2e] to-[#0d0f1a] border border-white/5 rounded-[3rem] overflow-hidden">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Image Column */}
                            <div className="relative aspect-square lg:aspect-auto lg:h-[600px] overflow-hidden">
                                <img
                                    src={`${baseUrl}assetskmuni/pradosh-km.png`}
                                    alt="Tharun Varshan U"
                                    className="w-full h-full object-cover object-top filter brightness-90 hover:brightness-100 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1a] via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-10 left-10">
                                    <p className="text-white font-bold text-3xl">Pradosh K.M</p>
                                    <p className="text-indigo-400 font-medium tracking-widest uppercase text-sm">Founder & CEO</p>
                                </div>
                            </div>

                            {/* Content Column */}
                            <div className="p-10 lg:p-20">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                                    Leading with <span className="gradient-text">Vision and Purpose</span>
                                </h2>
                                <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                                    <p>
                                        Tharun Varshan U, the Founder and CEO of KMUniTech, established the organization with a
                                        singular goal: to create a world where education is synonymous with impact.
                                    </p>
                                    <p>
                                        With deep expertise in software engineering and digital transformation, Tharun envisioned
                                        KMUniTech as more than just an ed-tech platform. He built it as a hybrid ecosystem
                                        where practical skills meet social responsibility.
                                    </p>
                                    <p>
                                        Under his leadership, KMUniTech has grown from a visionary startup to an MSME-approved
                                        entity serving individuals, institutions, and startups across India. His philosophy
                                        of "Empowering through Upskilling" continues to drive our innovation in every domain.
                                    </p>
                                </div>

                                <div className="mt-8">
                                    <a
                                        href="https://www.linkedin.com/in/pradhosh-km-1b7838342?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
                                    >
                                        <Linkedin size={18} /> Connect with me
                                    </a>
                                </div>

                                <div className="mt-12 flex flex-wrap gap-4">
                                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
                                        <Award className="text-indigo-400" size={20} />
                                        <span className="text-white font-semibold text-sm">Tech Visionary</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
                                        <Users className="text-purple-400" size={20} />
                                        <span className="text-white font-semibold text-sm">Impact Leader</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── Call to Action ────────────────────────────────────────── */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-[#0f1120] py-16 rounded-[2.5rem] border border-white/5">
                    <h2 className="text-3xl font-bold text-white mb-6">Join Our Growing Community</h2>
                    <p className="text-slate-400 mb-10 max-w-xl mx-auto">
                        Whether you're a student looking to upskill, a college seeking workshops, or a startup needing
                        solutions — KMUniTech is your destination.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/courses" className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                            Explore Courses <ArrowRight size={18} />
                        </Link>
                        <a href="mailto:kmunitech@gmail.com" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-4 rounded-xl font-bold transition-all flex items-center justify-center">
                            Contact Us
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
