'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import UserHeader from './components/UserHeader';
import Chatbox from '@/app/components/Chatbox';
import FloatingChatButton from '@/app/components/FloatingChatButton';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Mobile sidebar backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        }`}
      >
        {/* Header */}
        <UserHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onMobileMenuClick={() => setMobileSidebarOpen(true)}
        />

        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8 pt-20">
          {children}
        </main>
      </div>

      {/* Floating Chat Button */}
      <FloatingChatButton onClick={() => setIsChatboxOpen(true)} />

      {/* Chatbox */}
      <Chatbox isOpen={isChatboxOpen} onClose={() => setIsChatboxOpen(false)} />
    </div>
  );
}

