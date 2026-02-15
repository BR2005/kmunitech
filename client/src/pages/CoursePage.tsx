import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../lib/api';
import { PlayCircle, ArrowLeft, Clock, BookOpen } from 'lucide-react';

export default function CoursePage() {
    const { id } = useParams();
    const [course, setCourse] = useState<any>(null);
    const [activeLesson, setActiveLesson] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await api.get(`/courses/${id}`);
                setCourse(res.data);
                if (res.data.lessons && res.data.lessons.length > 0) {
                    setActiveLesson(res.data.lessons[0]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-dark-950">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-shimmer glass-light rounded-2xl h-96"></div>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-dark-950">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <BookOpen className="h-12 w-12 text-dark-600 mx-auto mb-4" />
                    <p className="text-dark-400 text-lg font-medium">Course not found</p>
                    <Link to="/dashboard" className="text-primary-400 hover:text-primary-300 text-sm mt-2 inline-block">
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-950 flex flex-col relative overflow-hidden">
            <Navbar />
            
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 relative z-10">
                {/* Back Button */}
                <Link to="/dashboard" className="inline-flex items-center gap-2 text-dark-400 hover:text-white text-sm font-medium mb-6 transition-colors group animate-fade-in-up">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </Link>

                <div className="flex flex-col lg:flex-row gap-6 animate-fade-in-up stagger-1">
                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        {/* Video Player */}
                        <div className="glass-card rounded-2xl overflow-hidden aspect-video relative shadow-2xl shadow-primary-500/5">
                            {activeLesson ? (
                                activeLesson.videoUrl ? (
                                    <iframe
                                        src={activeLesson.videoUrl}
                                        className="w-full h-full"
                                        title={activeLesson.title}
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="text-center p-8">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mx-auto mb-4 border border-white/5">
                                                <PlayCircle className="h-8 w-8 text-primary-400" />
                                            </div>
                                            <p className="text-white font-semibold mb-1">No Video Available</p>
                                            <p className="text-dark-500 text-sm">Read the content below</p>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-dark-400">
                                    Select a lesson to start learning
                                </div>
                            )}
                        </div>

                        {/* Lesson Content */}
                        <div className="glass-card rounded-2xl p-8">
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                {activeLesson?.title || course.title}
                            </h1>
                            <div className="text-dark-300 leading-relaxed text-base">
                                <p>{activeLesson?.content || course.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <div className="glass-card rounded-2xl overflow-hidden sticky top-24 shadow-xl shadow-black/20">
                            <div className="p-5 border-b border-white/5 bg-gradient-to-br from-primary-500/5 to-transparent">
                                <h3 className="font-bold text-white text-lg" style={{ fontFamily: 'var(--font-heading)' }}>Course Content</h3>
                                <p className="text-dark-500 text-sm mt-1">
                                    {course.lessons?.length || 0} Lessons
                                </p>
                            </div>
                            <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                                {course.lessons?.map((lesson: any, idx: number) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setActiveLesson(lesson)}
                                        className={`w-full text-left p-4 flex items-start gap-3 transition-all border-b border-white/[0.03] last:border-0 ${activeLesson?.id === lesson.id
                                                ? 'bg-primary-500/10'
                                                : 'hover:bg-white/[0.02]'
                                            }`}
                                    >
                                        <div className={`mt-0.5 flex-shrink-0 ${activeLesson?.id === lesson.id ? 'text-primary-400' : 'text-dark-600'
                                            }`}>
                                            <PlayCircle className="h-5 w-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className={`text-sm font-medium truncate ${activeLesson?.id === lesson.id ? 'text-primary-300' : 'text-dark-300'
                                                }`}>
                                                {idx + 1}. {lesson.title}
                                            </p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Clock className="h-3 w-3 text-dark-600" />
                                                <span className="text-xs text-dark-600">10 min</span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                                {(!course.lessons || course.lessons.length === 0) && (
                                    <div className="p-8 text-center">
                                        <BookOpen className="h-6 w-6 text-dark-600 mx-auto mb-2" />
                                        <p className="text-dark-500 text-sm">No lessons added yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
