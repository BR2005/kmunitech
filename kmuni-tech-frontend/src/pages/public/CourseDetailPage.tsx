import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MOCK_COURSES } from '../../data/mockCourses';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Star, Users, Clock, Play, Lock, CheckCircle, BookOpen, ChevronRight, Award } from 'lucide-react';
import { formatPriceINR } from '../../utils/currency';

export default function CourseDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const course = MOCK_COURSES.find(c => c.id === id);

  if (!course) return (
    <div className="min-h-screen bg-[#0d0f1a] flex items-center justify-center">
      <div className="text-center"><p className="text-2xl text-white mb-4">Course not found</p>
        <Link to="/courses" className="btn-primary">Browse Courses</Link></div>
    </div>
  );

  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60); const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const gradients = ['from-indigo-600 to-purple-700','from-blue-600 to-cyan-600','from-emerald-600 to-teal-600','from-orange-600 to-red-600','from-pink-600 to-rose-600','from-violet-600 to-indigo-600'];
  const gradient = gradients[parseInt(course.id) % gradients.length];

  return (
    <div className="min-h-screen bg-[#0d0f1a]">
      <Navbar />

      {/* Hero Banner */}
      <div className={`bg-gradient-to-br ${gradient} pt-24 pb-16 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <Link to="/courses" className="text-white/60 hover:text-white text-sm flex items-center gap-1 mb-6 transition-colors">
              <ChevronRight size={14} className="rotate-180" /> All Courses
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge bg-white/15 text-white border border-white/20 uppercase text-[10px] tracking-wide">{course.category.replace('-',' ')}</span>
              <span className="badge bg-white/15 text-white border border-white/20 capitalize text-[10px]">{course.level}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{course.title}</h1>
            <p className="text-white/80 text-lg mb-6">{course.description}</p>
            <div className="flex flex-wrap items-center gap-5 text-white/70 text-sm">
              <span className="flex items-center gap-1.5"><Star size={14} className="text-amber-400 fill-amber-400" /><strong className="text-white">{course.rating}</strong> rating</span>
              <span className="flex items-center gap-1.5"><Users size={14} />{course.studentsCount.toLocaleString()} students</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />{formatDuration(course.totalDuration)} total</span>
              <span className="flex items-center gap-1.5"><BookOpen size={14} />{course.lessons.length} lessons</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What you'll learn */}
            <div className="card p-6">
              <h2 className="text-white font-bold text-xl mb-5">What you'll learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Build production-ready applications', 'Master modern development practices', 'Understand core concepts in depth', 'Apply knowledge in real projects', 'Get hands-on practical experience', 'Learn industry best practices'].map(item => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Curriculum */}
            <div className="card p-6">
              <h2 className="text-white font-bold text-xl mb-5">Course Curriculum</h2>
              <div className="space-y-2">
                {course.lessons.map((lesson, idx) => (
                  <div key={lesson.id} className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                    lesson.isPreview ? 'bg-white/3 hover:bg-white/5 cursor-pointer' : 'bg-white/1.5 opacity-75'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        lesson.isPreview ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-slate-500'
                      }`}>{idx + 1}</div>
                      <div>
                        <p className={`font-medium text-sm ${lesson.isPreview ? 'text-white' : 'text-slate-400'}`}>{lesson.title}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{lesson.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 text-xs">{lesson.duration}m</span>
                      {lesson.isPreview ? (
                        <span className="flex items-center gap-1 text-indigo-400 text-xs"><Play size={11} /> Preview</span>
                      ) : (
                        <Lock size={13} className="text-slate-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="card p-6">
              <h2 className="text-white font-bold text-xl mb-5">About the Instructor</h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {course.instructorName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{course.instructorName}</h3>
                  <p className="text-indigo-400 text-sm mb-3">Senior Software Engineer & Educator</p>
                  <p className="text-slate-400 text-sm leading-relaxed">Expert practitioner with 10+ years of industry experience. Passionate about making complex concepts accessible to everyone. Taught over 5,000 students worldwide.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 lg:sticky lg:top-20">
              <div className={`h-40 bg-gradient-to-br ${gradient} rounded-xl mb-5 flex items-center justify-center opacity-80`}>
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                  {isAuthenticated ? <Play size={24} className="text-white ml-1" /> : <Lock size={20} className="text-white" />}
                </div>
              </div>

              <div className="mb-5">
                {course.price === 0 ? (
                  <p className="text-3xl font-bold text-emerald-400 mb-1">Free</p>
                ) : (
                  <p className="text-3xl font-bold text-white mb-1">{formatPriceINR(course.price)}</p>
                )}
              </div>

              {isAuthenticated ? (
                <button className="btn-primary w-full py-3.5 mb-3 flex items-center justify-center gap-2">
                  {course.price === 0 ? <><BookOpen size={17} /> Enroll for Free</> : <><Award size={17} /> Enroll Now</>}
                </button>
              ) : (
                <button onClick={() => navigate('/login', { state: { from: `/courses/${course.id}` } })}
                  className="btn-primary w-full py-3.5 mb-3 flex items-center justify-center gap-2">
                  <Lock size={16} /> Sign in to Enroll
                </button>
              )}

              {!isAuthenticated && (
                <Link to="/signup" className="btn-secondary w-full py-3 text-sm text-center block mb-4">
                  Create Free Account
                </Link>
              )}

              <div className="space-y-3 border-t border-white/5 pt-5">
                {[
                  [`${course.lessons.length} lessons`, BookOpen],
                  [formatDuration(course.totalDuration) + ' of content', Clock],
                  ['Certificate of completion', Award],
                  ['Full lifetime access', CheckCircle],
                ].map(([text, Icon]: any) => (
                  <div key={text} className="flex items-center gap-2.5 text-slate-300 text-sm">
                    <Icon size={15} className="text-indigo-400 flex-shrink-0" /> {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
