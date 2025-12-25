'use client';

import { motion } from 'framer-motion';
import { Settings, Bell, Shield, Database, Save } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    maintenanceMode: false,
    allowRegistration: true,
    maxQuizAttempts: 10,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Settings className="w-8 h-8 text-gray-400" />
          Cài đặt hệ thống
        </h1>
        <p className="text-gray-400 mt-1">Quản lý cấu hình hệ thống</p>
      </div>

      <div className="grid gap-6">
        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Thông báo</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-300">Gửi email thông báo</span>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                className="w-5 h-5 rounded bg-slate-700 border-slate-600"
              />
            </label>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-green-400" />
            <h2 className="text-xl font-semibold text-white">Bảo mật</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-300">Cho phép đăng ký mới</span>
              <input
                type="checkbox"
                checked={settings.allowRegistration}
                onChange={(e) => setSettings({...settings, allowRegistration: e.target.checked})}
                className="w-5 h-5 rounded bg-slate-700 border-slate-600"
              />
            </label>
          </div>
        </motion.div>

        {/* System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-semibold text-white">Hệ thống</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-300">Chế độ bảo trì</span>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                className="w-5 h-5 rounded bg-slate-700 border-slate-600"
              />
            </label>
            <div>
              <label className="block text-gray-300 mb-2">Số lần làm bài tối đa/ngày</label>
              <input
                type="number"
                value={settings.maxQuizAttempts}
                onChange={(e) => setSettings({...settings, maxQuizAttempts: parseInt(e.target.value)})}
                className="w-full px-4 py-2 bg-slate-700 rounded-xl text-white"
              />
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg">
          <Save className="w-5 h-5" />
          Lưu cài đặt
        </button>
      </div>
    </div>
  );
}

