'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sparkles,
  LayoutDashboard,
  ClipboardList,
  History,
  User,
  Briefcase,
  MessageCircle,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: ClipboardList, label: 'Làm trắc nghiệm', href: '/dashboard/test' },
  { icon: MessageCircle, label: 'Chat với AI', href: '/dashboard/chat' },
  { icon: History, label: 'Lịch sử', href: '/dashboard/history' },
  { icon: Briefcase, label: 'Nghề nghiệp', href: '/dashboard/careers' },
  { icon: User, label: 'Hồ sơ', href: '/dashboard/profile' },
];

const bottomItems = [
  { icon: Settings, label: 'Cài đặt', href: '/dashboard/settings' },
  { icon: HelpCircle, label: 'Hỗ trợ', href: '/dashboard/support' },
];

export default function Sidebar({ isOpen, mobileOpen, onMobileClose }: SidebarProps) {
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
      <div className="p-4 border-b border-gray-100">
        <Link href="/dashboard" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-xl font-bold gradient-text"
              >
                CareerAI
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Main menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
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
      <div className="p-4 border-t border-gray-100 space-y-2">
        {bottomItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <motion.div
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all"
              whileHover={{ x: 4 }}
            >
              <item.icon className="w-5 h-5" />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </motion.div>
          </Link>
        ))}

        {/* Logout button */}
        <motion.button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all"
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
        className={`fixed left-0 top-0 h-full bg-white/80 backdrop-blur-xl border-r border-gray-100 z-30 hidden lg:block`}
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
            className="fixed left-0 top-0 h-full w-64 bg-white z-50 lg:hidden shadow-2xl"
          >
            <button
              onClick={onMobileClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
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

