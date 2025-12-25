'use client';

import { motion } from 'framer-motion';
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

interface UserHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onMobileMenuClick: () => void;
}

export default function UserHeader({
  sidebarOpen,
  onToggleSidebar,
  onMobileMenuClick,
}: UserHeaderProps) {
  const router = useRouter();
  const { user: authUser, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Lấy thông tin từ AuthContext
  const user = {
    name: authUser?.hoTen || 'Người dùng',
    email: authUser?.email || '',
    avatar: authUser?.avatar || null,
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const notifications = [
    { id: 1, title: 'Kết quả trắc nghiệm', message: 'Bạn có kết quả mới', time: '5 phút trước', unread: true },
    { id: 2, title: 'Khóa học gợi ý', message: '3 khóa học phù hợp với bạn', time: '1 giờ trước', unread: true },
    { id: 3, title: 'Cập nhật hồ sơ', message: 'Hoàn thiện hồ sơ để nhận gợi ý tốt hơn', time: '2 giờ trước', unread: false },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-auto h-16 bg-white/80 backdrop-blur-xl border-b border-gray-100 z-20 px-4">
      <div className="h-full flex items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={onMobileMenuClick}
            className="p-2 rounded-xl hover:bg-gray-100 lg:hidden"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Toggle sidebar button (desktop) */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl hover:bg-gray-100 hidden lg:block"
          >
            {sidebarOpen ? (
              <PanelLeftClose className="w-5 h-5 text-gray-600" />
            ) : (
              <PanelLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Search bar */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl w-64">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="bg-transparent outline-none text-sm flex-1"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <motion.button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl hover:bg-gray-100 relative"
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </motion.button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Thông báo</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${
                        notif.unread ? 'bg-indigo-50/50' : ''
                      }`}
                    >
                      <p className="font-medium text-sm text-gray-800">{notif.title}</p>
                      <p className="text-sm text-gray-500">{notif.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-gray-100">
                  <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
                    Xem tất cả
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <motion.button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-gray-100"
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                {user.name.charAt(0)}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user.name}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </motion.button>

            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100">
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="p-2">
                  {[
                    { icon: User, label: 'Hồ sơ của tôi', href: '/dashboard/profile' },
                    { icon: Settings, label: 'Cài đặt', href: '/dashboard/settings' },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 text-gray-700"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </a>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Đăng xuất</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

