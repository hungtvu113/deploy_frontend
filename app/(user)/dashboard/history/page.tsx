'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  History,
  Calendar,
  Clock,
  TrendingUp,
  Trash2,
  Eye,
  GraduationCap,
  Briefcase,
  Search as SearchIcon,
  Filter,
  ChevronDown,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { UserType, universityFieldLabels, majorLabels, userTypeLabels } from '../test/data/questions';
import { jobSuggestions } from '../test/data/thatNghiepQuestions';

interface HistoryItem {
  id: string;
  userId?: string; // Thêm userId để phân biệt dữ liệu giữa các user
  userType: UserType;
  selectedMajor?: string;
  topResult: string;
  topScore: number;
  totalQuestions: number;
  completedAt: string;
  scores?: Record<string, number>;
}

const userTypeIcons: Record<UserType, typeof GraduationCap> = {
  hoc_sinh: GraduationCap,
  sinh_vien: Briefcase,
  that_nghiep: SearchIcon,
};

const userTypeColors: Record<UserType, string> = {
  hoc_sinh: 'from-blue-500 to-cyan-500',
  sinh_vien: 'from-purple-500 to-pink-500',
  that_nghiep: 'from-orange-500 to-amber-500',
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Load history từ localStorage
  useEffect(() => {
    const loadHistory = () => {
      // Lấy userId hiện tại từ token
      const token = localStorage.getItem('token');
      let currentUserId: string | null = null;
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          currentUserId = payload.id;
        } catch (e) {
          console.error('Error parsing token:', e);
        }
      }

      const stored = localStorage.getItem('quizHistory');
      if (stored) {
        let parsed: HistoryItem[] = JSON.parse(stored);
        
        // Lọc chỉ lấy history của user hiện tại
        if (currentUserId) {
          parsed = parsed.filter(h => !h.userId || h.userId === currentUserId);
        }
        
        // Sắp xếp theo thời gian mới nhất
        const sorted = parsed.sort((a, b) => 
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        );
        setHistory(sorted);
        setFilteredHistory(sorted);
      }
    };
    loadHistory();
  }, []);

  // Filter by user type
  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredHistory(history);
    } else {
      setFilteredHistory(history.filter(item => item.userType === selectedType));
    }
  }, [selectedType, history]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get result label
  const getResultLabel = (item: HistoryItem) => {
    if (item.userType === 'hoc_sinh') {
      const field = universityFieldLabels[item.topResult as keyof typeof universityFieldLabels];
      return field?.name || item.topResult;
    } else if (item.userType === 'sinh_vien') {
      const major = majorLabels[item.selectedMajor as keyof typeof majorLabels];
      return major?.label || item.selectedMajor;
    } else {
      const jobs = jobSuggestions[item.topResult as keyof typeof jobSuggestions];
      return jobs && jobs[0] ? jobs[0].name : item.topResult;
    }
  };

  // Delete item
  const handleDelete = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem('quizHistory', JSON.stringify(newHistory));
    setShowDeleteConfirm(null);
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  // Clear all history
  const handleClearAll = () => {
    setHistory([]);
    setFilteredHistory([]);
    localStorage.removeItem('quizHistory');
    localStorage.removeItem('quizResults');
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Lịch sử làm bài</h1>
          <p className="text-gray-500">Xem lại các bài trắc nghiệm bạn đã hoàn thành</p>
        </div>

        {history.length > 0 && (
          <motion.button
            onClick={() => setShowDeleteConfirm('all')}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl font-medium flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Trash2 className="w-4 h-4" />
            Xóa tất cả
          </motion.button>
        )}
      </div>

      {/* Filter tabs */}
      {history.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          <motion.button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
              selectedType === 'all'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            Tất cả ({history.length})
          </motion.button>
          {(['hoc_sinh', 'sinh_vien', 'that_nghiep'] as UserType[]).map((type) => {
            const count = history.filter(h => h.userType === type).length;
            if (count === 0) return null;
            const Icon = userTypeIcons[type];
            return (
              <motion.button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors flex items-center gap-2 ${
                  selectedType === type
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                {userTypeLabels[type].label} ({count})
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Content */}
      {history.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-12 text-center"
        >
          <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Chưa có lịch sử</h3>
          <p className="text-gray-500 mb-6">Bạn chưa hoàn thành bài trắc nghiệm nào</p>
          <Link href="/dashboard/test">
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Làm bài trắc nghiệm ngay
            </motion.button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* History list */}
          <div className="lg:col-span-2 space-y-4">
            {filteredHistory.map((item, index) => {
              const Icon = userTypeIcons[item.userType];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedItem(item)}
                  className={`bg-white rounded-2xl p-5 border-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedItem?.id === item.id
                      ? 'border-indigo-500 shadow-md'
                      : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${userTypeColors[item.userType]} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-800">{userTypeLabels[item.userType].label}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600">
                          {item.topScore}% phù hợp
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Kết quả: <span className="font-medium text-indigo-600">{getResultLabel(item)}</span>
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(item.completedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(item.completedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {item.totalQuestions} câu hỏi
                        </div>
                      </div>
                    </div>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteConfirm(item.id);
                      }}
                      className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="hidden lg:block">
            {selectedItem ? (
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24"
              >
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${userTypeColors[selectedItem.userType]} flex items-center justify-center mb-4`}>
                    {(() => {
                      const Icon = userTypeIcons[selectedItem.userType];
                      return <Icon className="w-8 h-8 text-white" />;
                    })()}
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">{userTypeLabels[selectedItem.userType].label}</h2>
                  <p className="text-sm text-gray-500">{formatDate(selectedItem.completedAt)} - {formatTime(selectedItem.completedAt)}</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-indigo-50 rounded-xl text-center">
                    <p className="text-sm text-indigo-600 font-medium mb-1">Kết quả phù hợp nhất</p>
                    <p className="text-lg font-bold text-indigo-700">{getResultLabel(selectedItem)}</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-xl text-center">
                    <p className="text-sm text-green-600 font-medium mb-1">Mức độ phù hợp</p>
                    <p className="text-2xl font-bold text-green-700">{selectedItem.topScore}%</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 font-medium mb-2">Thống kê</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Số câu hỏi</span>
                        <span className="font-medium">{selectedItem.totalQuestions}</span>
                      </div>
                      {selectedItem.selectedMajor && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Ngành học</span>
                          <span className="font-medium">{majorLabels[selectedItem.selectedMajor as keyof typeof majorLabels]?.label || selectedItem.selectedMajor}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Link href="/dashboard/test">
                    <motion.button
                      className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Làm lại bài trắc nghiệm
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
                <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Chọn một bài để xem chi tiết</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteConfirm(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {showDeleteConfirm === 'all' ? 'Xóa tất cả lịch sử?' : 'Xóa bài này?'}
              </h3>
              <p className="text-gray-500 text-sm">
                {showDeleteConfirm === 'all'
                  ? 'Tất cả lịch sử làm bài sẽ bị xóa vĩnh viễn.'
                  : 'Bài làm này sẽ bị xóa vĩnh viễn.'}
              </p>
            </div>
            <div className="flex gap-3">
              <motion.button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Hủy
              </motion.button>
              <motion.button
                onClick={() => {
                  if (showDeleteConfirm === 'all') {
                    handleClearAll();
                  } else {
                    handleDelete(showDeleteConfirm);
                  }
                }}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Xóa
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

