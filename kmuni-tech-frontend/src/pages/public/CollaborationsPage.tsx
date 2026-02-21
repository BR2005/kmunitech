import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { ArrowRight, ExternalLink, Star, Users, Handshake } from 'lucide-react';
import { collaborations } from '../../data/collaborations';

const baseUrl = import.meta.env.BASE_URL;
const linkedInUrl = 'https://www.linkedin.com/company/km-unitech/';

const socialInitiatives = [
  {
    title: 'Food Distribution',
    description:
      'Supporting roadside and underprivileged communities through regular food drives.',
    image: `${baseUrl}assetskmuni/food-distribution.jpeg`,
    tag: 'Social',
    color: 'from-rose-500 to-pink-600',
  },
  {
    title: 'NGO Collaboration',
    description:
      'Partnering with verified NGOs to create meaningful social impact across India.',
    image: `${baseUrl}assetskmuni/ngo-collaboration.jpeg`,
    tag: 'Impact',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    title: 'Technical Workshops',
    description:
      'Bridging the academic gap with hands-on training and industry-led workshops.',
    image: `${baseUrl}assetskmuni/technical-workshop.jpeg`,
    tag: 'Education',
    color: 'from-blue-500 to-cyan-600',
  },
];

export default function CollaborationsPage() {
  const openLinkedIn = () => {
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#0d0f1a]">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* ── Hero Header ─────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
            <span className="text-indigo-300 text-xs font-bold uppercase tracking-widest">
              Where Ideas Evolve Into Impact
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Our <span className="gradient-text">Collaborations</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Building a unified platform for learning, innovation, and social
            impact through strategic ecosystem partnerships across India.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-10">
            {[
              {
                icon: Handshake,
                value: `${collaborations.length}+`,
                label: 'Active Partners',
              },
              { icon: Users, value: '50K+', label: 'Students Reached' },
              { icon: Star, value: 'Pan-India', label: 'Operations' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-11 h-11 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center">
                  <Icon size={18} className="text-indigo-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-lg leading-none">
                    {value}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Partners ─────────────────────────────────────────────────── */}
        <section className="mb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-2">
                Trusted Collaborations
              </p>
              <h2 className="text-3xl font-bold text-white">
                Partners Across Domains
              </h2>
            </div>
            <button
              onClick={openLinkedIn}
              className="inline-flex items-center gap-2 self-start bg-indigo-600/10 border border-indigo-500/30 text-indigo-200 hover:bg-indigo-600/20 hover:border-indigo-500/50 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            >
              Connect on LinkedIn <ExternalLink size={14} />
            </button>
          </div>

          {/* 3-col grid — large readable poster images */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {collaborations.map((collab, index) => {
                const imgSrc = collab.image.startsWith('http')
                  ? collab.image
                  : `${baseUrl}${collab.image.startsWith('/') ? collab.image.slice(1) : collab.image}`;
                return (
                  <div
                    key={index}
                    onClick={openLinkedIn}
                    className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/25 bg-[#0d0e1c]"
                  >
                    {/* Image area — portrait, no overlay, fully readable */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0d0e1c]">
                      <img
                        src={imgSrc}
                        alt={collab.title}
                        className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                    {/* Info strip — separate from image */}
                    <div className="flex items-center gap-3 px-4 py-3 border-t border-white/[0.06] bg-[#12141f]">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${collab.color} flex items-center justify-center flex-shrink-0 shadow-md`}
                      >
                        <collab.icon size={14} className="text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-bold text-sm leading-tight truncate group-hover:text-indigo-200 transition-colors">
                          {collab.title}
                        </p>
                        <p className="text-slate-500 text-[11px] truncate">
                          {collab.tagline}
                        </p>
                      </div>
                      <ExternalLink
                        size={13}
                        className="text-indigo-400/50 group-hover:text-indigo-400 transition-colors ml-auto flex-shrink-0"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Social Responsibility ────────────────────────────────────── */}
        <section className="bg-[#0b0c15] border-y border-white/5 py-20 mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-pink-400 text-sm font-bold uppercase tracking-wider mb-2">
                Giving Back
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Social Responsibility
              </h2>
              <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
                Allocating a significant portion of our funds toward community
                welfare, food distribution, and technical upskilling for
                students.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {socialInitiatives.map((item, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl overflow-hidden"
                >
                  {/* Full-bleed image */}
                  <div className="w-full aspect-[3/4] sm:aspect-[3/4]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Dark overlay from bottom for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  {/* Content pinned to bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div
                      className={`inline-flex items-center bg-gradient-to-r ${item.color} text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2`}
                    >
                      {item.tag}
                    </div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-1 drop-shadow-md">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Vision ──────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="relative bg-gradient-to-br from-indigo-600/10 to-purple-600/5 border border-indigo-500/20 rounded-3xl p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
                Our Vision
              </p>
              <p className="text-white text-xl md:text-2xl font-light leading-relaxed mb-8 italic">
                "To build a unified platform for learning, innovation, and
                impact across diverse technology domains. All Domains, One
                Destination – KMUniTech."
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'MSME Approved',
                  'Pan-India Operations',
                  'B2B & B2C Platform',
                ].map((badge) => (
                  <span
                    key={badge}
                    className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-300 text-xs font-semibold"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Want to Collaborate?
          </h2>
          <p className="text-slate-400 text-base mb-8">
            Join our growing partner ecosystem and create impact together.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={openLinkedIn}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-500/20"
            >
              Get in Touch <ArrowRight size={15} />
            </button>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span>or email us at</span>
              <a
                href="mailto:kmunitech@gmail.com"
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
              >
                kmunitech@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
