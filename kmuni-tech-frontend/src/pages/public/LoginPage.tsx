import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const result = await login({ email, password });
    if (result.success) {
      // Redirect based on role
      const user = JSON.parse(localStorage.getItem('kmuni_user') || '{}');
      const roleRedirects: Record<string, string> = {
        student: '/student/dashboard',
        instructor: '/instructor/dashboard',
        admin: '/admin/dashboard',
      };
      navigate(roleRedirects[user.role] || from, { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f1a] flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-indigo-900/40 via-[#0d0f1a] to-purple-900/20 border-r border-white/5 p-12 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <Link to="/" className="flex items-center gap-2.5 mb-12">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <span className="text-white font-bold text-xl">
            KMUni<span className="text-indigo-400"> Tech</span>
          </span>
        </Link>

        {/* Illustration */}
        <div className="relative z-10 mb-12 flex justify-center">
          <svg
            viewBox="0 0 400 300"
            className="w-80 h-56 relative"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>

            {/* Person body */}
            <circle cx="100" cy="80" r="22" fill="url(#grad1)" opacity="0.9" />
            {/* Person torso */}
            <rect
              x="82"
              y="105"
              width="36"
              height="50"
              rx="4"
              fill="url(#grad1)"
              opacity="0.85"
            />
            {/* Person arms */}
            <rect
              x="60"
              y="115"
              width="20"
              height="12"
              rx="6"
              fill="url(#grad1)"
              opacity="0.8"
            />
            <rect
              x="120"
              y="115"
              width="20"
              height="12"
              rx="6"
              fill="url(#grad1)"
              opacity="0.8"
            />
            {/* Person legs */}
            <rect
              x="85"
              y="160"
              width="10"
              height="35"
              rx="5"
              fill="#06b6d4"
              opacity="0.75"
            />
            <rect
              x="105"
              y="160"
              width="10"
              height="35"
              rx="5"
              fill="#06b6d4"
              opacity="0.75"
            />

            {/* Book 1 */}
            <rect
              x="200"
              y="100"
              width="35"
              height="45"
              rx="3"
              fill="#06b6d4"
              opacity="0.7"
            />
            <line
              x1="202"
              y1="110"
              x2="232"
              y2="110"
              stroke="#0d0f1a"
              strokeWidth="1.5"
            />
            <line
              x1="202"
              y1="120"
              x2="232"
              y2="120"
              stroke="#0d0f1a"
              strokeWidth="1.5"
            />
            <line
              x1="202"
              y1="130"
              x2="230"
              y2="130"
              stroke="#0d0f1a"
              strokeWidth="1.5"
            />

            {/* Book 2 */}
            <rect
              x="245"
              y="95"
              width="35"
              height="50"
              rx="3"
              fill="#3b82f6"
              opacity="0.7"
            />
            <line
              x1="247"
              y1="110"
              x2="277"
              y2="110"
              stroke="#0d0f1a"
              strokeWidth="1.5"
            />
            <line
              x1="247"
              y1="125"
              x2="277"
              y2="125"
              stroke="#0d0f1a"
              strokeWidth="1.5"
            />
            <line
              x1="247"
              y1="140"
              x2="275"
              y2="140"
              stroke="#0d0f1a"
              strokeWidth="1.5"
            />

            {/* Computer/Device */}
            <rect
              x="180"
              y="155"
              width="80"
              height="50"
              rx="4"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="2.5"
              opacity="0.8"
            />
            <rect
              x="185"
              y="160"
              width="70"
              height="35"
              fill="#0d0f1a"
              rx="2"
            />
            {/* Screen content - learning elements */}
            <circle cx="200" cy="175" r="4" fill="#06b6d4" opacity="0.9" />
            <circle cx="215" cy="175" r="4" fill="#3b82f6" opacity="0.9" />
            <circle cx="230" cy="175" r="4" fill="#06b6d4" opacity="0.9" />
            <line
              x1="190"
              y1="185"
              x2="235"
              y2="185"
              stroke="#3b82f6"
              strokeWidth="1.5"
              opacity="0.8"
            />
            {/* Keyboard */}
            <rect
              x="185"
              y="197"
              width="70"
              height="8"
              rx="2"
              fill="url(#grad1)"
              opacity="0.7"
            />

            {/* Decorative stars/achievement */}
            <polygon
              points="320,120 325,130 335,130 328,140 333,150 320,145 307,150 312,140 305,130 315,130"
              fill="url(#grad1)"
              opacity="0.75"
            />
            <circle cx="350" cy="110" r="3" fill="#06b6d4" opacity="0.7" />
            <circle cx="360" cy="125" r="2.5" fill="#3b82f6" opacity="0.6" />
          </svg>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Welcome back to
            <br />
            your learning journey
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Continue where you left off. Access your courses, track progress,
            and keep growing.
          </p>
          <div className="space-y-4">
            {[
              { icon: '🎓', text: 'Access all your enrolled courses' },
              { icon: '📊', text: 'Track your learning progress' },
              { icon: '🏆', text: 'Earn and view your certificates' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <span className="text-slate-300 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm"
          >
            <ArrowLeft size={15} /> Back to home
          </Link>

          <h1 className="text-3xl font-bold text-white mb-2">Sign in</h1>
          <p className="text-slate-400 mb-8">
            Enter your credentials to access your account
          </p>

          {error && (
            <div className="flex items-center gap-2.5 p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-5 text-red-400 text-sm">
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <button
                type="button"
                className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />{' '}
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Create one free
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
