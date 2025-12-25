'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Shield,
  LayoutDashboard,
  Users,
  ClipboardList,
  Briefcase,
  History,
  Settings,
  LogOut,
  X,
  BarChart3,
} from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

interface AdminSidebarProps {
  isOpen: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Người dùng', href: '/admin/users' },
  { icon: ClipboardList, label: 'Câu hỏi', href: '/admin/questions' },
  { icon: Briefcase, label: 'Nghề nghiệp', href: '/admin/careers' },
  { icon: History, label: 'Lịch sử', href: '/admin/history' },
  { icon: BarChart3, label: 'Thống kê', href: '/admin/stats' },
];

const bottomItems = [
  { icon: Settings, label: 'Cài đặt', href: '/admin/settings' },
];

export default function AdminSidebar({ isOpen, mobileOpen, onMobileClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-slate-700">
        <Link href="/admin" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center"
          >
            <Shield className="w-6 h-6 text-white" />
          </motion.div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <span className="text-xl font-bold text-white">CareerAI</span>
                <span className="text-xs text-orange-400 font-medium">Admin Panel</span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Main menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/20'
                    : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5" />
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom menu */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        {bottomItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <motion.div
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 hover:bg-slate-800 hover:text-white transition-all"
              whileHover={{ x: 4 }}
            >
              <item.icon className="w-5 h-5" />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </motion.div>
          </Link>
        ))}

        {/* Back to User Dashboard */}
        <Link href="/dashboard">
          <motion.div
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-indigo-400 hover:bg-indigo-500/10 transition-all"
            whileHover={{ x: 4 }}
          >
            <LayoutDashboard className="w-5 h-5" />
            {isOpen && <span className="font-medium">User Dashboard</span>}
          </motion.div>
        </Link>

        {/* Logout button */}
        <motion.button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          whileHover={{ x: 4 }}
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="font-medium">Đăng xuất</span>}
        </motion.button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className="fixed left-0 top-0 h-full bg-slate-800/80 backdrop-blur-xl border-r border-slate-700 z-30 hidden lg:block"
        animate={{ width: isOpen ? 256 : 80 }}
        transition={{ duration: 0.3 }}
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed left-0 top-0 h-full w-64 bg-slate-800 z-50 lg:hidden shadow-2xl"
          >
            <button
              onClick={onMobileClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-700 text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

