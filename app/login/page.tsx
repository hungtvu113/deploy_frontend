'use client';

import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Redirect dựa trên role - cần đợi user được cập nhật
      // Lấy role từ token vì user state chưa kịp update
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Fetch user info để lấy role
          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if (data.success && data.data?.vaiTro === 'admin') {
            router.push('/admin');
          } else {
            router.push('/dashboard');
          }
        } catch {
          router.push('/dashboard');
        }
      } else {
        router.push('/dashboard');
      }
    } else {
      setError(result.message || 'Đăng nhập thất bại');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            left: '-15%',
            top: '-20%',
          }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)',
            right: '-10%',
            bottom: '-10%',
          }}
          animate={{ scale: [1.2, 1, 1.2], x: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <motion.div
          className="relative z-10 max-w-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
              <Sparkles className="w-10 h-10 text-indigo-600" />
            </motion.div>
            <span className="text-3xl font-bold gradient-text">CareerAI</span>
          </Link>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Chào mừng trở lại! 👋
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Đăng nhập để tiếp tục hành trình khám phá nghề nghiệp phù hợp với bạn.
          </p>

          {/* Feature highlights */}
          <div className="space-y-4">
            {[
              { icon: '🎯', text: 'Gợi ý nghề nghiệp chính xác với AI' },
              { icon: '📊', text: 'Theo dõi tiến trình phát triển' },
              { icon: '🎓', text: 'Khóa học được cá nhân hóa' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 text-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <span className="text-2xl">{item.icon}</span>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Cute Robot Illustration */}
          <motion.div
            className="relative w-72 h-72 mx-auto mt-8"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
              <defs>
                <linearGradient id="loginRobotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              
              {/* Body */}
              <motion.rect
                x="60" y="95" width="80" height="65" rx="12"
                fill="url(#loginRobotGrad)"
                animate={{ y: [95, 90, 95] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Head */}
              <motion.rect
                x="50" y="25" width="100" height="75" rx="18"
                fill="url(#loginRobotGrad)"
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ originX: '100px', originY: '60px' }}
              />
              
              {/* Face screen */}
              <rect x="60" y="35" width="80" height="55" rx="12" fill="#0f172a" />
              
              {/* Eyes */}
              <motion.g animate={{ x: [-3, 3, -3] }} transition={{ duration: 2.5, repeat: Infinity }}>
                <circle cx="80" cy="58" r="12" fill="white" />
                <circle cx="120" cy="58" r="12" fill="white" />
                <motion.circle cx="80" cy="58" r="6" fill="#0f172a" />
                <motion.circle cx="120" cy="58" r="6" fill="#0f172a" />
                <circle cx="82" cy="55" r="2" fill="white" />
                <circle cx="122" cy="55" r="2" fill="white" />
              </motion.g>
              
              {/* Happy smile */}
              <path d="M80 75 Q100 90 120 75" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" />
              
              {/* Blush */}
              <circle cx="65" cy="70" r="6" fill="#fca5a5" opacity="0.6" />
              <circle cx="135" cy="70" r="6" fill="#fca5a5" opacity="0.6" />
              
              {/* Antenna */}
              <motion.g
                animate={{ rotate: [-15, 15, -15] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ originX: '100px', originY: '25px' }}
              >
                <rect x="96" y="5" width="8" height="25" rx="4" fill="#8b5cf6" />
                <motion.circle
                  cx="100" cy="5" r="10"
                  fill="#fbbf24"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.g>
              
              {/* Arms waving */}
              <motion.g
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ originX: '60px', originY: '110px' }}
              >
                <rect x="25" y="100" width="40" height="18" rx="9" fill="url(#loginRobotGrad)" />
                <circle cx="25" cy="109" r="10" fill="#a78bfa" />
              </motion.g>
              
              <motion.g
                animate={{ rotate: [0, -15, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{ originX: '140px', originY: '110px' }}
              >
                <rect x="135" y="100" width="40" height="18" rx="9" fill="url(#loginRobotGrad)" />
                <circle cx="175" cy="109" r="10" fill="#a78bfa" />
              </motion.g>
              
              {/* Legs */}
              <rect x="70" y="155" width="22" height="30" rx="8" fill="#4f46e5" />
              <rect x="108" y="155" width="22" height="30" rx="8" fill="#4f46e5" />
              
              {/* Feet */}
              <ellipse cx="81" cy="188" rx="14" ry="8" fill="#312e81" />
              <ellipse cx="119" cy="188" rx="14" ry="8" fill="#312e81" />
              
              {/* Heart on chest */}
              <motion.path
                d="M100 115 C95 108 85 108 85 118 C85 125 100 135 100 135 C100 135 115 125 115 118 C115 108 105 108 100 115"
                fill="#ec4899"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ originX: '100px', originY: '120px' }}
              />
            </svg>

            {/* Floating elements */}
            {['🔐', '✨', '💜'].map((emoji, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${10 + i * 100}px`,
                  top: `${20 + (i % 2) * 180}px`,
                }}
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2.5 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <Sparkles className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold gradient-text">CareerAI</span>
          </Link>

          {/* Form card */}
          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-100"
            whileHover={{ boxShadow: '0 25px 50px rgba(99, 102, 241, 0.15)' }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Đăng nhập</h2>
            <p className="text-gray-500 mb-6">Nhập thông tin để tiếp tục</p>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 mb-4"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <motion.input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white/50"
                    placeholder="name@example.com"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <motion.input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white/50"
                    placeholder="••••••••"
                    whileFocus={{ scale: 1.01 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Quên mật khẩu?
                </Link>
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl font-semibold text-white relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <>
                      Đăng nhập
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-400">hoặc</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social login */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Google', icon: '🔵', bg: 'hover:bg-blue-50' },
                { name: 'Facebook', icon: '📘', bg: 'hover:bg-indigo-50' },
              ].map((provider) => (
                <motion.button
                  key={provider.name}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 ${provider.bg} transition-colors`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{provider.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{provider.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Sign up link */}
            <p className="text-center mt-8 text-gray-600">
              Chưa có tài khoản?{' '}
              <Link href="/register" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                Đăng ký ngay
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
