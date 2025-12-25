'use client';

import { motion, useInView } from 'framer-motion';
import { Brain, Target, BookOpen, TrendingUp, Users, Shield } from 'lucide-react';
import { useRef } from 'react';

const features = [
  {
    icon: Brain,
    title: 'AI Phân tích thông minh',
    description: 'Công nghệ AI tiên tiến phân tích tính cách, năng lực và sở thích của bạn',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Target,
    title: 'Gợi ý chính xác',
    description: 'Đề xuất nghề nghiệp phù hợp nhất dựa trên dữ liệu cá nhân hóa',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: BookOpen,
    title: 'Bài trắc nghiệm đa dạng',
    description: 'Holland, MBTI, Big Five và nhiều bài test khoa học khác',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: TrendingUp,
    title: 'Xu hướng nghề nghiệp',
    description: 'Cập nhật thông tin mức lương, triển vọng và xu hướng thị trường',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Users,
    title: 'Cộng đồng hỗ trợ',
    description: 'Kết nối với chuyên gia và người có cùng định hướng nghề nghiệp',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Shield,
    title: 'Bảo mật tuyệt đối',
    description: 'Dữ liệu cá nhân được mã hóa và bảo vệ an toàn',
    color: 'from-violet-500 to-purple-500',
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" className="py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-100/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400"
            whileHover={{ scale: 1.05 }}
          >
            Tính năng nổi bật
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Tại sao chọn <span className="gradient-text">CareerAI</span>?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Nền tảng tư vấn nghề nghiệp thông minh với công nghệ AI tiên tiến nhất
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="gradient-border p-8 h-full bg-white/80 backdrop-blur-sm"
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
