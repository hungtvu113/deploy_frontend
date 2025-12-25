'use client';

import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useRef, useState } from 'react';

const testimonials = [
  {
    name: 'Nguyễn Minh Anh',
    role: 'Sinh viên năm 3',
    avatar: '👩‍🎓',
    content: 'CareerAI đã giúp mình xác định được đam mê thực sự. Từ một người mơ hồ về tương lai, giờ mình đã có định hướng rõ ràng!',
    rating: 5,
  },
  {
    name: 'Trần Văn Hùng',
    role: 'Chuyển đổi nghề nghiệp',
    avatar: '👨‍💼',
    content: 'Sau 5 năm làm việc không đúng ngành, CareerAI đã gợi ý cho tôi con đường mới phù hợp hơn. Cảm ơn rất nhiều!',
    rating: 5,
  },
  {
    name: 'Lê Thị Hương',
    role: 'Học sinh lớp 12',
    avatar: '👧',
    content: 'Bài trắc nghiệm rất thú vị và kết quả chính xác đến bất ngờ. Giờ em đã biết nên chọn ngành gì khi vào đại học.',
    rating: 5,
  },
  {
    name: 'Phạm Đức Thành',
    role: 'Fresher IT',
    avatar: '👨‍💻',
    content: 'Giao diện đẹp, dễ sử dụng. Các gợi ý khóa học rất hữu ích để phát triển kỹ năng theo nghề nghiệp được đề xuất.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="testimonials" className="py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-100/50 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400"
            whileHover={{ scale: 1.05 }}
          >
            Đánh giá từ người dùng
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Họ nói gì về <span className="gradient-text">CareerAI</span>?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hàng nghìn người đã tìm được định hướng nghề nghiệp phù hợp
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.div
                className="relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-gray-200 h-full"
                animate={{
                  borderColor: hoveredIndex === index ? 'rgba(99, 102, 241, 0.4)' : 'rgba(229, 231, 235, 1)',
                  boxShadow: hoveredIndex === index 
                    ? '0 0 40px rgba(99, 102, 241, 0.15)' 
                    : '0 10px 30px rgba(0, 0, 0, 0.05)',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 w-10 h-10 text-indigo-500/20" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                    >
                      <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-600 mb-6 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-2xl"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
