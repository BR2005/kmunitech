import React, { useMemo, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { BookOpen, Code2, ChevronRight, Globe, Cpu, Database } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type DomainKey = 'web' | 'ai' | 'data' | 'other';

type Topic = {
  key: string;
  title: string;
  description: string;
  levels: Array<'Beginner' | 'Intermediate' | 'Master'>;
};

type Domain = {
  key: DomainKey;
  title: string;
  icon: LucideIcon;
  enabled: boolean;
  topics: Topic[];
};

export default function SelfLearnPage() {
  const domains: Domain[] = useMemo(
    () => [
      {
        key: 'web',
        title: 'Web Development',
        icon: Globe,
        enabled: true,
        topics: [
          {
            key: 'html',
            title: 'HTML',
            description: 'Learn the structure of web pages with semantic HTML.',
            levels: ['Beginner', 'Intermediate', 'Master'],
          },
          {
            key: 'css',
            title: 'CSS',
            description: 'Style beautiful, responsive web pages with CSS.',
            levels: ['Beginner', 'Intermediate', 'Master'],
          },
        ],
      },
      {
        key: 'ai',
        title: 'AI / ML',
        icon: Cpu,
        enabled: false,
        topics: [],
      },
      {
        key: 'data',
        title: 'Data Science',
        icon: Database,
        enabled: false,
        topics: [],
      },
      {
        key: 'other',
        title: 'More Domains',
        icon: BookOpen,
        enabled: false,
        topics: [],
      },
    ],
    [],
  );

  const [activeDomainKey, setActiveDomainKey] = useState<DomainKey>('web');
  const activeDomain = domains.find((d) => d.key === activeDomainKey) ?? domains[0];

  return (
    <div className="min-h-screen bg-[#0d0f1a]">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-5">
              <Code2 size={14} className="text-indigo-300" />
              <span className="text-indigo-300 text-xs font-bold uppercase tracking-widest">
                Self Learn Courses
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Learn by Yourself, Step by Step
            </h1>
            <p className="text-slate-400 text-lg max-w-3xl">
              Choose a domain and start with the level that fits you — Beginner, Intermediate, or Master.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
            {/* Left sidebar (W3Schools-style) */}
            <aside className="card p-5 lg:sticky lg:top-24 h-fit">
              <p className="text-slate-300 text-sm font-semibold mb-4">Domains</p>
              <div className="space-y-2">
                {domains.map((d) => {
                  const Icon = d.icon;
                  const isActive = d.key === activeDomainKey;
                  const disabled = !d.enabled;

                  return (
                    <button
                      key={d.key}
                      type="button"
                      disabled={disabled}
                      onClick={() => setActiveDomainKey(d.key)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all border ${
                        isActive
                          ? 'bg-indigo-600/20 border-indigo-500/30 text-white'
                          : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                      } ${disabled ? 'opacity-50 cursor-not-allowed hover:border-white/10' : ''}`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isActive ? 'bg-indigo-500/15' : 'bg-white/5'}`}>
                        <Icon size={16} className={isActive ? 'text-indigo-300' : 'text-slate-400'} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">{d.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {d.enabled ? `${d.topics.length} topics` : 'Coming soon'}
                        </p>
                      </div>
                      <ChevronRight size={16} className={`ml-auto ${isActive ? 'text-indigo-300' : 'text-slate-500'}`} />
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Main content */}
            <section className="card p-6 md:p-8">
              <div className="flex items-start justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{activeDomain.title}</h2>
                  <p className="text-slate-400 text-sm mt-2">
                    {activeDomain.enabled
                      ? 'Pick a topic and choose your level.'
                      : 'This domain will be added soon.'}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                  <span className="text-slate-400 text-xs font-semibold">Levels:</span>
                  <span className="text-white text-xs font-bold">Beginner</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-white text-xs font-bold">Intermediate</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-white text-xs font-bold">Master</span>
                </div>
              </div>

              {activeDomain.enabled && activeDomain.topics.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeDomain.topics.map((t) => (
                    <div key={t.key} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-all">
                      <h3 className="text-white font-bold text-xl">{t.title}</h3>
                      <p className="text-slate-400 text-sm mt-2">{t.description}</p>

                      <div className="mt-5">
                        <p className="text-slate-300 text-sm font-semibold mb-3">Levels</p>
                        <div className="flex flex-wrap gap-2">
                          {t.levels.map((lvl) => (
                            <span
                              key={lvl}
                              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600/10 border border-indigo-500/20 text-indigo-200"
                            >
                              {lvl}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={24} className="text-slate-500" />
                  </div>
                  <p className="text-white font-semibold text-xl">Coming soon</p>
                  <p className="text-slate-500 text-sm mt-2">We’re adding this domain next.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
