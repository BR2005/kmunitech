import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../lib/api';
import { BookOpen, ArrowRight, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Courses() {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await api.get('/courses');
                setCourses(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#050816] text-slate-100">
            <Navbar />

            <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 container-center w-full">
                <div className="text-center max-w-3xl mx-auto space-y-5">
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight text-shadow-soft" style={{ fontFamily: 'var(--font-heading)' }}>
                        Explore our <span className="gradient-text">premium courses</span>
                    </h1>
                    <p className="text-slate-300 text-lg leading-relaxed">
                        Master new skills with production-grade projects led by mentors who ship. From code to design, pick the path that fits your next role.
                    </p>
                </div>

                <div className="mt-12 max-w-2xl mx-auto relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                        type="text"
                        className="w-full pl-14 pr-14 py-4 rounded-xl border border-white/10 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30 outline-none transition-all bg-white/5 text-slate-100 placeholder:text-slate-500"
                        placeholder="Search for courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all border border-white/5">
                            <Filter className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Course Grid */}
            <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="glass-light rounded-3xl h-96 animate-shimmer" />
                        ))}
                    </div>
                ) : filteredCourses.length === 0 ? (
                    <div className="text-center py-24 animate-fade-in">
                        <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                            <Search className="h-12 w-12 text-slate-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>No courses found</h3>
                        <p className="text-slate-400">Try adjusting your search criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course, idx) => (
                            <Link to={`/course/${course.id}`} key={course.id} className={`group relative flex flex-col glass-card rounded-3xl overflow-hidden hover:-translate-y-3 hover:shadow-2xl hover:shadow-gold-500/15 transition-all duration-300 h-full stagger-${Math.min(idx + 1, 6)} animate-fade-in-up`}>
                                <div className="h-56 relative overflow-hidden flex-shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-br from-gold-400/25 via-transparent to-teal-500/25 group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-[#050816]/40 group-hover:bg-[#050816]/10 transition-colors duration-500" />
                                    <div className="absolute top-4 right-4">
                                        <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-white shadow-lg">
                                            {course.category || 'Development'}
                                        </span>
                                    </div>

                                    {course.thumbnail ? (
                                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gold-400/60 bg-white/5">
                                            <BookOpen className="h-20 w-20 group-hover:scale-110 transition-transform" />
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-gold-100 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {course.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm line-clamp-2 mb-6 flex-1 leading-relaxed">
                                        {course.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-teal-500 flex items-center justify-center text-xs font-bold text-slate-950 shadow-lg">
                                                {course.instructor?.name?.charAt(0) || 'I'}
                                            </div>
                                            <span className="text-sm font-medium text-slate-200">
                                                {course.instructor?.name || 'Instructor'}
                                            </span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white/10 flex items-center justify-center text-white group-hover:bg-gold-400 group-hover:border-gold-400 transition-all shadow-lg">
                                            <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
