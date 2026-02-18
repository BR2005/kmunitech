import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_COURSES } from '../../data/mockCourses';
import { Play, CheckCircle, Clock } from 'lucide-react';

export default function StudentCourses() {
  const enrolled = MOCK_COURSES.slice(0, 3);
  const progress = [65, 35, 20];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">My Courses</h1>
        <p className="text-slate-400 mt-1">Track your enrolled courses and progress</p>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {enrolled.map((course, i) => (
          <div key={course.id} className="card-hover overflow-hidden">
            <div className={`h-36 bg-gradient-to-br ${['from-indigo-600 to-purple-700','from-blue-600 to-cyan-600','from-orange-600 to-red-600'][i]} relative`}>
              <div className="absolute bottom-3 right-3">
                <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-lg">{progress[i]}%</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-white font-semibold text-base mb-1 line-clamp-2">{course.title}</h3>
              <p className="text-slate-500 text-xs mb-4">by {course.instructorName}</p>
              <div className="progress-bar mb-2">
                <div className="progress-fill" style={{ width: `${progress[i]}%` }} />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                <span>{progress[i]}% complete</span>
                <span className="flex items-center gap-1"><Clock size={10} />{course.totalDuration}m total</span>
              </div>
              <Link to={`/courses/${course.id}`} className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2">
                <Play size={14} /> {progress[i] > 0 ? 'Continue' : 'Start'}
              </Link>
            </div>
          </div>
        ))}
        <Link to="/courses" className="card border-dashed border-white/10 flex flex-col items-center justify-center py-12 hover:border-indigo-500/30 transition-all group">
          <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-indigo-500/20 transition-all">
            <span className="text-2xl text-indigo-400">+</span>
          </div>
          <p className="text-white font-medium text-sm">Browse More Courses</p>
          <p className="text-slate-500 text-xs mt-1">200+ courses available</p>
        </Link>
      </div>
    </DashboardLayout>
  );
}
