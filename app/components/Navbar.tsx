'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(248, 250, 252, 0)', 'rgba(248, 250, 252, 0.95)']
  );
  const backdropBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(10px)']);

  const navItems = [
    { name: 'Trang chủ', href: '#hero' },
    { name: 'Tính năng', href: '#features' },
    { name: 'Cách hoạt động', href: '#how-it-works' },
    { name: 'Đánh giá', href: '#testimonials' },
  ];

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter: backdropBlur }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#"
            className="flex items-center gap-2 text-xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-6 h-6 text-indigo-500" />
            <span className="gradient-text">CareerAI</span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.name}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              /* User đã đăng nhập */
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                    {user?.hoTen?.charAt(0) || 'U'}
                  </div>
                  <span className="text-gray-700 font-medium">{user?.hoTen}</span>
                </motion.button>

                {/* Dropdown menu */}
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                  >
                    <Link href="/dashboard">
                      <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </div>
                    </Link>
                    <Link href="/dashboard/profile">
                      <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700">
                        <User className="w-4 h-4" />
                        <span>Hồ sơ</span>
                      </div>
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-500"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Đăng xuất</span>
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              /* Chưa đăng nhập */
              <>
                <Link href="/login">
                  <motion.button
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Đăng nhập
                  </motion.button>
                </Link>
                <Link href="/register">
                  <motion.button
                    className="magnetic-btn px-6 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-full font-medium text-white"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Bắt đầu ngay
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-800"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <button className="w-full py-2 text-gray-600">Dashboard</button>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full py-2 text-red-500"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <button className="w-full py-2 text-gray-600">Đăng nhập</button>
                  </Link>
                  <Link href="/register">
                    <button className="w-full py-2 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-full text-white">
                      Bắt đầu ngay
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
