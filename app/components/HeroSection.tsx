'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Brain, Target, Zap } from 'lucide-react';
import { useRef } from 'react';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const floatingIcons = [
    { Icon: Brain, x: '10%', y: '20%', delay: 0 },
    { Icon: Target, x: '85%', y: '30%', delay: 0.5 },
    { Icon: Zap, x: '15%', y: '70%', delay: 1 },
  ];

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
            left: '-10%',
            top: '-20%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
            right: '-10%',
            bottom: '-10%',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, x, y: posY, delay }, index) => (
        <motion.div
          key={index}
          className="absolute hidden md:block"
          style={{ left: x, top: posY }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.5 }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon className="w-12 h-12 text-indigo-400/50" />
          </motion.div>
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div style={{ y, opacity, scale }} className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-gradient-to-r from-indigo-500/20 to-pink-500/20 border border-indigo-500/30 rounded-full"
            whileHover={{ scale: 1.05, borderColor: 'rgba(99, 102, 241, 0.6)' }}
          >
            🚀 Khám phá nghề nghiệp phù hợp với bạn
          </motion.span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="block text-gray-800">Định hướng</span>
          <span className="gradient-text">Tương lai</span>
          <span className="block text-gray-800">của bạn</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Hệ thống AI thông minh phân tích tính cách, năng lực và sở thích để gợi ý 
          nghề nghiệp phù hợp nhất với bạn
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="magnetic-btn px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-full font-semibold text-lg"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 0 40px rgba(99, 102, 241, 0.6), 0 0 80px rgba(236, 72, 153, 0.4)' 
            }}
            whileTap={{ scale: 0.95 }}
          >
            Làm bài trắc nghiệm miễn phí
          </motion.button>
          <motion.button
            className="px-8 py-4 border border-gray-300 rounded-full font-semibold text-lg text-gray-700 hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05, borderColor: 'rgba(99, 102, 241, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            Tìm hiểu thêm
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { value: '50K+', label: 'Người dùng' },
            { value: '200+', label: 'Nghề nghiệp' },
            { value: '95%', label: 'Độ chính xác' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-600"
        >
          <span className="text-sm">Cuộn xuống</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
