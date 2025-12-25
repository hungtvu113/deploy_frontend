'use client';

import { motion } from 'framer-motion';
import {
  ClipboardList,
  Award,
  ArrowRight,
  Briefcase,
  Star,
  Sparkles,
  FileQuestion,
  GraduationCap,
  Building2,
  TrendingUp,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { useEffect, useState } from 'react';
import { UserType, UniversityField, MajorType, universityFieldLabels, majorLabels, userTypeLabels } from './test/data/questions';
import { jobSuggestions } from './test/data/thatNghiepQuestions';

interface QuizResult {
  userType: UserType;
  selectedMajor?: MajorType;
  scores: Record<string, number>;
  answers: Record<number, string>;
  completedAt: string;
}

interface LocalHistory {
  id: string;
  userId?: string; // Thêm userId để phân biệt dữ liệu giữa các user
  userType: UserType;
  selectedMajor?: MajorType;
  topResult: string;
  topScore: number;
  totalQuestions: number;
  completedAt: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState<LocalHistory[]>([]);
  const [latestResult, setLatestResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    baiDaLam: 0,
    nghePhuHop: 0,
    diemCaoNhat: 0,
  });

  // Load lịch sử từ localStorage
  useEffect(() => {
    const loadLocalData = () => {
      try {
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

        // Đọc kết quả quiz mới nhất
        const quizResults = localStorage.getItem('quizResults');
        if (quizResults) {
          const parsed: QuizResult = JSON.parse(quizResults);

          // Chỉ hiển thị nếu dữ liệu thuộc về user hiện tại
          const resultUserId = (parsed as any).userId;
          if (!currentUserId || !resultUserId || resultUserId === currentUserId) {
            setLatestResult(parsed);

            // Tính điểm cao nhất từ scores
            const totalScore = Object.values(parsed.scores).reduce((a, b) => a + b, 0);
            const topEntry = Object.entries(parsed.scores).sort((a, b) => b[1] - a[1])[0];

            // Tính % phù hợp cao nhất
            const topPercentage = topEntry ? Math.round((topEntry[1] / totalScore) * 100) : 0;

            // Tạo history entry với userId
            const historyItem: LocalHistory = {
              id: Date.now().toString(),
              userId: currentUserId || undefined,
              userType: parsed.userType,
              selectedMajor: parsed.selectedMajor,
              topResult: topEntry ? topEntry[0] : '',
              topScore: topPercentage,
              totalQuestions: Object.keys(parsed.answers).length,
              completedAt: parsed.completedAt,
            };

            // Đọc tất cả history
            const existingHistory = localStorage.getItem('quizHistory');
            let allHistory: LocalHistory[] = existingHistory ? JSON.parse(existingHistory) : [];

            // Kiểm tra xem đã có entry này chưa
            const exists = allHistory.some(h =>
              h.completedAt === parsed.completedAt &&
              h.userId === historyItem.userId
            );

            if (!exists) {
              allHistory = [historyItem, ...allHistory];
              localStorage.setItem('quizHistory', JSON.stringify(allHistory));
            }

            // Lọc chỉ hiển thị history của user hiện tại
            const userHistory = currentUserId
              ? allHistory.filter(h => !h.userId || h.userId === currentUserId)
              : allHistory;

            setHistory(userHistory.slice(0, 10));

            // Tính stats
            const maxPercentage = Math.max(...userHistory.map(h => h.topScore), topPercentage);
            setStats({
              baiDaLam: userHistory.length,
              nghePhuHop: userHistory.length * 3,
              diemCaoNhat: maxPercentage,
            });
          }
        } else {
          // Không có quizResults - Đọc history cũ nếu có
          const existingHistory = localStorage.getItem('quizHistory');
          if (existingHistory) {
            let allHistory: LocalHistory[] = JSON.parse(existingHistory);

            // Lọc chỉ lấy history của user hiện tại
            const userHistory = currentUserId
              ? allHistory.filter(h => !h.userId || h.userId === currentUserId)
              : allHistory;

            setHistory(userHistory.slice(0, 10));

            if (userHistory.length > 0) {
              const maxPercentage = Math.max(...userHistory.map(h => h.topScore));
              setStats({
                baiDaLam: userHistory.length,
                nghePhuHop: userHistory.length * 3,
                diemCaoNhat: maxPercentage,
              });
            }
          }
        }
      } catch (error) {
        console.error('Error loading local data:', error);
      }
      setIsLoading(false);
    };

    loadLocalData();
  }, []);

  // Kiểm tra user mới (chưa có lịch sử)
  const isNewUser = !isLoading && history.length === 0 && !latestResult;

  // Hàm lấy kết quả hiển thị
  const getResultDisplay = () => {
    if (!latestResult) return null;

    const topResults = Object.entries(latestResult.scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const totalScore = Object.values(latestResult.scores).reduce((a, b) => a + b, 0);

    if (latestResult.userType === 'hoc_sinh') {
      return {
        title: 'Ngành học phù hợp',
        icon: <GraduationCap className="w-6 h-6 text-white" />,
        items: topResults.map(([key, score]) => ({
          name: universityFieldLabels[key as UniversityField]?.name || key,
          icon: universityFieldLabels[key as UniversityField]?.icon || '📚',
          percentage: Math.round((score / totalScore) * 100),
        })),
      };
    } else if (latestResult.userType === 'sinh_vien') {
      const majorInfo = latestResult.selectedMajor ? majorLabels[latestResult.selectedMajor] : null;
      return {
        title: `Định hướng ${majorInfo?.label || 'nghề nghiệp'}`,
        icon: <Briefcase className="w-6 h-6 text-white" />,
        items: topResults.map(([key, score]) => ({
          name: key,
          icon: majorInfo?.icon || '💼',
          percentage: Math.round((score / totalScore) * 100),
        })),
      };
    } else {
      return {
        title: 'Công việc phù hợp',
        icon: <Building2 className="w-6 h-6 text-white" />,
        items: topResults.map(([key, score]) => {
          const jobs = jobSuggestions[key] || [];
          return {
            name: jobs[0]?.name || key.replace('_', ' '),
            icon: '💼',
            percentage: Math.round((score / totalScore) * 100),
          };
        }),
      };
    }
  };

  const resultDisplay = getResultDisplay();

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 md:p-8 text-white"
      >
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Chào mừng {user?.hoTen || 'bạn'}! 👋
          </h1>
          <p className="text-white/80 mb-6 max-w-lg">
            Tiếp tục hành trình khám phá nghề nghiệp phù hợp với bạn. Làm bài trắc nghiệm để nhận gợi ý chính xác hơn!
          </p>
          <Link href="/dashboard/test">
            <motion.button
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ClipboardList className="w-5 h-5" />
              Làm trắc nghiệm ngay
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-white/10 rounded-full translate-y-1/2" />
        
        {/* Floating sparkles */}
        <motion.div
          className="absolute top-4 right-20"
          animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-8 h-8 text-white/40" />
        </motion.div>
      </motion.div>

      {/* Nếu user mới - hiển thị trạng thái trống */}
      {isNewUser ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center">
            <FileQuestion className="w-10 h-10 text-indigo-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Chưa có dữ liệu
          </h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Bạn chưa làm bài trắc nghiệm nào. Hãy bắt đầu làm bài để khám phá nghề nghiệp phù hợp với bạn!
          </p>
          <Link href="/dashboard/test">
            <motion.button
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ClipboardList className="w-5 h-5" />
              Làm bài trắc nghiệm đầu tiên
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      ) : (
        <>
          {/* Stats grid - chỉ hiển thị khi có dữ liệu */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.baiDaLam}</p>
              <p className="text-sm text-gray-500">Bài đã làm</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.nghePhuHop}</p>
              <p className="text-sm text-gray-500">Nghề gợi ý</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.diemCaoNhat}%</p>
              <p className="text-sm text-gray-500">% phù hợp cao nhất</p>
            </motion.div>
          </div>

          {/* AI Chat CTA - chỉ hiển thị khi đã có quiz results */}
          {latestResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 shadow-lg"
            >
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Trò chuyện với AI CreeperAI
                    </h3>
                  </div>
                  <p className="text-white/90 mb-4 max-w-xl">
                    Đã hoàn thành trắc nghiệm? Hãy chat với AI để nhận tư vấn chi tiết hơn về kết quả của bạn và khám phá các cơ hội nghề nghiệp phù hợp!
                  </p>
                  <Link href="/dashboard/chat">
                    <motion.button
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageCircle className="w-5 h-5" />
                      Bắt đầu trò chuyện
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
                <motion.div
                  className="hidden lg:block"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                </motion.div>
              </div>
              
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
            </motion.div>
          )}

          {/* Main content grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent results */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Kết quả gần đây</h2>
                <Link href="/dashboard/history" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Xem tất cả
                </Link>
              </div>

              <div className="space-y-4">
                {history.slice(0, 3).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center">
                      {item.userType === 'hoc_sinh' ? (
                        <GraduationCap className="w-6 h-6 text-indigo-600" />
                      ) : item.userType === 'sinh_vien' ? (
                        <Briefcase className="w-6 h-6 text-purple-600" />
                      ) : (
                        <Building2 className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {userTypeLabels[item.userType]?.label || 'Trắc nghiệm'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(item.completedAt).toLocaleDateString('vi-VN')} • {item.totalQuestions} câu hỏi
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-indigo-600">{item.topScore}%</p>
                      <p className="text-xs text-gray-400">phù hợp</p>
                    </div>
                  </motion.div>
                ))}
                {history.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Chưa có lịch sử</p>
                )}
              </div>
            </motion.div>

            {/* Suggested careers from latest result */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  {resultDisplay?.title || 'Kết quả phù hợp'}
                </h2>
                <Star className="w-5 h-5 text-amber-400" />
              </div>

              <div className="space-y-4">
                {resultDisplay?.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <p className="font-medium text-gray-800">{item.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-indigo-600">{item.percentage}%</span>
                    </div>
                  </motion.div>
                ))}
                {!resultDisplay && (
                  <p className="text-gray-500 text-center py-4">Chưa có dữ liệu</p>
                )}
              </div>

              <Link href="/dashboard/careers">
                <motion.button
                  className="w-full mt-4 py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Xem thêm nghề nghiệp
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}

