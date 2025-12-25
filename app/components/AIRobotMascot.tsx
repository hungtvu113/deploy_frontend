'use client';

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// Các section và lời giới thiệu tương ứng
const sectionMessages = [
  {
    id: 'hero',
    position: { x: 0, y: 0 },
    message: 'Chào bạn! 👋 Click vào mình để chat! Hoặc scroll xuống để khám phá nhé!',
    side: 'left',
  },
  {
    id: 'features',
    position: { x: -60, y: 0 },
    message: 'Đây là các tính năng nổi bật của CareerAI! ✨',
    side: 'left',
  },
  {
    id: 'how-it-works',
    position: { x: 60, y: 0 },
    message: 'Chỉ 4 bước đơn giản để tìm nghề phù hợp! 🎯',
    side: 'right',
  },
  {
    id: 'testimonials',
    position: { x: -60, y: 0 },
    message: 'Xem người dùng nói gì về chúng mình nè! 💬',
    side: 'left',
  },
  {
    id: 'cta',
    position: { x: 0, y: 0 },
    message: 'Sẵn sàng bắt đầu chưa? Làm quiz miễn phí ngay! 🚀',
    side: 'left',
  },
];

interface AIRobotMascotProps {
  onChatClick?: () => void;
}

export default function AIRobotMascot({ onChatClick }: AIRobotMascotProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isWaving, setIsWaving] = useState(false);
  const { scrollYProgress } = useScroll();

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  // Detect current section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const sections = ['hero', 'features', 'how-it-works', 'testimonials'];
      
      let newSection = 0;
      sections.forEach((id, index) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < windowHeight * 0.5 && rect.bottom > windowHeight * 0.3) {
            newSection = index;
          }
        }
      });

      // Check if near bottom for CTA
      if (scrollY + windowHeight >= document.body.scrollHeight - 300) {
        newSection = 4;
      }

      if (newSection !== currentSection) {
        setCurrentSection(newSection);
        // Wave when changing section
        setIsWaving(true);
        setTimeout(() => setIsWaving(false), 1500);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);

  // Robot horizontal position based on section
  const robotX = useSpring(sectionMessages[currentSection]?.position.x || 0, {
    stiffness: 100,
    damping: 20,
  });

  // Robot vertical movement with scroll
  const baseY = useTransform(smoothProgress, [0, 1], [0, 200]);
  const robotRotate = useTransform(smoothProgress, [0, 0.5, 1], [-3, 3, -3]);

  // Eye tracking mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Random blinking
  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    };
    const interval = setInterval(blink, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  const currentMessage = sectionMessages[currentSection];
  const isRightSide = currentMessage?.side === 'right';

  return (
    <motion.div
      className="fixed top-1/2 z-40 hidden lg:block cursor-pointer"
      style={{
        right: isRightSide ? 'auto' : '20px',
        left: isRightSide ? '20px' : 'auto',
        y: baseY,
        x: robotX,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
      onClick={onChatClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        style={{ rotate: robotRotate }}
        className="relative"
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Glow effect behind robot */}
        <motion.div
          className="absolute inset-0 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #6366f1 0%, #ec4899 50%, transparent 70%)',
            transform: 'scale(1.5)',
          }}
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <svg
          width="160"
          height="250"
          viewBox="0 0 180 280"
          fill="none"
          className="relative z-10 drop-shadow-2xl"
        >
          {/* Definitions */}
          <defs>
            <linearGradient id="suitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>
            <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="tieGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Left Arm - waving animation */}
          <motion.g
            animate={{
              rotate: isWaving ? [0, -30, -20, -35, -15, 0] : [0, 5, 0],
            }}
            transition={{
              duration: isWaving ? 1.5 : 2,
              repeat: isWaving ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            style={{ originX: '50px', originY: '140px' }}
          >
            <path
              d="M35 140 Q20 160 25 200 Q28 220 40 225"
              stroke="url(#suitGradient)"
              strokeWidth="25"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="40" cy="228" r="12" fill="#a78bfa" />
            {/* Waving hand fingers */}
            {isWaving && (
              <>
                <motion.line
                  x1="35" y1="220" x2="25" y2="210"
                  stroke="#a78bfa" strokeWidth="4" strokeLinecap="round"
                  animate={{ rotate: [-10, 10, -10] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                />
              </>
            )}
          </motion.g>

          {/* Right Arm - pointing */}
          <motion.g
            animate={{
              rotate: isRightSide ? [0, -5, 0] : [0, 5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '130px', originY: '140px' }}
          >
            <path
              d="M145 140 Q160 160 155 200 Q152 220 140 225"
              stroke="url(#suitGradient)"
              strokeWidth="25"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="140" cy="228" r="12" fill="#a78bfa" />
            {/* Pointing finger */}
            <motion.path
              d="M148 220 L165 205"
              stroke="#a78bfa"
              strokeWidth="6"
              strokeLinecap="round"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.g>

          {/* Torso - Suit Jacket */}
          <path
            d="M50 130 L50 220 Q50 240 70 245 L110 245 Q130 240 130 220 L130 130 Z"
            fill="url(#suitGradient)"
          />

          {/* Shirt */}
          <path d="M70 130 L70 180 L110 180 L110 130 Z" fill="url(#shirtGradient)" />

          {/* Tie */}
          <path d="M90 130 L82 145 L90 200 L98 145 Z" fill="url(#tieGradient)" />

          {/* Suit Lapels */}
          <path d="M70 130 L50 145 L50 130 Z" fill="#312e81" />
          <path d="M110 130 L130 145 L130 130 Z" fill="#312e81" />

          {/* Neck */}
          <rect x="75" y="110" width="30" height="25" rx="5" fill="#a78bfa" />

          {/* Head */}
          <motion.g
            animate={{ rotate: isRightSide ? 5 : -5 }}
            transition={{ duration: 0.5 }}
            style={{ originX: '90px', originY: '70px' }}
          >
            <rect x="45" y="20" width="90" height="95" rx="20" fill="url(#headGradient)" />

            {/* Face Screen */}
            <rect x="55" y="35" width="70" height="55" rx="10" fill="url(#screenGradient)" />

            {/* Eyes */}
            <motion.g
              animate={{ x: mousePos.x * 0.3, y: mousePos.y * 0.3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <motion.ellipse
                cx="75"
                cy="60"
                rx={8}
                ry={isBlinking ? 1 : 10}
                fill="#06b6d4"
                filter="url(#glow)"
              />
              <motion.ellipse
                cx="105"
                cy="60"
                rx={8}
                ry={isBlinking ? 1 : 10}
                fill="#06b6d4"
                filter="url(#glow)"
              />
              <circle cx="78" cy="56" r="3" fill="white" opacity="0.8" />
              <circle cx="108" cy="56" r="3" fill="white" opacity="0.8" />
            </motion.g>

            {/* Mouth - changes based on state */}
            <motion.g animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }}>
              {isWaving ? (
                // Happy smile when waving
                <path
                  d="M75 78 Q90 88 105 78"
                  stroke="#10b981"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              ) : (
                // LED dots normally
                <>
                  <rect x="70" y="75" width="6" height="6" rx="1" fill="#10b981" />
                  <rect x="80" y="75" width="6" height="6" rx="1" fill="#10b981" />
                  <rect x="90" y="75" width="6" height="6" rx="1" fill="#10b981" />
                  <rect x="100" y="75" width="6" height="6" rx="1" fill="#10b981" />
                </>
              )}
            </motion.g>

            {/* Antenna */}
            <motion.g
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ originX: '90px', originY: '20px' }}
            >
              <rect x="87" y="5" width="6" height="20" rx="3" fill="#8b5cf6" />
              <motion.circle
                cx="90"
                cy="5"
                r="6"
                fill="#ec4899"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                filter="url(#glow)"
              />
            </motion.g>

            {/* Ear pieces */}
            <rect x="35" y="50" width="12" height="25" rx="6" fill="#7c3aed" />
            <rect x="133" y="50" width="12" height="25" rx="6" fill="#7c3aed" />
          </motion.g>

          {/* Legs */}
          <motion.g
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          >
            <rect x="60" y="245" width="20" height="30" rx="5" fill="#1e1b4b" />
            <rect x="100" y="245" width="20" height="30" rx="5" fill="#1e1b4b" />
            <ellipse cx="70" cy="278" rx="15" ry="6" fill="#0f172a" />
            <ellipse cx="110" cy="278" rx="15" ry="6" fill="#0f172a" />
          </motion.g>
        </svg>

        {/* Speech bubble with message */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            className={`absolute top-5 ${isRightSide ? '-right-44' : '-left-48'} w-44`}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 border border-indigo-200 shadow-lg">
              <p className="text-sm text-gray-700 font-medium leading-snug">
                {currentMessage?.message}
              </p>
              {/* Bubble tail */}
              <div
                className={`absolute top-4 ${isRightSide ? '-left-2' : '-right-2'} w-0 h-0`}
                style={{
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  [isRightSide ? 'borderRight' : 'borderLeft']: '8px solid rgba(255,255,255,0.95)',
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Section indicator dots */}
        <div className={`absolute bottom-0 ${isRightSide ? '-right-16' : '-left-16'} flex flex-col gap-2`}>
          {sectionMessages.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full"
              animate={{
                scale: currentSection === index ? 1.3 : 1,
                backgroundColor: currentSection === index ? '#6366f1' : '#d1d5db',
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Floating particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 2 === 0 ? '#6366f1' : '#ec4899',
              left: `${30 + i * 35}px`,
              top: `${60 + i * 50}px`,
              boxShadow: `0 0 8px ${i % 2 === 0 ? '#6366f1' : '#ec4899'}`,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.4, 0.9, 0.4],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
