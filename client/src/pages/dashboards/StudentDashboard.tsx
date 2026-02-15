import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="space-y-8 animate-fade-in-up stagger-2">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        Available Courses
                    </h2>
                    <p className="text-dark-400 text-base">Browse and start learning from our expert-led courses</p>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="glass-light rounded-2xl h-72 animate-shimmer"></div>
                    ))}
                </div>
            ) : courses.length === 0 ? (
                <div className="glass-light rounded-2xl p-16 text-center">
                    <BookOpen className="h-14 w-14 text-dark-500 mx-auto mb-5" />
                    <p className="text-dark-300 font-semibold text-lg mb-2">No courses available yet.</p>
                    <p className="text-dark-500 text-sm">Check back soon for new content!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, idx) => (
                        <div key={course.id} className={`glass-card rounded-3xl overflow-hidden flex flex-col h-full group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 stagger-${Math.min(idx + 1, 6)} animate-fade-in-up`}>
                            {/* Thumbnail */}
                            <div className="h-48 relative overflow-hidden flex-shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 to-accent-500/30 group-hover:scale-110 transition-transform duration-500"></div>
                                {course.thumbnail ? (
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-dark-800/50">
                                        <BookOpen className="h-12 w-12 text-dark-600 group-hover:scale-110 transition-transform" />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3">
                                    <span className="px-3 py-1.5 rounded-lg bg-dark-950/80 backdrop-blur text-xs font-semibold text-primary-300 border border-white/10 shadow-lg">
                                        {course.lessons?.length || 0} lessons
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-primary-300 transition-colors line-clamp-1" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {course.title}
                                </h3>
                                <p className="text-dark-400 text-sm line-clamp-2 mb-6 leading-relaxed flex-1">{course.description}</p>

                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                                            {course.instructor?.name?.charAt(0) || 'I'}
                                        </div>
                                        <span className="text-xs text-dark-400 font-medium">
                                            {course.instructor?.name || 'Instructor'}
                                        </span>
                                    </div>
                                    <Link
                                        to={`/course/${course.id}`}
                                        className="flex items-center gap-1.5 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors group/link px-3 py-1.5 rounded-lg hover:bg-primary-500/10"
                                    >
                                        View
                                        <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
