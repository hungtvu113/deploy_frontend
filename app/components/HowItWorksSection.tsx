'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ClipboardList, Cpu, Lightbulb, Rocket } from 'lucide-react';
import { useRef, useEffect, useState, useMemo } from 'react';

const steps = [
  {
    icon: ClipboardList,
    title: 'Làm bài trắc nghiệm',
    description: 'Hoàn thành các bài test tính cách và năng lực chỉ trong 15 phút',
    color: '#6366f1',
  },
  {
    icon: Cpu,
    title: 'AI phân tích',
    description: 'Hệ thống AI xử lý dữ liệu và phân tích đặc điểm của bạn',
    color: '#ec4899',
  },
  {
    icon: Lightbulb,
    title: 'Nhận gợi ý',
    description: 'Xem danh sách nghề nghiệp phù hợp với mô tả chi tiết',
    color: '#06b6d4',
  },
  {
    icon: Rocket,
    title: 'Phát triển sự nghiệp',
    description: 'Theo dõi lộ trình và khóa học để đạt mục tiêu nghề nghiệp',
    color: '#10b981',
  },
];

// Floating particles - memoized để tránh re-render
const FloatingParticles = ({ color }: { color: string }) => {
  const particles = useMemo(() => 
    [...Array(12)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: color,
            left: p.left,
            top: p.top,
            boxShadow: `0 0 10px ${color}`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// 3D Card - fix flickering bằng cách tách hover zone ra khỏi animated element
function StepCard({ step, index, progress }: { step: typeof steps[0]; index: number; progress: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(mouseY, { stiffness: 100, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 100, damping: 20 });
  
  const isActive = progress > index / steps.length && progress < (index + 1) / steps.length;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Hover zone - cố định, không transform */}
      <div
        className="relative"
        style={{ perspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Card với 3D transform */}
        <motion.div
          className="relative p-8 rounded-3xl overflow-hidden"
          style={{
            rotateX,
            rotateY,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9))',
            border: `1px solid ${isActive || isHovered ? step.color + '60' : 'rgba(0,0,0,0.08)'}`,
            boxShadow: isActive || isHovered
              ? `0 0 40px ${step.color}25, 0 20px 40px rgba(0,0,0,0.1)`
              : '0 20px 40px rgba(0,0,0,0.08)',
            transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
          }}
        >
          {/* Glow overlay */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${step.color}20, transparent 70%)`,
              opacity: isHovered || isActive ? 1 : 0,
            }}
          />

          {/* Particles */}
          {isHovered && <FloatingParticles color={step.color} />}

          {/* Step number */}
          <div
            className="absolute -top-4 -left-4 w-14 h-14 rounded-xl flex items-center justify-center text-xl font-black z-10 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${step.color}, ${step.color}99)`,
              boxShadow: `0 0 25px ${step.color}50`,
            }}
          >
            <span className="relative z-10">{index + 1}</span>
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          </div>

          {/* Icon */}
          <div className="relative w-20 h-20 mx-auto mb-6 mt-4">
            {/* Orbit ring */}
            <motion.div
              className="absolute inset-[-8px] rounded-full border border-dashed pointer-events-none"
              style={{ borderColor: `${step.color}40` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Icon bg */}
            <div
              className="w-full h-full rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${step.color}25, ${step.color}10)`,
                border: `1px solid ${step.color}50`,
              }}
            >
              <step.icon
                className="w-10 h-10"
                style={{ color: step.color, filter: `drop-shadow(0 0 8px ${step.color})` }}
              />
            </div>
            
            {/* Pulse */}
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{ border: `2px solid ${step.color}` }}
              animate={{ scale: [1, 1.2], opacity: [0.6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>

          {/* Content */}
          <div className="text-center relative z-10">
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: step.color }}
            >
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
          </div>

          {/* Bottom line */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 pointer-events-none"
            style={{ background: `linear-gradient(90deg, ${step.color}, ${step.color}50)` }}
            initial={{ width: '0%' }}
            animate={{ width: isHovered || isActive ? '100%' : '0%' }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}


export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const progress = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const unsubscribe = progress.on('change', (v) => setProgressValue(v));
    return () => unsubscribe();
  }, [progress]);

  // Parallax
  const titleY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
          left: '-15%',
          top: '10%',
        }}
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)',
          right: '-10%',
          bottom: '10%',
        }}
        animate={{ scale: [1.1, 1, 1.1], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Progress sidebar */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-3">
        <div className="relative h-40 w-1 bg-gray-300 rounded-full overflow-hidden">
          <motion.div
            className="absolute bottom-0 left-0 w-full rounded-full"
            style={{
              background: 'linear-gradient(to top, #6366f1, #ec4899, #06b6d4, #10b981)',
              height: `${progressValue * 100}%`,
              boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)',
            }}
          />
        </div>
        {steps.map((step, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              background: progressValue > i / steps.length ? step.color : 'rgba(0,0,0,0.15)',
              boxShadow: progressValue > i / steps.length ? `0 0 12px ${step.color}` : 'none',
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-5 text-sm font-medium rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(99, 102, 241, 0.15))',
              border: '1px solid rgba(236, 72, 153, 0.25)',
            }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-pink-500"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-pink-300">Quy trình đơn giản</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            <span className="gradient-text">4 bước</span>{' '}
            <span className="text-gray-800">khám phá nghề nghiệp</span>
          </h2>
          
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Chỉ cần vài phút để bắt đầu hành trình định hướng tương lai
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} progress={progressValue} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            className="relative px-8 py-3.5 rounded-full font-semibold text-lg overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              boxShadow: '0 0 30px rgba(99, 102, 241, 0.35)',
            }}
            whileHover={{ scale: 1.03, boxShadow: '0 0 45px rgba(99, 102, 241, 0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Bắt đầu ngay
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
