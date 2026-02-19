import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Handshake, Zap, Globe, Shield, ArrowRight, Heart, BookOpen, Star, ExternalLink } from 'lucide-react';
import { collaborations } from '../../data/collaborations';

const baseUrl = import.meta.env.BASE_URL;
const linkedInUrl = "https://www.linkedin.com/company/km-unitech/";

""; // Placeholder for removal of local collaborations array

const socialInitiatives = [
    {
        title: "Food Distribution",
        description: "Supporting roadside and underprivileged communities through regular food drives.",
        image: `${baseUrl}assetskmuni/WhatsApp Image 2026-02-14 at 11.35.02 PM.jpeg`,
        tag: "Social"
    },
    {
        title: "NGO Collaboration",
        description: "Partnering with verified NGOs to create meaningful social impact across India.",
        image: `${baseUrl}assetskmuni/kmi.jpeg`,
        tag: "Impact"
    },
    {
        title: "Technical Workshops",
        description: "Bridging the academic gap with hands-on training and industry-led workshops.",
        image: `${baseUrl}assetskmuni/WhatsApp Image 2026-02-14 at 11.35.01 PM.jpeg`,
        tag: "Education"
    }
];

export default function CollaborationsPage() {
    const openLinkedIn = () => {
        window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="min-h-screen bg-[#0d0f1a]">
            <Navbar />

            <main className="pt-24 pb-20">
                {/* Header Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
                    <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6">
                        <span className="text-indigo-300 text-xs font-bold uppercase tracking-widest">Where Ideas Evolve Into Impact</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Our <span className="gradient-text">Collaborations</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Building a unified platform for learning, innovation, and social impact through
                        strategic ecosystem partnerships across India.
                    </p>
                </section>

                {/* Partners Section - More compact and professional */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-2xl font-bold text-white uppercase tracking-wider text-sm">Strategic Partners</h2>
                        <div className="h-px flex-1 bg-white/5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {collaborations.map((collab, index) => (
                            <div
                                key={index}
                                className="group flex flex-col sm:flex-row bg-[#12141f] border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300"
                            >
                                {/* Slightly larger, balanced image size */}
                                <div className="w-full aspect-video sm:aspect-square sm:w-40 bg-black/40 relative flex-shrink-0">
                                    <img
                                        src={collab.image}
                                        alt={collab.title}
                                        className="w-full h-full object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-gradient-to-br ${collab.color} flex items-center justify-center shadow-lg border border-white/10 z-10`}>
                                        <collab.icon size={12} className="text-white" />
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col justify-between flex-1">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-bold text-white">{collab.title}</h3>
                                            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded">Partner</span>
                                        </div>
                                        <p className="text-indigo-300/60 text-xs mb-3 font-medium uppercase tracking-wide">{collab.tagline}</p>
                                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                                            {collab.description}
                                        </p>
                                    </div>

                                    <button
                                        onClick={openLinkedIn}
                                        className="mt-4 flex items-center gap-2 text-white text-sm font-semibold hover:text-indigo-400 transition-colors group/btn"
                                    >
                                        View Details <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Social Impact Section - Dense and professional */}
                <section className="bg-[#0b0c15] py-20 border-y border-white/5 mb-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-white mb-4">Social Responsibility</h2>
                            <p className="text-slate-500 text-sm max-w-xl mx-auto">
                                Allocating a significant portion of our funds toward community welfare,
                                food distribution, and technical upskilling for students.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {socialInitiatives.map((item, i) => (
                                <div key={i} className="bg-[#12141f]/40 border border-white/5 rounded-xl overflow-hidden hover:bg-[#12141f]/60 transition-colors">
                                    <div className="aspect-[4/5] bg-black/20 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                                            <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">{item.tag}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Professional Vision Summary */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                    <div className="bg-gradient-to-br from-[#1a1c2e] to-[#0d0f1a] border border-white/5 rounded-3xl p-10 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl opacity-20" />
                        <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest text-indigo-400">Our Vision</h3>
                        <p className="text-white text-xl md:text-2xl font-light leading-relaxed mb-8 italic">
                            "To build a unified platform for learning, innovation, and impact across diverse technology domains. All Domains, One Destination – KMUniTech."
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 text-xs font-semibold">MSME Approved</div>
                            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 text-xs font-semibold">Pan-India Operations</div>
                            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 text-xs font-semibold">B2B & B2C Platform</div>
                        </div>
                    </div>
                </section>

                {/* Simple CTA */}
                <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-6">Want to Collaborate?</h2>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <button
                            onClick={openLinkedIn}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold transition-all"
                        >
                            Get in Touch
                        </button>
                        <p className="text-slate-500 text-sm">kmunitech@gmail.com</p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
