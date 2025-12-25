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
  Shield,
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

interface AdminHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onMobileMenuClick: () => void;
}

export default function AdminHeader({
  sidebarOpen,
  onToggleSidebar,
  onMobileMenuClick,
}: AdminHeaderProps) {
  const router = useRouter();
  const { user: authUser, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const user = {
    name: authUser?.hoTen || 'Admin',
    email: authUser?.email || '',
    role: authUser?.vaiTro || 'admin',
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-auto h-16 bg-slate-800/80 backdrop-blur-xl border-b border-slate-700 z-20 px-4">
      <div className="h-full flex items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={onMobileMenuClick}
            className="p-2 rounded-xl hover:bg-slate-700 lg:hidden"
          >
            <Menu className="w-5 h-5 text-gray-400" />
          </button>

          {/* Toggle sidebar button (desktop) */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl hover:bg-slate-700 hidden lg:block"
          >
            {sidebarOpen ? (
              <PanelLeftClose className="w-5 h-5 text-gray-400" />
            ) : (
              <PanelLeft className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {/* Search bar */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-xl w-64">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="bg-transparent outline-none text-sm flex-1 text-gray-200 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Admin Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg border border-red-500/30">
            <Shield className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-medium text-orange-400">Admin</span>
          </div>

          {/* Notifications */}
          <motion.button
            className="p-2 rounded-xl hover:bg-slate-700 relative"
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </motion.button>

          {/* User menu */}
          <div className="relative">
            <motion.button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-slate-700"
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-semibold text-sm">
                {user.name.charAt(0)}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-200">
                {user.name}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </motion.button>

            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-12 w-56 bg-slate-800 rounded-2xl shadow-xl border border-slate-700 overflow-hidden"
              >
                <div className="p-4 border-b border-slate-700">
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                    {user.role}
                  </span>
                </div>
                <div className="p-2">
                  <a
                    href="/admin/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-700 text-gray-300"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Cài đặt</span>
                  </a>
                  <a
                    href="/dashboard/profile"
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-700 text-gray-300"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">Hồ sơ cá nhân</span>
                  </a>
                </div>
                <div className="p-2 border-t border-slate-700">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-500/10 text-red-400"
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

