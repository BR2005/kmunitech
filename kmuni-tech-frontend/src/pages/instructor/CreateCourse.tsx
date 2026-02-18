import React, { useMemo, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { PlusCircle, Trash2, GripVertical, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createInstructorCourse } from '../../utils/api';
import { uploadLessonVideoToSupabase } from '../../utils/supabase';

type LessonForm = {
  id: number;
  title: string;
  description: string;
  duration: string;
  isPreview: boolean;
  videoUrl: string;
  videoFile: File | null;
};

const CATEGORY_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'Web Development', value: 'web-dev' },
  { label: 'AI & ML', value: 'ai-ml' },
  { label: 'Data Science', value: 'data-science' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'DevOps', value: 'devops' },
  { label: 'Design', value: 'design' },
  { label: 'Business', value: 'business' },
];

const LEVEL_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
];

export default function CreateCourse() {
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0].value);
  const [level, setLevel] = useState(LEVEL_OPTIONS[0].value);
  const [price, setPrice] = useState<string>('0');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState('');

  const [lessons, setLessons] = useState<LessonForm[]>([
    { id: 1, title: '', description: '', duration: '', isPreview: false, videoUrl: '', videoFile: null },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addLesson = () => setLessons(prev => [...prev, { id: Date.now(), title: '', description: '', duration: '', isPreview: false, videoUrl: '', videoFile: null }]);
  const removeLesson = (id: number) => setLessons(prev => prev.filter(l => l.id !== id));

  const parsedTags = useMemo(() => {
    const list = tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
    return Array.from(new Set(list));
  }, [tags]);

  const handlePublish = async () => {
    if (!token) {
      setError('Please login as an instructor to publish a course.');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      const lessonsPayload = lessons.map((l, index) => {
        const duration = Number(l.duration);
        return {
          title: l.title.trim(),
          description: l.description.trim() || undefined,
          duration: Number.isFinite(duration) ? duration : 0,
          order: index + 1,
          isPreview: Boolean(l.isPreview),
          videoUrl: l.videoUrl.trim() || undefined,
        };
      });

      // Lightweight client-side validation matching backend constraints
      if (title.trim().length < 5) throw new Error('Course title must be at least 5 characters.');
      if (description.trim().length < 20) throw new Error('Course description must be at least 20 characters.');
      const priceValue = Number(price);
      if (!Number.isFinite(priceValue) || priceValue < 0) throw new Error('Price must be 0 or greater.');
      if (!category) throw new Error('Please select a category.');
      if (!level) throw new Error('Please select a level.');
      if (lessonsPayload.length === 0) throw new Error('Please add at least one lesson.');
      for (const [i, lesson] of lessonsPayload.entries()) {
        if (!lesson.title || lesson.title.length === 0) throw new Error(`Lesson ${i + 1} title is required.`);
        if (!lesson.duration || lesson.duration < 1) throw new Error(`Lesson ${i + 1} duration must be at least 1 minute.`);
        const hasUrl = Boolean(lesson.videoUrl && lesson.videoUrl.length > 0);
        const hasFile = Boolean(lessons[i]?.videoFile);
        if (!hasUrl && !hasFile) throw new Error(`Lesson ${i + 1} needs a video URL or an uploaded file.`);
      }

      // Upload lesson video files to Supabase Storage and use their public URLs
      // (If a lesson has both a URL and a file, the uploaded file wins.)
      for (let i = 0; i < lessonsPayload.length; i += 1) {
        const file = lessons[i]?.videoFile;
        if (!file) continue;

        try {
          const uploaded = await uploadLessonVideoToSupabase({
            file,
            instructorId: user?.id,
            courseTitle: title.trim(),
          });
          lessonsPayload[i] = { ...lessonsPayload[i], videoUrl: uploaded.publicUrl };
        } catch (e: any) {
          throw new Error(`Lesson ${i + 1} video upload failed: ${e?.message || 'Unknown error'}`);
        }
      }

      const created = await createInstructorCourse({
        title: title.trim(),
        description: description.trim(),
        thumbnail: thumbnail.trim() || undefined,
        price: priceValue,
        level,
        category,
        tags: parsedTags,
        lessons: lessonsPayload,
      }, token);

      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
      navigate('/instructor/courses');
    } catch (e: any) {
      setError(e?.message || 'Failed to publish course.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8"><h1 className="text-2xl font-bold text-white">Create New Course</h1><p className="text-slate-400 mt-1">Build and publish your course for students worldwide</p></div>

      <div className="max-w-3xl space-y-6">
        {/* Basic Info */}
        <div className="card p-6">
          <h2 className="text-white font-bold text-lg mb-5">Course Information</h2>
          <div className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-200 rounded-xl p-3 text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Course Title *</label>
              <input
                className="input-field"
                placeholder="e.g. Complete React & TypeScript Masterclass"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Description *</label>
              <textarea
                rows={4}
                className="input-field resize-none"
                placeholder="What will students learn in this course?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Category</label>
                <select
                  className="input-field cursor-pointer"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value} className="bg-[#12141f]">{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Level</label>
                <select
                  className="input-field cursor-pointer"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  {LEVEL_OPTIONS.map((l) => (
                    <option key={l.value} value={l.value} className="bg-[#12141f]">{l.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Price (INR)</label>
                <input
                  type="number"
                  min="0"
                  className="input-field"
                  placeholder="0 for free"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Thumbnail URL</label>
                <input
                  type="url"
                  className="input-field"
                  placeholder="https://..."
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Tags (comma-separated)</label>
              <input
                className="input-field"
                placeholder="React, TypeScript, Frontend..."
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Lessons */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-bold text-lg">Course Lessons</h2>
            <button onClick={addLesson} className="btn-secondary text-sm flex items-center gap-2 py-2"><PlusCircle size={14} /> Add Lesson</button>
          </div>
          <div className="space-y-3">
            {lessons.map((lesson, i) => (
              <div key={lesson.id} className="p-4 bg-white/3 rounded-xl border border-white/5">
                <div className="flex items-start gap-3">
                  <GripVertical size={18} className="text-slate-600 mt-3 cursor-grab flex-shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 text-xs font-bold flex-shrink-0">{i + 1}</div>
                      <input
                        className="input-field py-2 text-sm"
                        placeholder={`Lesson ${i + 1} title`}
                        value={lesson.title}
                        onChange={(e) => setLessons(prev => prev.map(l => l.id === lesson.id ? { ...l, title: e.target.value } : l))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        className="input-field py-2 text-sm"
                        placeholder="Description"
                        value={lesson.description}
                        onChange={(e) => setLessons(prev => prev.map(l => l.id === lesson.id ? { ...l, description: e.target.value } : l))}
                      />
                      <input
                        type="number"
                        className="input-field py-2 text-sm"
                        placeholder="Duration (minutes)"
                        min={1}
                        value={lesson.duration}
                        onChange={(e) => setLessons(prev => prev.map(l => l.id === lesson.id ? { ...l, duration: e.target.value } : l))}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-xs font-medium mb-2">Lesson Video (upload) or URL *</label>
                      <div className="flex items-center gap-3 flex-wrap">
                        <label className="btn-secondary text-sm cursor-pointer">
                          Upload Video File
                          <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0] ?? null;
                              setLessons(prev => prev.map(l => l.id === lesson.id ? { ...l, videoFile: file } : l));
                            }}
                          />
                        </label>
                        {lesson.videoFile && (
                          <div className="flex items-center gap-2 text-slate-300 text-sm truncate max-w-full">
                            <span className="truncate max-w-[220px]">{lesson.videoFile.name}</span>
                            <button
                              type="button"
                              onClick={() => setLessons(prev => prev.map(l => l.id === lesson.id ? { ...l, videoFile: null } : l))}
                              className="text-red-300 hover:text-red-200 text-xs"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                      <input
                        type="url"
                        className="input-field py-2 text-sm"
                        placeholder="Or paste a video URL (https://...)"
                        value={lesson.videoUrl}
                        onChange={(e) => setLessons(prev => prev.map(l => l.id === lesson.id ? { ...l, videoUrl: e.target.value } : l))}
                      />
                      <p className="text-slate-500 text-xs mt-2">Udemy-style: upload one file per module, or use a URL.</p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={lesson.isPreview}
                        onChange={(e) => setLessons(prev => prev.map(l => l.id === lesson.id ? { ...l, isPreview: e.target.checked } : l))}
                      />
                      <span className="text-slate-400 text-sm">Free preview lesson</span>
                    </label>
                  </div>
                  {lessons.length > 1 && (
                    <button onClick={() => removeLesson(lesson.id)} className="p-2 text-slate-600 hover:text-red-400 transition-colors flex-shrink-0">
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePublish}
            disabled={isSubmitting}
            className={`btn-primary flex items-center gap-2 ${saved ? 'bg-emerald-600 hover:bg-emerald-600' : ''} ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <Save size={15} />
            {saved ? 'Published!' : (isSubmitting ? 'Publishing...' : 'Publish Course')}
          </button>
          <button className="btn-secondary text-sm" disabled>
            Save as Draft
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
