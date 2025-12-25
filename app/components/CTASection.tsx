'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRef } from 'react';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div ref={ref} className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center p-12 md:p-16 rounded-3xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(236, 72, 153, 0.08) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.15)',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Floating sparkles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <Sparkles className="w-6 h-6 text-indigo-400/50" />
            </motion.div>
          ))}

          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Sẵn sàng khám phá <br />
            <span className="gradient-text">nghề nghiệp phù hợp</span>?
          </motion.h2>

          <motion.p
            className="text-gray-600 text-lg mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Bắt đầu hành trình định hướng tương lai ngay hôm nay. 
            Hoàn toàn miễn phí, không cần thẻ tín dụng.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              className="magnetic-btn group px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-full font-semibold text-lg flex items-center justify-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 50px rgba(99, 102, 241, 0.6), 0 0 100px rgba(236, 72, 153, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Bắt đầu miễn phí
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.button>
          </motion.div>

          <motion.p
            className="mt-6 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            🎉 Đã có hơn 50,000+ người dùng tin tưởng
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
