'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, ClipboardList, Calendar } from 'lucide-react';

export default function StatsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-green-400" />
          Thống kê
        </h1>
        <p className="text-gray-400 mt-1">Xem thống kê chi tiết về hệ thống</p>
      </div>

      {/* Coming Soon */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6"
        >
          <BarChart3 className="w-10 h-10 text-green-400" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-2">Đang phát triển</h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Trang thống kê chi tiết với biểu đồ và báo cáo sẽ được cập nhật trong phiên bản tiếp theo.
        </p>

        {/* Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-slate-700/50 rounded-xl p-4">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-gray-300 font-medium">Thống kê người dùng</p>
            <p className="text-gray-500 text-sm">Biểu đồ tăng trưởng</p>
          </div>
          <div className="bg-slate-700/50 rounded-xl p-4">
            <ClipboardList className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-gray-300 font-medium">Thống kê trắc nghiệm</p>
            <p className="text-gray-500 text-sm">Phân tích kết quả</p>
          </div>
          <div className="bg-slate-700/50 rounded-xl p-4">
            <Calendar className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <p className="text-gray-300 font-medium">Báo cáo theo thời gian</p>
            <p className="text-gray-500 text-sm">Ngày, tuần, tháng</p>
          </div>
        </div>
      </div>
    </div>
  );
}

