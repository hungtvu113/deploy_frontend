'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, Lock, Eye, EyeOff, User, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const passwordRequirements = [
  { id: 'length', label: 'Ít nhất 6 ký tự', check: (p: string) => p.length >= 6 },
  { id: 'upper', label: 'Có chữ hoa', check: (p: string) => /[A-Z]/.test(p) },
  { id: 'number', label: 'Có số', check: (p: string) => /[0-9]/.test(p) },
];

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (step === 1) {
      // Validate step 1
      if (!formData.name.trim() || !formData.email.trim()) {
        setError('Vui lòng điền đầy đủ thông tin');
        return;
      }
      setStep(2);
      return;
    }

    // Validate step 2
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (!formData.agreeTerms) {
      setError('Vui lòng đồng ý với điều khoản sử dụng');
      return;
    }

    setIsLoading(true);
    const result = await register(formData.name, formData.email, formData.password);

    if (result.success) {
      setStep(3); // Success state
    } else {
      setError(result.message || 'Đăng ký thất bại');
    }
    setIsLoading(false);
  };

  const passwordStrength = passwordRequirements.filter((req) => req.check(formData.password)).length;

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-pink-50">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)',
            right: '-15%',
            top: '-20%',
          }}
          animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            left: '-10%',
            bottom: '-10%',
          }}
          animate={{ scale: [1.2, 1, 1.2], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#ec4899 1px, transparent 1px), linear-gradient(90deg, #ec4899 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
              <Sparkles className="w-8 h-8 text-indigo-600" />
            </motion.div>
            <span className="text-2xl font-bold gradient-text">CareerAI</span>
          </Link>

          {/* Progress steps */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= s
                      ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  animate={{ scale: step === s ? 1.1 : 1 }}
                >
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </motion.div>
                {s < 3 && (
                  <div className={`w-12 h-1 mx-1 rounded ${step > s ? 'bg-gradient-to-r from-indigo-500 to-pink-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Form card */}
          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-100"
            whileHover={{ boxShadow: '0 25px 50px rgba(236, 72, 153, 0.12)' }}
          >
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Tạo tài khoản</h2>
                  <p className="text-gray-500 mb-6">Bắt đầu hành trình khám phá nghề nghiệp</p>

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
                    {/* Name field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-white/50"
                          placeholder="Nguyễn Văn A"
                          required
                        />
                      </div>
                    </div>

                    {/* Email field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-white/50"
                          placeholder="name@example.com"
                          required
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full py-4 rounded-xl font-semibold text-white relative overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)' }}
                      whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(236, 72, 153, 0.4)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Tiếp tục
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Tạo mật khẩu</h2>
                  <p className="text-gray-500 mb-6">Bảo vệ tài khoản của bạn</p>

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
                    {/* Password field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-white/50"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>

                      {/* Password strength */}
                      <div className="mt-3 space-y-2">
                        <div className="flex gap-1">
                          {[1, 2, 3].map((level) => (
                            <motion.div
                              key={level}
                              className="h-1.5 flex-1 rounded-full"
                              animate={{
                                backgroundColor: passwordStrength >= level
                                  ? level === 1 ? '#ef4444' : level === 2 ? '#f59e0b' : '#10b981'
                                  : '#e5e7eb',
                              }}
                            />
                          ))}
                        </div>
                        <div className="space-y-1">
                          {passwordRequirements.map((req) => (
                            <motion.div
                              key={req.id}
                              className="flex items-center gap-2 text-sm"
                              animate={{ color: req.check(formData.password) ? '#10b981' : '#9ca3af' }}
                            >
                              <motion.div
                                animate={{ scale: req.check(formData.password) ? 1 : 0.8 }}
                              >
                                {req.check(formData.password) ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border-2 border-current" />
                                )}
                              </motion.div>
                              {req.label}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Confirm password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-white/50"
                          placeholder="••••••••"
                          required
                        />
                        {formData.confirmPassword && (
                          <motion.div
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            {formData.password === formData.confirmPassword ? (
                              <Check className="w-5 h-5 text-green-500" />
                            ) : (
                              <span className="text-red-500 text-sm">✗</span>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Terms */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                        className="w-5 h-5 mt-0.5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                        required
                      />
                      <span className="text-sm text-gray-600">
                        Tôi đồng ý với{' '}
                        <Link href="/terms" className="text-indigo-600 hover:underline">Điều khoản sử dụng</Link>
                        {' '}và{' '}
                        <Link href="/privacy" className="text-indigo-600 hover:underline">Chính sách bảo mật</Link>
                      </span>
                    </label>

                    <div className="flex gap-3">
                      <motion.button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 rounded-xl font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Quay lại
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 py-4 rounded-xl font-semibold text-white relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)' }}
                        whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(236, 72, 153, 0.4)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isLoading ? (
                          <motion.div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                        ) : (
                          'Đăng ký'
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Đăng ký thành công! 🎉</h2>
                  <p className="text-gray-500 mb-8">
                    Chào mừng {formData.name} đến với CareerAI!
                  </p>
                  <Link href="/dashboard">
                    <motion.button
                      className="px-8 py-4 rounded-xl font-semibold text-white"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Vào Dashboard
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login link */}
            {step < 3 && (
              <p className="text-center mt-8 text-gray-600">
                Đã có tài khoản?{' '}
                <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                  Đăng nhập
                </Link>
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Right side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <motion.div
          className="relative z-10 max-w-lg text-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated illustration */}
          <motion.div
            className="relative w-80 h-80 mx-auto mb-8"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Robot SVG */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <linearGradient id="robotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              {/* Body */}
              <motion.rect
                x="60" y="90" width="80" height="70" rx="10"
                fill="url(#robotGrad)"
                animate={{ y: [90, 85, 90] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Head */}
              <motion.rect
                x="55" y="30" width="90" height="65" rx="15"
                fill="url(#robotGrad)"
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ originX: '100px', originY: '60px' }}
              />
              {/* Eyes */}
              <circle cx="80" cy="55" r="10" fill="white" />
              <circle cx="120" cy="55" r="10" fill="white" />
              <motion.circle
                cx="80" cy="55" r="5" fill="#0f172a"
                animate={{ cx: [78, 82, 78] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle
                cx="120" cy="55" r="5" fill="#0f172a"
                animate={{ cx: [118, 122, 118] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Smile */}
              <path d="M85 75 Q100 85 115 75" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Antenna */}
              <motion.g
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ originX: '100px', originY: '30px' }}
              >
                <rect x="97" y="10" width="6" height="25" rx="3" fill="#8b5cf6" />
                <circle cx="100" cy="10" r="8" fill="#ec4899" />
              </motion.g>
              {/* Arms */}
              <motion.rect
                x="30" y="100" width="35" height="15" rx="7"
                fill="url(#robotGrad)"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ originX: '60px', originY: '107px' }}
              />
              <motion.rect
                x="135" y="100" width="35" height="15" rx="7"
                fill="url(#robotGrad)"
                animate={{ rotate: [0, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ originX: '140px', originY: '107px' }}
              />
              {/* Legs */}
              <rect x="70" y="155" width="20" height="30" rx="5" fill="#4f46e5" />
              <rect x="110" y="155" width="20" height="30" rx="5" fill="#4f46e5" />
            </svg>

            {/* Floating elements */}
            {['✨', '🎯', '💼', '🚀'].map((emoji, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${20 + i * 50}px`,
                  top: `${30 + (i % 2) * 120}px`,
                }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Khám phá tiềm năng của bạn
          </h2>
          <p className="text-gray-600 text-lg">
            Tham gia cùng hơn 50,000+ người dùng đã tìm được định hướng nghề nghiệp phù hợp với CareerAI
          </p>
        </motion.div>
      </div>
    </div>
  );
}
