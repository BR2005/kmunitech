import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Award, Download } from 'lucide-react';

const certs = [
  { id: 1, course: 'DevOps & CI/CD Pipeline', date: 'March 2024', grade: 'A+', hours: 60 },
];

export default function StudentCertificates() {
  return (
    <DashboardLayout>
      <div className="mb-8"><h1 className="text-2xl font-bold text-white">Certificates</h1><p className="text-slate-400 mt-1">Your earned certificates of completion</p></div>
      {certs.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-5">
          {certs.map(cert => (
            <div key={cert.id} className="card p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center"><Award size={22} className="text-white" /></div>
                <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">Completed</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{cert.course}</h3>
              <div className="flex items-center gap-4 text-sm text-slate-400 mb-5">
                <span>Issued: {cert.date}</span>
                <span>{cert.hours}h course</span>
                <span>Grade: <strong className="text-emerald-400">{cert.grade}</strong></span>
              </div>
              <button className="btn-secondary text-sm flex items-center gap-2 py-2.5"><Download size={14} /> Download PDF</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card p-16 text-center">
          <Award size={48} className="text-slate-600 mx-auto mb-4" />
          <p className="text-white font-semibold text-xl mb-2">No certificates yet</p>
          <p className="text-slate-400 mb-6">Complete a course to earn your first certificate</p>
          <a href="/courses" className="btn-primary inline-flex">Browse Courses</a>
        </div>
      )}
    </DashboardLayout>
  );
}
