import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0b14] border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen size={18} className="text-white" />
              </div>
              <span className="text-white font-bold text-lg">
                KMUni<span className="text-indigo-400"> Tech</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering learners and instructors with world-class education.
              Built by ISquare Tech Solutions.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-white/5 hover:bg-indigo-500/20 border border-white/8 hover:border-indigo-500/30 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {[
                ['Courses', '/courses'],
                ['Instructors', '/instructors'],
                ['Pricing', '/pricing'],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                ['About Us', '/about'],
                ['Careers', '/careers'],
                ['Blog', '/blog'],
                ['Privacy Policy', '/privacy'],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:support@kmunitech.com"
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
              >
                <Mail size={14} /> support@kmunitech.com
              </a>
              <div className="mt-4 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                <p className="text-indigo-300 text-xs font-medium">
                  Admin Access
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Admin login is provided by ISquare Tech Solutions. Contact
                  admin@isquare.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            © 2024 KMUni Tech. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Built with ❤️ by{' '}
            <a
              href="https://isqre.tech/"
              className="text-indigo-400 hover:text-indigo-300"
              target="_blank"
            >
              ISquare Tech Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
