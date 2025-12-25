'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Trophy,
  Briefcase,
  TrendingUp,
  Download,
  Share2,
  RotateCcw,
  DollarSign,
  MessageCircle,
  GraduationCap,
  Building2,
} from 'lucide-react';
import { UserType, UniversityField, MajorType, universityFieldLabels, majorLabels } from '../data/questions';
import { jobSuggestions } from '../data/thatNghiepQuestions';

interface QuizResult {
  userType: UserType;
  selectedMajor?: MajorType;
  scores: Record<string, number>;
  answers: Record<number, string>;
  completedAt: string;
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [topResults, setTopResults] = useState<{ key: string; score: number; percentage: number }[]>([]);

  useEffect(() => {
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

    const stored = localStorage.getItem('quizResults');
    if (!stored) {
      router.push('/dashboard/test');
      return;
    }

    const parsed: QuizResult = JSON.parse(stored);
    const resultUserId = (parsed as any).userId;
    
    // Kiểm tra xem kết quả có thuộc về user hiện tại không
    if (currentUserId && resultUserId && resultUserId !== currentUserId) {
      // Nếu không phải kết quả của user hiện tại, xóa và redirect
      localStorage.removeItem('quizResults');
      router.push('/dashboard/test');
      return;
    }
    
    setResult(parsed);

    // Tính top nhóm
    const totalScore = Object.values(parsed.scores).reduce((a, b) => a + b, 0);
    if (totalScore > 0) {
      const sorted = Object.entries(parsed.scores)
        .map(([key, score]) => ({
          key,
          score,
          percentage: Math.round((score / totalScore) * 100),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
      setTopResults(sorted);
    }
  }, [router]);

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  // Lấy kết quả dựa trên loại user
  const getResultContent = (): {
    title: string;
    icon: React.ReactNode;
    topName: string;
    topDescription: string;
    topIcon: string;
    suggestions: { name: string; salary?: string; demand?: string; description?: string }[];
  } => {
    const topKey = topResults[0]?.key;

    if (result.userType === 'hoc_sinh') {
      // Kết quả cho học sinh - ngành học đại học
      const fieldInfo = universityFieldLabels[topKey as UniversityField];
      return {
        title: 'Ngành học phù hợp với bạn',
        icon: <GraduationCap className="w-10 h-10 text-white" />,
        topName: fieldInfo?.name || topKey,
        topDescription: fieldInfo?.description || '',
        topIcon: fieldInfo?.icon || '📚',
        suggestions: fieldInfo?.majors?.map(m => ({ name: m })) || [],
      };
    } else if (result.userType === 'sinh_vien') {
      // Kết quả cho sinh viên - vị trí việc làm
      const majorInfo = result.selectedMajor ? majorLabels[result.selectedMajor] : null;
      return {
        title: `Định hướng nghề nghiệp - ${majorInfo?.label || 'Ngành khác'}`,
        icon: <Briefcase className="w-10 h-10 text-white" />,
        topName: `Vị trí phù hợp: ${topKey}`,
        topDescription: 'Dựa trên kỹ năng và sở thích của bạn',
        topIcon: majorInfo?.icon || '💼',
        suggestions: [],
      };
    } else {
      // Kết quả cho người thất nghiệp - công việc cụ thể
      const jobs = jobSuggestions[topKey] || [];
      return {
        title: 'Công việc phù hợp với bạn',
        icon: <Building2 className="w-10 h-10 text-white" />,
        topName: topKey?.replace('_', ' ').toUpperCase() || 'Việc làm',
        topDescription: 'Dựa trên kinh nghiệm và kỹ năng của bạn',
        topIcon: '💼',
        suggestions: jobs,
      };
    }
  };

  const content = getResultContent();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header celebration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4 shadow-lg"
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          <Trophy className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Chúc mừng bạn!</h1>
        <p className="text-gray-600">Đây là kết quả phân tích nghề nghiệp của bạn</p>
      </motion.div>

      {/* Main result card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-1"
      >
        <div className="bg-white rounded-[22px] p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center">
              <span className="text-4xl">{content.topIcon}</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">{content.title}</p>
              <h2 className="text-2xl font-bold text-gray-800">{content.topName}</h2>
              <p className="text-gray-600">{content.topDescription}</p>
            </div>
          </div>

          {/* Score bars */}
          <div className="space-y-4">
            {topResults.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-700 capitalize">{item.key.replace('_', ' ')}</span>
                  <span className="font-bold text-indigo-600">{item.percentage}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      index === 0
                        ? 'bg-gradient-to-r from-indigo-500 to-pink-500'
                        : index === 1
                        ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                        : 'bg-gradient-to-r from-blue-400 to-cyan-400'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Suggested careers/majors */}
      {content.suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-6">
            {result.userType === 'hoc_sinh' ? (
              <GraduationCap className="w-5 h-5 text-indigo-500" />
            ) : (
              <Briefcase className="w-5 h-5 text-indigo-500" />
            )}
            <h3 className="text-lg font-semibold text-gray-800">
              {result.userType === 'hoc_sinh' ? 'Ngành học gợi ý' : 'Công việc gợi ý'}
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {content.suggestions.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer"
              >
                <h4 className="font-semibold text-gray-800 mb-3">{item.name}</h4>
                {item.salary && (
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span>{item.salary}/tháng</span>
                    </div>
                    {item.demand && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        <span>Nhu cầu: {item.demand}</span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <Link href="/dashboard/chat">
          <motion.button
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl font-medium shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-5 h-5" />
            Trò chuyện với AI CareerAI
          </motion.button>
        </Link>

        <motion.button
          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-medium border border-gray-200 hover:bg-gray-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="w-5 h-5" />
          Tải PDF
        </motion.button>

        <motion.button
          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-medium border border-gray-200 hover:bg-gray-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Share2 className="w-5 h-5" />
          Chia sẻ
        </motion.button>

        <Link href="/dashboard/test">
          <motion.button
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-medium border border-gray-200 hover:bg-gray-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw className="w-5 h-5" />
            Làm lại
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

