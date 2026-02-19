import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Star, Users, BookOpen, Zap, Shield, Award, TrendingUp, CheckCircle, ChevronRight } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CourseCard from '../../components/common/CourseCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatINRCompact, formatPriceINR } from '../../utils/currency';
import { fetchFeaturedCourses } from '../../utils/api';
import { Course } from '../../types';
import { collaborations } from '../../data/collaborations';

const stats = [
  { value: '50K+', label: 'Students Enrolled', icon: Users },
  { value: '200+', label: 'Expert Courses', icon: BookOpen },
  { value: '98%', label: 'Satisfaction Rate', icon: Star },
  { value: '150+', label: 'Pro Instructors', icon: Award },
];

const features = [
  { icon: Zap, title: 'Learn at Your Pace', desc: 'Access courses anytime, anywhere. Study on your schedule with lifetime access.', color: 'from-yellow-500 to-orange-500' },
  { icon: Shield, title: 'Industry Experts', desc: 'Learn from practitioners with real-world experience in top companies.', color: 'from-blue-500 to-indigo-500' },
  { icon: Award, title: 'Earn Certificates', desc: 'Get recognized with verified certificates upon course completion.', color: 'from-emerald-500 to-teal-500' },
  { icon: TrendingUp, title: 'Career Growth', desc: 'Gain skills that employers actually need in the modern tech landscape.', color: 'from-purple-500 to-pink-500' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);
  const [featuredError, setFeaturedError] = useState('');
  const revenueThisMonth = 355240; // approx conversion from $4,280
  const logoSrc = `${import.meta.env.BASE_URL}kmunitech-logo.png.jpeg`;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setFeaturedError('');
        const data = await fetchFeaturedCourses();
        if (!mounted) return;
        setFeaturedCourses(data);
      } catch (e: any) {
        if (!mounted) return;
        setFeaturedError(e?.message || 'Failed to load featured courses');
      } finally {
        if (!mounted) return;
        setIsLoadingFeatured(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0f1a]">
      <Navbar />

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="hero-gradient relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-8 animate-slide-up stagger-1">
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
              <span className="text-indigo-300 text-sm font-medium">Now featuring 200+ expert courses</span>
            </div>

            {/* Brand mark */}
            <div className="flex items-center gap-3 mb-6 animate-slide-up stagger-1">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center">
                <img src={logoSrc} alt="KMUniTech" className="w-full h-full object-contain" />
              </div>
              <div className="text-slate-300 text-sm leading-snug">
                <p className="text-white font-semibold text-base">KMUniTech</p>
                <p>Universal Tech Solutions — learn, build, scale.</p>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 animate-slide-up stagger-2">
              Learn Skills That
              <span className="block gradient-text">Actually Matter</span>
            </h1>

            <p className="text-slate-400 text-xl leading-relaxed mb-10 max-w-2xl animate-slide-up stagger-3">
              Access world-class education from expert instructors. Whether you're starting out or leveling up — KMUniTech has the course for you.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12 animate-slide-up stagger-4">
              <Link to="/signup" className="btn-primary flex items-center gap-2 text-base py-3.5 px-8">
                Get Started Free <ArrowRight size={18} />
              </Link>
              <button onClick={() => navigate('/courses')} className="btn-secondary flex items-center gap-2 text-base py-3.5">
                <Play size={16} className="text-indigo-400" />
                Browse Courses
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 animate-slide-up stagger-5">
              <div className="flex -space-x-2">
                {['A', 'B', 'C', 'D', 'E'].map((l, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-[#0d0f1a] flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: `hsl(${i * 60 + 220}, 70%, 55%)` }}>{l}</div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={13} className="fill-amber-400 text-amber-400" />)}
                  <span className="text-white font-bold ml-1 text-sm">4.9</span>
                </div>
                <p className="text-slate-400 text-xs">Trusted by 50,000+ students</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ────────────────────────────────────────────────────── */}
      <section className="py-16 border-y border-white/5 bg-[#0f1120]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500/10 rounded-2xl mb-3 group-hover:bg-indigo-500/20 transition-all">
                  <Icon size={22} className="text-indigo-400" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">{value}</p>
                <p className="text-slate-500 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Courses ──────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-2">Featured Courses</p>
            <h2 className="section-title">Learn From The Best</h2>
            <p className="text-slate-400 mt-2 max-w-lg">Handpicked courses from our top instructors across in-demand technology fields.</p>
          </div>
          <Link to="/courses" className="hidden md:flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors">
            View all courses <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoadingFeatured ? (
            <div className="col-span-full py-10">
              <LoadingSpinner text="Loading featured courses..." />
            </div>
          ) : featuredError ? (
            <div className="col-span-full text-center py-10">
              <p className="text-slate-400 text-sm">{featuredError}</p>
            </div>
          ) : (
            featuredCourses.map(course => <CourseCard key={course.id} course={course} />)
          )}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link to="/courses" className="btn-secondary text-sm">View All Courses</Link>
        </div>
      </section>

      {/* ─── Collaborations (Simple Section) ─────────────────────────── */}
      <section className="py-20 bg-[#0d0f1a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-2">Our Network</p>
              <h2 className="section-title">Strategic Collaborations</h2>
              <p className="text-slate-400 mt-2 max-w-lg">We partner with industry leaders to bring the best opportunities to our students.</p>
            </div>
            <Link to="/collaborations" className="hidden md:flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors">
              View all partners <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collaborations.slice(0, 2).map((collab, index) => (
              <div key={index} className="flex flex-col sm:flex-row bg-[#12141f] border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all">
                <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-black/20">
                  <img src={collab.image} alt={collab.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <h3 className="text-white font-bold text-lg mb-1">{collab.title}</h3>
                  <p className="text-indigo-300/60 text-xs font-medium uppercase mb-2">{collab.tagline}</p>
                  <p className="text-slate-400 text-sm line-clamp-1">{collab.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link to="/collaborations" className="btn-secondary text-sm">View More Partners</Link>
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0f1120]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-2">Why KMUniTech?</p>
            <h2 className="section-title">Everything You Need to Succeed</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card p-6 hover:border-white/15 transition-all group">
                <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── For Instructors ──────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-orange-400 text-sm font-semibold tracking-wider uppercase mb-3">For Instructors</p>
            <h2 className="section-title mb-4">Share Your Knowledge,<br />Earn Revenue</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Join our growing community of expert instructors. Create courses, reach thousands of students, and build your brand on KMUniTech.
            </p>
            {['Create and publish courses easily', 'Reach 50,000+ eager students', 'Earn revenue from paid courses', 'Track student progress & analytics'].map(item => (
              <div key={item} className="flex items-center gap-2.5 mb-3">
                <CheckCircle size={17} className="text-emerald-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{item}</span>
              </div>
            ))}
            <Link to="/signup" state={{ role: 'instructor' }} className="btn-accent inline-flex items-center gap-2 mt-6">
              Become an Instructor <ArrowRight size={16} />
            </Link>
          </div>
          <div className="relative">
            <div className="card p-6 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-white/3 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center"><BookOpen size={18} className="text-white" /></div>
                <div><p className="text-white font-medium text-sm">React Masterclass</p><p className="text-slate-500 text-xs">3,240 students enrolled</p></div>
                <span className="ml-auto text-emerald-400 font-semibold text-sm">{formatPriceINR(0)}</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/3 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center"><TrendingUp size={18} className="text-white" /></div>
                <div><p className="text-white font-medium text-sm">Spring Boot Pro</p><p className="text-slate-500 text-xs">1,850 students enrolled</p></div>
                <span className="ml-auto text-orange-400 font-semibold text-sm">{formatPriceINR(4150)}</span>
              </div>
              <div className="border-t border-white/5 pt-4">
                <div className="flex justify-between text-sm"><span className="text-slate-400">Total Revenue This Month</span><span className="text-emerald-400 font-bold">{formatINRCompact(revenueThisMonth)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-indigo-600/10 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Start Your Journey Today</h2>
              <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto">Join thousands of learners building real skills. Start for free — no credit card required.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup" className="btn-primary py-4 px-10 text-base flex items-center gap-2">
                  Create Free Account <ArrowRight size={18} />
                </Link>
                <Link to="/courses" className="text-slate-300 hover:text-white font-medium transition-colors">
                  Explore Courses →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
