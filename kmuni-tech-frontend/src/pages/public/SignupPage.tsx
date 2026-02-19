import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  BookOpen,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  GraduationCap,
  Briefcase,
} from 'lucide-react';

export default function SignupPage() {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const defaultRole = (location.state as any)?.role || 'student';
  const logoSrc = `${import.meta.env.BASE_URL}kmunitech-logo.png.jpeg`;

  const [role, setRole] = useState<'student' | 'instructor'>(defaultRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    if (!name.trim()) return 'Please enter your full name.';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return 'Please enter a valid email.';
    if (password.length < 8) return 'Password must be at least 8 characters.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    const result = await signup({
      name,
      email,
      password,
      confirmPassword,
      role,
    });
    if (result.success) {
      navigate(
        role === 'student' ? '/student/dashboard' : '/instructor/dashboard',
        { replace: true }
      );
    } else {
      setError(result.message);
    }
  };

  const strength =
    password.length === 0
      ? 0
      : password.length < 6
        ? 1
        : password.length < 10
          ? 2
          : 3;
  const strengthColors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-emerald-500'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];

  return (
    <div className="min-h-screen bg-[#0d0f1a] flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-purple-900/30 via-[#0d0f1a] to-indigo-900/20 border-r border-white/5 p-12 relative overflow-hidden">
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <Link to="/" className="flex items-center gap-3 transition-all group mb-12">
          <div className="w-11 h-11 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all">
            <img src={logoSrc} alt="KM UniTech logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-white font-bold text-lg">KM</span>
            <span className="text-indigo-400 font-bold text-lg"> UniTech</span>
          </div>
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
            {role === 'student'
              ? 'Start Learning Today'
              : 'Share Your Expertise'}
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            {role === 'student'
              ? 'Join thousands of learners building real-world skills with expert guidance.'
              : 'Create courses, reach students worldwide, and build your teaching career.'}
          </p>
          <div className="space-y-4">
            {(role === 'student'
              ? [
                '✅ Access 200+ free and paid courses',
                '📈 Track your learning progress',
                '🏆 Earn verified certificates',
                '🤝 Join a community of 50K+ learners',
              ]
              : [
                '🎥 Create and publish courses easily',
                '💰 Earn from paid courses',
                '📊 Detailed analytics dashboard',
                '👥 Reach thousands of students',
              ]
            ).map((item) => (
              <div key={item} className="text-slate-300 text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm"
          >
            <ArrowLeft size={15} /> Back to home
          </Link>

          <h1 className="text-3xl font-bold text-white mb-2">Create account</h1>
          <p className="text-slate-400 mb-8">
            Join KMUni Tech as a student or instructor
          </p>

          {/* Role Toggle */}
          <div className="flex gap-3 mb-7">
            {[
              {
                value: 'student',
                label: 'I want to learn',
                icon: GraduationCap,
                color: 'from-emerald-500 to-teal-500',
              },
              {
                value: 'instructor',
                label: 'I want to teach',
                icon: Briefcase,
                color: 'from-blue-500 to-indigo-500',
              },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setRole(opt.value as any)}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${role === opt.value
                    ? 'border-indigo-500/50 bg-indigo-500/10 text-white'
                    : 'border-white/10 bg-white/3 text-slate-400 hover:border-white/20'
                  }`}
              >
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${opt.color} rounded-xl flex items-center justify-center`}
                >
                  <opt.icon size={18} className="text-white" />
                </div>
                <span className="text-sm font-medium">{opt.label}</span>
              </button>
            ))}
          </div>

          {error && (
            <div className="flex items-center gap-2.5 p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-5 text-red-400 text-sm">
              <AlertCircle size={16} className="flex-shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="input-field"
              />
            </div>
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
                  placeholder="Min 8 characters"
                  className="input-field pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${i <= strength ? strengthColors[strength] : 'bg-white/10'}`}
                      />
                    ))}
                  </div>
                  <span
                    className={`text-xs ${strength === 1 ? 'text-red-400' : strength === 2 ? 'text-yellow-400' : 'text-emerald-400'}`}
                  >
                    {strengthLabels[strength]}
                  </span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="input-field pr-12"
                />
                {confirmPassword && password === confirmPassword && (
                  <CheckCircle
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400"
                  />
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3.5 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />{' '}
                  Creating account...
                </>
              ) : (
                `Create ${role} account`
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Sign in
            </Link>
          </p>

          <p className="text-center text-slate-600 text-xs mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
