import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MOCK_COURSES } from '../../data/mockCourses';
import { PlusCircle, Users, Star, Edit3, Eye, Trash2 } from 'lucide-react';
import { formatPriceINR } from '../../utils/currency';

export default function InstructorCourses() {
  const courses = MOCK_COURSES.slice(0, 2);
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold text-white">My Courses</h1><p className="text-slate-400 mt-1">Manage and monitor your published courses</p></div>
        <Link to="/instructor/create-course" className="btn-primary flex items-center gap-2 text-sm"><PlusCircle size={15} /> New Course</Link>
      </div>
      <div className="space-y-4">
        {courses.map((course, i) => (
          <div key={course.id} className="card p-5 hover:border-white/15 transition-all">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0 bg-gradient-to-br ${['from-indigo-500 to-purple-500','from-orange-500 to-red-500'][i]}`}>
                {course.title.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold">{course.title}</h3>
                <div className="flex flex-wrap items-center gap-4 mt-1.5 text-sm text-slate-400">
                  <span className="flex items-center gap-1"><Users size={13} />{course.studentsCount.toLocaleString()} students</span>
                  <span className="flex items-center gap-1"><Star size={13} className="text-amber-400" />{course.rating}</span>
                  <span className={`badge ${course.price === 0 ? 'badge-free' : 'badge-paid'}`}>{course.price === 0 ? 'Free' : formatPriceINR(course.price)}</span>
                  <span className="badge-level capitalize">{course.level}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="w-9 h-9 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all"><Eye size={15} /></button>
                <button className="w-9 h-9 bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/30 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all"><Edit3 size={15} /></button>
                <button className="w-9 h-9 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-400 transition-all"><Trash2 size={15} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
