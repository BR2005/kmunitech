import React, { useState, useMemo } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CourseCard from '../../components/common/CourseCard';
import { MOCK_COURSES } from '../../data/mockCourses';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { CourseCategory, CourseLevel } from '../../types';

const categories: { value: string; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'web-dev', label: 'Web Development' },
  { value: 'ai-ml', label: 'AI & Machine Learning' },
  { value: 'data-science', label: 'Data Science' },
  { value: 'mobile', label: 'Mobile Dev' },
  { value: 'devops', label: 'DevOps' },
  { value: 'design', label: 'UI/UX Design' },
  { value: 'business', label: 'Business' },
];

const levels = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filtered = useMemo(() => {
    let courses = [...MOCK_COURSES];
    if (search) courses = courses.filter(c =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );
    if (category !== 'all') courses = courses.filter(c => c.category === category);
    if (level !== 'all') courses = courses.filter(c => c.level === level);
    if (priceFilter === 'free') courses = courses.filter(c => c.price === 0);
    if (priceFilter === 'paid') courses = courses.filter(c => c.price > 0);
    if (sortBy === 'featured') courses.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    if (sortBy === 'rating') courses.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'students') courses.sort((a, b) => b.studentsCount - a.studentsCount);
    if (sortBy === 'price-low') courses.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') courses.sort((a, b) => b.price - a.price);
    return courses;
  }, [search, category, level, priceFilter, sortBy]);

  return (
    <div className="min-h-screen bg-[#0d0f1a]">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Explore Courses</h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">Find the perfect course to level up your skills. Free and paid options available.</p>
          </div>

          {/* Search */}
          <div className="relative mb-6 max-w-2xl mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search courses, topics, skills..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-11 py-4 text-base"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="input-field py-2.5 px-4 text-sm cursor-pointer w-auto min-w-[160px]">
              {categories.map(c => <option key={c.value} value={c.value} className="bg-[#12141f]">{c.label}</option>)}
            </select>
            <select value={level} onChange={e => setLevel(e.target.value)}
              className="input-field py-2.5 px-4 text-sm cursor-pointer w-auto min-w-[140px]">
              {levels.map(l => <option key={l.value} value={l.value} className="bg-[#12141f]">{l.label}</option>)}
            </select>
            <div className="flex gap-2">
              {['all', 'free', 'paid'].map(p => (
                <button key={p} onClick={() => setPriceFilter(p)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border capitalize ${
                    priceFilter === p ? 'bg-indigo-600 text-white border-indigo-500' : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                  }`}>{p}</button>
              ))}
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="input-field py-2.5 px-4 text-sm cursor-pointer w-auto min-w-[150px] ml-auto">
              <option value="featured" className="bg-[#12141f]">Sort: Featured</option>
              <option value="rating" className="bg-[#12141f]">Sort: Rating</option>
              <option value="students" className="bg-[#12141f]">Sort: Students</option>
              <option value="price-low" className="bg-[#12141f]">Price: Low to High</option>
              <option value="price-high" className="bg-[#12141f]">Price: High to Low</option>
            </select>
          </div>

          {/* Results Count */}
          <p className="text-slate-500 text-sm mb-6">{filtered.length} courses found</p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(course => <CourseCard key={course.id} course={course} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search size={28} className="text-slate-500" />
              </div>
              <p className="text-white font-semibold text-xl mb-2">No courses found</p>
              <p className="text-slate-500">Try different filters or search terms</p>
              <button onClick={() => { setSearch(''); setCategory('all'); setLevel('all'); setPriceFilter('all'); }}
                className="btn-secondary mt-6 text-sm">Clear Filters</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
