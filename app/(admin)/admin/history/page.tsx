'use client';

import { motion } from 'framer-motion';
import { History, Search, Filter, Eye, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/app/lib/api';

interface QuizHistory {
  _id: string;
  nguoiDung: { hoTen: string; email: string };
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
  tongDiem: number;
  trangThai: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<QuizHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchHistory();
  }, [page]);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/admin/quiz-history?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setHistory(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
      // Mock data
      setHistory([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <History className="w-8 h-8 text-cyan-400" />
          Lịch sử Trắc nghiệm
        </h1>
        <p className="text-gray-400 mt-1">Xem lịch sử làm bài của tất cả người dùng</p>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-xl flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo tên người dùng..."
              className="bg-transparent outline-none text-sm flex-1 text-gray-200"
            />
          </div>
          <select className="px-4 py-2 bg-slate-700 rounded-xl text-gray-200 text-sm">
            <option value="">Tất cả trạng thái</option>
            <option value="hoan_thanh">Hoàn thành</option>
            <option value="dang_lam">Đang làm</option>
          </select>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-20">
            <History className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Chưa có lịch sử làm bài</p>
            <p className="text-gray-500 text-sm mt-2">Dữ liệu sẽ hiển thị khi người dùng hoàn thành bài trắc nghiệm</p>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Người dùng</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Thời gian</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Điểm</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Trạng thái</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {history.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-700/30">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium">{item.nguoiDung?.hoTen}</p>
                        <p className="text-gray-400 text-sm">{item.nguoiDung?.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(item.thoiGianKetThuc || item.thoiGianBatDau).toLocaleString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-cyan-400 font-semibold">{item.tongDiem}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.trangThai === 'hoan_thanh'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {item.trangThai === 'hoan_thanh' ? 'Hoàn thành' : 'Đang làm'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-slate-600 rounded-lg">
                        <Eye className="w-4 h-4 text-cyan-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-700 flex items-center justify-end gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="p-2 hover:bg-slate-700 rounded-lg disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </button>
              <span className="text-gray-400 text-sm">Trang {page}</span>
              <button
                onClick={() => setPage(p => p + 1)}
                className="p-2 hover:bg-slate-700 rounded-lg"
              >
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

