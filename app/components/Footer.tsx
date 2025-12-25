'use client';

import { motion } from 'framer-motion';
import { Sparkles, Mail, Phone, MapPin, Facebook, Youtube, Linkedin } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Tính năng', href: '#features' },
    { name: 'Bài trắc nghiệm', href: '#' },
    { name: 'Nghề nghiệp', href: '#' },
    { name: 'Khóa học', href: '#' },
  ],
  company: [
    { name: 'Về chúng tôi', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Tuyển dụng', href: '#' },
    { name: 'Liên hệ', href: '#' },
  ],
  support: [
    { name: 'Trung tâm hỗ trợ', href: '#' },
    { name: 'Điều khoản sử dụng', href: '#' },
    { name: 'Chính sách bảo mật', href: '#' },
    { name: 'FAQ', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 border-t border-gray-200">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-100/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.a
              href="#"
              className="flex items-center gap-2 text-xl font-bold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-6 h-6 text-indigo-500" />
              <span className="gradient-text">CareerAI</span>
            </motion.a>
            <p className="text-gray-600 mb-6 max-w-sm">
              Hệ thống tư vấn nghề nghiệp thông minh, giúp bạn khám phá và định hướng tương lai với công nghệ AI tiên tiến.
            </p>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>contact@careerai.vn</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>1900 xxxx</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>TP. Hồ Chí Minh, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Sản phẩm</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Công ty</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Hỗ trợ</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 CareerAI. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex gap-4">
            {[Facebook, Youtube, Linkedin].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
