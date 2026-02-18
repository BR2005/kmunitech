import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { PlusCircle, Trash2, GripVertical, Save, Upload, Video } from 'lucide-react';

export default function CreateCourse() {
  const [lessons, setLessons] = useState([{ id: 1, title: '', description: '', duration: '', isPreview: false }]);
  const [saved, setSaved] = useState(false);
  const [promoVideo, setPromoVideo] = useState<File | null>(null);
  const [courseVideos, setCourseVideos] = useState<File[]>([]);

  const addLesson = () => setLessons(prev => [...prev, { id: Date.now(), title: '', description: '', duration: '', isPreview: false }]);
  const removeLesson = (id: number) => setLessons(prev => prev.filter(l => l.id !== id));
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setPromoVideo(file);
  };
  const handleCourseVideosUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length) setCourseVideos(prev => [...prev, ...files]);
  };
  const removeCourseVideo = (name: string) => setCourseVideos(prev => prev.filter(f => f.name !== name));

  return (
    <DashboardLayout>
      <div className="mb-8"><h1 className="text-2xl font-bold text-white">Create New Course</h1><p className="text-slate-400 mt-1">Build and publish your course for students worldwide</p></div>

      <div className="max-w-3xl space-y-6">
        {/* Basic Info */}
        <div className="card p-6">
          <h2 className="text-white font-bold text-lg mb-5">Course Information</h2>
          <div className="space-y-4">
            <div><label className="block text-slate-300 text-sm font-medium mb-2">Course Title *</label><input className="input-field" placeholder="e.g. Complete React & TypeScript Masterclass" /></div>
            <div><label className="block text-slate-300 text-sm font-medium mb-2">Description *</label><textarea rows={4} className="input-field resize-none" placeholder="What will students learn in this course?" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Category</label>
                <select className="input-field cursor-pointer">
                  {['Web Development','AI & ML','Data Science','Mobile','DevOps','Design','Business'].map(c => <option key={c} className="bg-[#12141f]">{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Level</label>
                <select className="input-field cursor-pointer">
                  {['Beginner','Intermediate','Advanced'].map(l => <option key={l} className="bg-[#12141f]">{l}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Price (INR)</label>
                <input type="number" min="0" className="input-field" placeholder="0 for free" />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Thumbnail URL</label>
                <input type="url" className="input-field" placeholder="https://..." />
              </div>
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Intro / Promo Video</label>
              <div className="flex items-center gap-3 flex-wrap">
                <label htmlFor="promoVideo" className="btn-secondary text-sm flex items-center gap-2 cursor-pointer">
                  <Upload size={14} /> {promoVideo ? 'Replace Video' : 'Upload Video'}
                </label>
                <input id="promoVideo" type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
                {promoVideo && (
                  <div className="flex items-center gap-2 text-slate-300 text-sm truncate max-w-full">
                    <span className="truncate max-w-[220px]">{promoVideo.name}</span>
                    <button type="button" onClick={() => setPromoVideo(null)} className="text-red-300 hover:text-red-200 text-xs">
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <p className="text-slate-500 text-xs mt-2">MP4/WEBM up to ~500MB recommended. The file will be sent when you publish.</p>
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Tags (comma-separated)</label>
              <input className="input-field" placeholder="React, TypeScript, Frontend..." />
            </div>
            <div className="space-y-3">
              <label className="block text-slate-300 text-sm font-medium">Course Content Videos</label>
              <div className="flex items-center gap-3 flex-wrap">
                <label htmlFor="courseVideos" className="btn-secondary text-sm flex items-center gap-2 cursor-pointer">
                  <Video size={14} /> {courseVideos.length ? 'Add More Videos' : 'Upload Course Videos'}
                </label>
                <input id="courseVideos" type="file" accept="video/*" multiple className="hidden" onChange={handleCourseVideosUpload} />
                {courseVideos.length > 0 && <span className="text-slate-400 text-sm">{courseVideos.length} file(s) attached</span>}
              </div>
              {courseVideos.length > 0 && (
                <div className="bg-white/3 rounded-xl border border-white/5 p-3 space-y-2 max-h-40 overflow-auto">
                  {courseVideos.map(file => (
                    <div key={file.name} className="flex items-center justify-between text-sm text-slate-300">
                      <span className="truncate max-w-[260px]">{file.name}</span>
                      <button type="button" onClick={() => removeCourseVideo(file.name)} className="text-red-300 hover:text-red-200 text-xs">Remove</button>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-slate-500 text-xs">Attach full course videos (multiple files allowed). Files will be sent when you publish.</p>
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
                      <input className="input-field py-2 text-sm" placeholder={`Lesson ${i+1} title`} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input className="input-field py-2 text-sm" placeholder="Description" />
                      <input type="number" className="input-field py-2 text-sm" placeholder="Duration (minutes)" />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
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
          <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
            className={`btn-primary flex items-center gap-2 ${saved ? 'bg-emerald-600 hover:bg-emerald-600' : ''}`}>
            <Save size={15} /> {saved ? 'Published!' : 'Publish Course'}
          </button>
          <button className="btn-secondary text-sm">Save as Draft</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
