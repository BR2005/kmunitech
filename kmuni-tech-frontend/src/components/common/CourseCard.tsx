import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Course } from '../../types';
import { formatPriceINR } from '../../utils/currency';
import { Star, Users, Clock, Lock, Play } from 'lucide-react';

interface Props { course: Course; showEnroll?: boolean; }

const categoryColors: Record<string, string> = {
  'web-dev': 'bg-blue-500/15 text-blue-400',
  'ai-ml': 'bg-purple-500/15 text-purple-400',
  'mobile': 'bg-emerald-500/15 text-emerald-400',
  'devops': 'bg-orange-500/15 text-orange-400',
  'design': 'bg-pink-500/15 text-pink-400',
  'data-science': 'bg-cyan-500/15 text-cyan-400',
  'business': 'bg-amber-500/15 text-amber-400',
};

const thumbnailGradients = [
  'from-indigo-600 to-purple-700',
  'from-blue-600 to-cyan-600',
  'from-emerald-600 to-teal-600',
  'from-orange-600 to-red-600',
  'from-pink-600 to-rose-600',
  'from-violet-600 to-indigo-600',
];

function stringHash(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function CourseCard({ course, showEnroll = true }: Props) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const gradientIndex = course.id ? stringHash(course.id) % thumbnailGradients.length : 0;
  const gradient = thumbnailGradients[gradientIndex];

  const handleAccess = () => {
    if (!isAuthenticated) { navigate('/login', { state: { from: `/courses/${course.id}` } }); return; }
    navigate(`/courses/${course.id}`);
  };

  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <div className="card-hover group cursor-pointer overflow-hidden" onClick={handleAccess}>
      {/* Thumbnail */}
      <div className={`h-44 bg-gradient-to-br ${gradient} relative flex items-center justify-center overflow-hidden`}>
        <div className="text-center text-white/20 text-7xl font-black select-none">{course.title.charAt(0)}</div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            {isAuthenticated ? <Play size={20} className="text-white ml-1" /> : <Lock size={18} className="text-white" />}
          </div>
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          {course.price === 0 ? (
            <span className="badge-free text-xs">FREE</span>
          ) : (
            <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-lg border border-white/10">
              {formatPriceINR(course.price)}
            </span>
          )}
        </div>

        {/* Featured */}
        {course.isFeatured && (
          <div className="absolute top-3 left-3">
            <span className="bg-amber-500/90 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-md">Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category & Level */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`badge text-[10px] uppercase tracking-wide ${categoryColors[course.category] || 'bg-slate-500/15 text-slate-400'}`}>
            {course.category.replace('-', ' ')}
          </span>
          <span className="badge-level text-[10px] capitalize">{course.level}</span>
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold text-base leading-snug mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{course.description}</p>

        {/* Instructor */}
        <p className="text-slate-400 text-xs mb-4">by <span className="text-indigo-400">{course.instructorName}</span></p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-amber-400">
            <Star size={13} className="fill-amber-400" />
            <span className="font-semibold">{course.rating}</span>
            <span className="text-slate-500">({course.studentsCount.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            <span className="flex items-center gap-1"><Users size={12} />{course.studentsCount.toLocaleString()}</span>
            <span className="flex items-center gap-1"><Clock size={12} />{formatDuration(course.totalDuration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
