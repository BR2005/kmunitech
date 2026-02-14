import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash, BookOpen, X } from 'lucide-react';

export default function StaffDashboard() {
    const [courses, setCourses] = useState<any[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newCourse, setNewCourse] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyCourses();
    }, []);

    const fetchMyCourses = async () => {
        try {
            const res = await axios.get('http://localhost:3000/courses');
            setCourses(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/courses', newCourse);
            setIsCreating(false);
            setNewCourse({ title: '', description: '' });
            fetchMyCourses();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                        Manage Courses
                    </h2>
                    <p className="text-dark-500 text-sm mt-1">Create and manage your learning content</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="btn-primary !py-2.5 !px-5 text-sm inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                    <Plus className="h-4 w-4" />
                    New Course
                </button>
            </div>

            {/* Create Form */}
            {isCreating && (
                <div className="glass-card rounded-2xl p-6 md:p-7 animate-fade-in">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="font-bold text-white text-lg" style={{ fontFamily: 'var(--font-heading)' }}>New Course</h3>
                        <button onClick={() => setIsCreating(false)} className="p-1.5 rounded-lg text-dark-400 hover:text-white hover:bg-white/5 transition-all">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-dark-300 mb-2">Course Title</label>
                            <input
                                type="text"
                                required
                                value={newCourse.title}
                                onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
                                className="input-modern !pl-4"
                                placeholder="e.g., Introduction to Machine Learning"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-dark-300 mb-2">Description</label>
                            <textarea
                                required
                                value={newCourse.description}
                                onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
                                className="input-modern !pl-4 !h-28 resize-none"
                                placeholder="Describe what students will learn..."
                            />
                        </div>
                        <div className="flex gap-3 justify-end pt-2">
                            <button type="button" onClick={() => setIsCreating(false)} className="btn-ghost text-sm !py-2.5">
                                Cancel
                            </button>
                            <button type="submit" className="btn-primary text-sm !py-2.5">
                                <span>Create Course</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Courses Table */}
            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-dark-400 uppercase tracking-wider">Course</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-dark-400 uppercase tracking-wider">Students</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-dark-400 uppercase tracking-wider">Created</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-dark-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10">
                                        <div className="glass-light rounded-xl h-10 animate-shimmer"></div>
                                        <div className="glass-light rounded-xl h-10 animate-shimmer mt-3"></div>
                                        <div className="glass-light rounded-xl h-10 animate-shimmer mt-3"></div>
                                    </td>
                                </tr>
                            )}
                            {courses.map(course => (
                                <tr key={course.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center flex-shrink-0 border border-white/5">
                                                <BookOpen className="h-4 w-4 text-primary-400" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white text-sm">{course.title}</p>
                                                <p className="text-dark-500 text-xs mt-0.5 line-clamp-1 max-w-xs">{course.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-dark-300 text-sm">{course.enrollments?.length || 0}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-dark-400 text-sm">{new Date(course.createdAt).toLocaleDateString()}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button className="p-2 rounded-lg text-dark-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                                                <Trash className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!loading && courses.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <BookOpen className="h-8 w-8 text-dark-600 mx-auto mb-3" />
                                        <p className="text-dark-400 font-medium">No courses created yet</p>
                                        <p className="text-dark-600 text-sm mt-1">Click "New Course" to get started</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
