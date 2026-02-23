import React, { useEffect, useMemo, useState } from 'react';
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

type LevelKey = 'Beginner' | 'Intermediate' | 'Master';

type LessonSection = {
  title: string;
  description: string;
  bullets?: string[];
  code?: { languageLabel: string; snippet: string };
};

type Lesson = {
  overview: string;
  outcomes: string[];
  sections: LessonSection[];
  practice: string[];
  miniProject: { title: string; steps: string[] };
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

  const [activeTopicKey, setActiveTopicKey] = useState<string>('html');
  const [activeLevel, setActiveLevel] = useState<LevelKey>('Beginner');

  const lessons = useMemo((): Record<string, Record<LevelKey, Lesson>> => {
    const html: Record<LevelKey, Lesson> = {
      Beginner: {
        overview:
          'Start from the basics: how the web works, what an HTML document looks like, and how to build clean page structure with semantic tags.',
        outcomes: [
          'Create a valid HTML page (head/body/meta/title)',
          'Use headings, paragraphs, lists, links, and images correctly',
          'Understand semantic layout (header/nav/main/section/footer)',
        ],
        sections: [
          {
            title: 'HTML Document Structure',
            description:
              'Every web page begins with a doctype and a basic HTML skeleton. Keep your metadata inside the head, and content inside the body.',
            code: {
              languageLabel: 'HTML',
              snippet: `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>My First Page</title>\n  </head>\n  <body>\n    <h1>Hello Web</h1>\n    <p>Welcome to HTML.</p>\n  </body>\n</html>`,
            },
          },
          {
            title: 'Text, Links, and Images',
            description:
              'Use the right tag for the job. Prefer meaningful structure (headings) over visual hacks (lots of <br>).',
            bullets: [
              'Headings: h1 to h6 (use h1 once per page)',
              'Links: a href="..." (add rel="noopener noreferrer" for new tabs)',
              'Images: img alt="..." (alt text is required for accessibility)',
            ],
          },
          {
            title: 'Semantic Layout',
            description:
              'Semantic tags make your page easier for humans, search engines, and screen readers. Build a clear hierarchy.',
            code: {
              languageLabel: 'HTML',
              snippet: `<header>\n  <nav>...</nav>\n</header>\n<main>\n  <section>...</section>\n  <section>...</section>\n</main>\n<footer>...</footer>`,
            },
          },
        ],
        practice: [
          'Create a simple “About Me” page with a heading, short bio, and a profile image (with alt text).',
          'Add a navigation with 3 links (Home, Projects, Contact).',
          'Make a list of your favorite tools using ul/li.',
        ],
        miniProject: {
          title: 'Mini Project: Personal Landing Page',
          steps: [
            'Create sections: Hero, About, Projects, Contact, Footer.',
            'Use semantic tags and correct heading order.',
            'Add at least one external link opening in a new tab.',
          ],
        },
      },
      Intermediate: {
        overview:
          'Move beyond basic tags: forms, tables, accessibility, and SEO-friendly structure. Learn how to build reusable page patterns.',
        outcomes: [
          'Build accessible forms with labels and validation hints',
          'Use tables appropriately (only for tabular data)',
          'Improve SEO with semantic content and metadata',
        ],
        sections: [
          {
            title: 'Forms (Accessible by Default)',
            description:
              'Always pair inputs with labels. Use proper input types for better mobile keyboards and validation.',
            code: {
              languageLabel: 'HTML',
              snippet: `<form>\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" autocomplete="email" required />\n\n  <label for="msg">Message</label>\n  <textarea id="msg" name="message" rows="4" required></textarea>\n\n  <button type="submit">Send</button>\n</form>`,
            },
          },
          {
            title: 'SEO & Metadata',
            description:
              'Use meaningful titles and descriptions. Add Open Graph tags if you share pages on social platforms.',
            bullets: [
              'title: short and clear',
              'meta description: 140–160 chars is a common target',
              'Use headings and semantic sections for readability',
            ],
          },
          {
            title: 'Tables (When Needed)',
            description:
              'Tables are for data, not layout. Use thead/tbody and scope for accessible headers.',
            code: {
              languageLabel: 'HTML',
              snippet: `<table>\n  <thead>\n    <tr>\n      <th scope="col">Course</th>\n      <th scope="col">Duration</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>HTML Basics</td>\n      <td>2 hours</td>\n    </tr>\n  </tbody>\n</table>`,
            },
          },
        ],
        practice: [
          'Build a contact form with name/email/message and required fields.',
          'Create a course schedule table with headers and at least 3 rows.',
          'Add a meta description and a meaningful title to your page.',
        ],
        miniProject: {
          title: 'Mini Project: Workshop Registration Page',
          steps: [
            'Create a page with a hero section and registration form.',
            'Use fieldsets/legends for grouped inputs (optional).',
            'Add helpful placeholder text and required validation.',
          ],
        },
      },
      Master: {
        overview:
          'Master-level HTML focuses on accessibility, performance, and maintainable content structure. Build pages that scale and remain readable over time.',
        outcomes: [
          'Apply accessibility best practices (labels, landmarks, alt text)',
          'Use correct elements for interactive content',
          'Structure content for long-form readability',
        ],
        sections: [
          {
            title: 'Accessibility Landmarks',
            description:
              'Landmarks (header/nav/main/footer) help screen readers and improve overall UX. Keep a single main landmark per page.',
            bullets: [
              'Prefer button for actions, a for navigation',
              'Use aria-label only when a visible label isn’t possible',
              'Never skip heading levels unnecessarily',
            ],
          },
          {
            title: 'Media & Performance',
            description:
              'Use modern attributes and formats when available. Keep pages fast and friendly on mobile networks.',
            bullets: [
              'Use width/height on images to reduce layout shift',
              'Use loading="lazy" for offscreen images',
              'Use responsive images (srcset/sizes) when appropriate',
            ],
            code: {
              languageLabel: 'HTML',
              snippet: `<img\n  src="/images/banner.jpg"\n  alt="Workshop banner"\n  width="1200"\n  height="600"\n  loading="lazy"\n/>`,
            },
          },
          {
            title: 'Designing Reusable Page Patterns',
            description:
              'Think in components: repeated “cards”, consistent headings, and predictable navigation. This makes building with React much easier later.',
            bullets: [
              'Define a consistent section pattern: title → description → content',
              'Keep copy short and scannable',
              'Use semantic tags to reflect meaning, not style',
            ],
          },
        ],
        practice: [
          'Audit a page: ensure all images have alt text and forms have labels.',
          'Refactor a long page into semantic sections with proper headings.',
          'Replace div-based clickable elements with button/a where appropriate.',
        ],
        miniProject: {
          title: 'Mini Project: Accessible Documentation Page',
          steps: [
            'Create a doc-like page with a table of contents (links to sections).',
            'Use semantic headings and landmarks.',
            'Add images with proper alt and sizes.',
          ],
        },
      },
    };

    const css: Record<LevelKey, Lesson> = {
      Beginner: {
        overview:
          'Learn how CSS selects elements and applies styles. Build confidence with the box model, colors, typography, and spacing.',
        outcomes: [
          'Write basic selectors (element, class, id)',
          'Understand padding, border, margin (box model)',
          'Style text and create simple layouts',
        ],
        sections: [
          {
            title: 'Selectors & Specificity (Basics)',
            description:
              'Start simple with classes. Use ids sparingly. Prefer reusable class-based styles for consistency.',
            code: {
              languageLabel: 'CSS',
              snippet: `.card {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.10);\n  border-radius: 16px;\n}\n\n.card-title {\n  font-weight: 700;\n}`, 
            },
          },
          {
            title: 'Box Model',
            description:
              'If spacing looks wrong, it’s usually the box model. Learn to “read” spacing: content → padding → border → margin.',
            bullets: [
              'padding: space inside the border',
              'margin: space outside the border',
              'border-box helps keep widths predictable',
            ],
          },
          {
            title: 'Responsive Basics',
            description:
              'Use flexible widths and media queries (or utility classes if you use Tailwind).',
            code: {
              languageLabel: 'CSS',
              snippet: `.container {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 16px;\n}\n\n@media (min-width: 768px) {\n  .grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 16px;\n  }\n}`, 
            },
          },
        ],
        practice: [
          'Create a “card” style with padding, border, and rounded corners.',
          'Style a button with hover state.',
          'Build a simple 2-column layout for desktop and 1-column on mobile.',
        ],
        miniProject: {
          title: 'Mini Project: Styled Profile Card',
          steps: [
            'Build a profile card with name, role, and a short bio.',
            'Add spacing and typography.',
            'Make it responsive for mobile.',
          ],
        },
      },
      Intermediate: {
        overview:
          'Level up with Flexbox, Grid, positioning, and reusable design patterns. Learn to build consistent layouts quickly.',
        outcomes: [
          'Build layouts with Flexbox and Grid',
          'Use spacing scales consistently',
          'Create polished UI states (hover/focus/active)',
        ],
        sections: [
          {
            title: 'Flexbox (UI Alignment)',
            description:
              'Flexbox shines for navbars, toolbars, and aligning items in a row/column.',
            code: {
              languageLabel: 'CSS',
              snippet: `.row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}`, 
            },
          },
          {
            title: 'Grid (Page Layout)',
            description:
              'Use grid for page-level layout: sidebars, card grids, dashboards.',
            code: {
              languageLabel: 'CSS',
              snippet: `.grid {\n  display: grid;\n  grid-template-columns: 280px 1fr;\n  gap: 20px;\n}\n\n@media (max-width: 1024px) {\n  .grid {\n    grid-template-columns: 1fr;\n  }\n}`, 
            },
          },
          {
            title: 'Focus Styles (Accessibility)',
            description:
              'Don’t remove focus outlines. Instead, customize them so keyboard users can navigate confidently.',
            bullets: [
              'Use :focus-visible for better defaults',
              'Ensure contrast is visible on dark backgrounds',
              'Test with Tab navigation',
            ],
          },
        ],
        practice: [
          'Create a responsive navbar layout using Flexbox.',
          'Build a grid of feature cards that adapts to screen size.',
          'Add focus-visible styles to buttons and links.',
        ],
        miniProject: {
          title: 'Mini Project: Responsive Landing Section',
          steps: [
            'Create a hero section with text + image side-by-side on desktop.',
            'Stack content on mobile.',
            'Add consistent spacing and button hover/focus states.',
          ],
        },
      },
      Master: {
        overview:
          'At master level, focus on maintainable CSS architecture: tokens, composition, performance, and predictable component styling.',
        outcomes: [
          'Organize styles with consistency and reuse',
          'Avoid common layout bugs and specificity wars',
          'Design scalable component styles',
        ],
        sections: [
          {
            title: 'Maintainable CSS Strategy',
            description:
              'Choose a predictable approach: utility-first, BEM, or component-scoped styles. The goal is consistency and low specificity.',
            bullets: [
              'Prefer classes over deep selectors',
              'Avoid !important unless you control the entire system',
              'Define patterns for spacing, typography, and components',
            ],
          },
          {
            title: 'Animations & Motion (Tasteful)',
            description:
              'Use subtle transitions to communicate state changes. Keep motion minimal and avoid distracting effects.',
            bullets: [
              'Prefer transition on opacity/transform',
              'Respect reduced motion when possible',
              'Keep duration consistent across components',
            ],
          },
          {
            title: 'Debugging Like a Pro',
            description:
              'Use DevTools to inspect computed styles, box model, and layout. Most “mystery spacing” issues become obvious when inspected.',
            bullets: [
              'Check computed styles (what actually applies)',
              'Toggle layout overlays for grid/flex',
              'Look for margin-collapsing and overflow clipping',
            ],
          },
        ],
        practice: [
          'Refactor a small UI into reusable classes/components.',
          'Eliminate a specificity issue by simplifying selectors.',
          'Audit focus and hover states across interactive elements.',
        ],
        miniProject: {
          title: 'Mini Project: Component UI Kit',
          steps: [
            'Build consistent styles for Button, Card, Input, Badge.',
            'Define a small spacing/typography system and stick to it.',
            'Ensure hover/focus/disabled states are clear.',
          ],
        },
      },
    };

    return { html, css };
  }, []);

  const activeTopic = activeDomain.topics.find((t) => t.key === activeTopicKey) ?? activeDomain.topics[0];
  const activeLesson = activeTopic ? lessons[activeTopic.key]?.[activeLevel] : undefined;

  useEffect(() => {
    if (!activeDomain.enabled || activeDomain.topics.length === 0) {
      setActiveTopicKey('');
      return;
    }
    const nextTopicKey = activeDomain.topics[0]?.key;
    if (nextTopicKey && !activeDomain.topics.some((t) => t.key === activeTopicKey)) {
      setActiveTopicKey(nextTopicKey);
    }
  }, [activeDomainKey, activeDomain.enabled, activeDomain.topics, activeTopicKey]);

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
                <div className="space-y-6">
                  {/* Topic picker */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeDomain.topics.map((t) => {
                      const isActive = t.key === activeTopicKey;
                      return (
                        <button
                          key={t.key}
                          type="button"
                          onClick={() => setActiveTopicKey(t.key)}
                          className={`text-left bg-white/5 border rounded-2xl p-6 transition-all ${
                            isActive ? 'border-indigo-500/30' : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-white font-bold text-xl">{t.title}</h3>
                              <p className="text-slate-400 text-sm mt-2">{t.description}</p>
                            </div>
                            <span
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                                isActive
                                  ? 'bg-indigo-600/10 border-indigo-500/20 text-indigo-200'
                                  : 'bg-white/5 border-white/10 text-slate-300'
                              }`}
                            >
                              {isActive ? 'Selected' : 'Select'}
                            </span>
                          </div>

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
                        </button>
                      );
                    })}
                  </div>

                  {/* Level picker */}
                  {activeTopic && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <p className="text-slate-300 text-sm font-semibold">Now learning</p>
                          <p className="text-white font-bold text-xl mt-1">{activeTopic.title}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {activeTopic.levels.map((lvl) => {
                            const selected = lvl === activeLevel;
                            return (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => setActiveLevel(lvl)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                                  selected
                                    ? 'bg-indigo-600/20 border-indigo-500/30 text-white'
                                    : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                                }`}
                              >
                                {lvl}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Lesson content */}
                  {activeLesson ? (
                    <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/5 border border-indigo-500/20 rounded-3xl p-6 md:p-8">
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div>
                          <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest">{activeLevel} • {activeTopic?.title}</p>
                          <h3 className="text-white font-bold text-2xl md:text-3xl mt-2">Lesson Guide</h3>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
                          <span className="text-slate-400 text-xs font-semibold">Progress:</span>
                          <span className="text-white text-xs font-bold">Follow sections → Practice → Mini project</span>
                        </div>
                      </div>

                      <p className="text-slate-300 text-base leading-relaxed">{activeLesson.overview}</p>

                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {activeLesson.outcomes.map((o) => (
                          <div key={o} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                            <p className="text-white font-semibold text-sm">Learning outcome</p>
                            <p className="text-slate-400 text-sm mt-1">{o}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 space-y-4">
                        {activeLesson.sections.map((s) => (
                          <div key={s.title} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                            <h4 className="text-white font-bold text-lg">{s.title}</h4>
                            <p className="text-slate-400 text-sm mt-2 leading-relaxed">{s.description}</p>
                            {s.bullets && s.bullets.length > 0 && (
                              <ul className="mt-3 space-y-1.5">
                                {s.bullets.map((b) => (
                                  <li key={b} className="text-slate-300 text-sm flex gap-2">
                                    <span className="text-indigo-300">•</span>
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {s.code && (
                              <div className="mt-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-slate-400 text-xs font-semibold">Example ({s.code.languageLabel})</span>
                                </div>
                                <pre className="bg-[#0d0f1a]/70 border border-white/10 rounded-2xl p-4 overflow-auto text-slate-200 text-xs leading-relaxed">
{s.code.snippet}
                                </pre>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                          <h4 className="text-white font-bold text-lg">Practice tasks</h4>
                          <p className="text-slate-500 text-sm mt-1">Do these to lock in the concepts.</p>
                          <ul className="mt-4 space-y-2">
                            {activeLesson.practice.map((p) => (
                              <li key={p} className="text-slate-300 text-sm flex gap-2">
                                <span className="text-emerald-400">✓</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                          <h4 className="text-white font-bold text-lg">{activeLesson.miniProject.title}</h4>
                          <p className="text-slate-500 text-sm mt-1">Build something small, end-to-end.</p>
                          <ol className="mt-4 space-y-2">
                            {activeLesson.miniProject.steps.map((st, idx) => (
                              <li key={st} className="text-slate-300 text-sm flex gap-2">
                                <span className="text-indigo-300 font-bold">{idx + 1}.</span>
                                <span>{st}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-slate-400">Select a topic to see content.</p>
                    </div>
                  )}
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
