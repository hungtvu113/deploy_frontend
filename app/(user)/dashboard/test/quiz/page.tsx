'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Briefcase,
} from 'lucide-react';
import { UserType, MajorType, majorLabels, Question } from '../data/questions';
import { hocSinhQuestions } from '../data/hocSinhQuestions';
import { sinhVienQuestionsByMajor } from '../data/sinhVienQuestions';
import { thatNghiepQuestions } from '../data/thatNghiepQuestions';

export default function QuizPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<MajorType | null>(null);
  const [showMajorSelect, setShowMajorSelect] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load user type và câu hỏi
  useEffect(() => {
    const storedType = localStorage.getItem('quizUserType') as UserType;
    if (!storedType) {
      router.push('/dashboard/test');
      return;
    }
    setUserType(storedType);

    // Load câu hỏi theo loại user
    if (storedType === 'hoc_sinh') {
      setQuestions(hocSinhQuestions);
    } else if (storedType === 'sinh_vien') {
      setShowMajorSelect(true); // Cần chọn ngành trước
    } else if (storedType === 'that_nghiep') {
      setQuestions(thatNghiepQuestions);
    }
  }, [router]);

  // Khi sinh viên chọn ngành
  const handleSelectMajor = (major: MajorType) => {
    setSelectedMajor(major);
    setShowMajorSelect(false);
    const majorQuestions = sinhVienQuestionsByMajor[major];
    if (majorQuestions && majorQuestions.length > 0) {
      setQuestions(majorQuestions);
    } else {
      // Nếu ngành khác, dùng câu hỏi chung
      setQuestions(thatNghiepQuestions.slice(0, 10));
    }
  };

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const answeredCount = Object.keys(answers).length;

  // Tính điểm theo nhóm
  const calculateScores = () => {
    const scores: Record<string, number> = {};

    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = questions.find((q) => q.id === parseInt(questionId));
      if (question) {
        const answer = question.answers.find((a) => a.id === answerId);
        if (answer && answer.scores) {
          Object.entries(answer.scores).forEach(([group, score]) => {
            scores[group] = (scores[group] || 0) + (score || 0);
          });
        }
      }
    });

    return scores;
  };

  const handleAnswer = (answerId: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerId,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (answeredCount < questions.length) {
      alert('Vui lòng trả lời tất cả câu hỏi!');
      return;
    }

    setIsSubmitting(true);
    
    // Lấy userId từ localStorage token để đảm bảo dữ liệu thuộc đúng user
    const token = localStorage.getItem('token');
    let userId = null;
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        userId = payload.id;
      } catch (e) {
        console.error('Error parsing token:', e);
      }
    }
    
    // Lưu kết quả vào localStorage với userId
    localStorage.setItem('quizResults', JSON.stringify({
      userId,
      userType,
      selectedMajor,
      scores: calculateScores(),
      answers: answers,
      completedAt: new Date().toISOString(),
    }));

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    router.push('/dashboard/test/result');
  };

  // Màn hình chọn ngành cho sinh viên
  if (showMajorSelect) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Bạn đang học ngành gì?</h2>
            <p className="text-gray-500">Chọn ngành để nhận câu hỏi phù hợp nhất</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {(Object.keys(majorLabels) as MajorType[]).map((major) => (
              <motion.button
                key={major}
                onClick={() => handleSelectMajor(major)}
                className="p-4 rounded-xl border-2 border-gray-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-2xl mb-2 block">{majorLabels[major].icon}</span>
                <span className="font-medium text-gray-800">{majorLabels[major].label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // Loading state
  if (questions.length === 0) {
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

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Câu {currentIndex + 1}/{questions.length}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-gray-600">Đã trả lời: {answeredCount}/{questions.length}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* User type indicator */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
            {userType === 'hoc_sinh' ? '🎓 Học sinh' : userType === 'sinh_vien' ? '👨‍🎓 Sinh viên' : '💼 Tìm việc'}
          </span>
          {selectedMajor && (
            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
              {majorLabels[selectedMajor].icon} {majorLabels[selectedMajor].label}
            </span>
          )}
        </div>
      </motion.div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100"
        >
          {/* Question */}
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">
            {currentQuestion.text}
          </h2>

          {/* Answers */}
          <div className="space-y-3">
            {currentQuestion.answers.map((answer, index) => {
              const isSelected = answers[currentQuestion.id] === answer.id;
              return (
                <motion.button
                  key={answer.id}
                  onClick={() => handleAnswer(answer.id)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-500 text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      {isSelected ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-medium">{answer.id.toUpperCase()}</span>
                      )}
                    </div>
                    <span className={`text-base ${isSelected ? 'text-indigo-700 font-medium' : 'text-gray-700'}`}>
                      {answer.text}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between mt-6"
      >
        <motion.button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
            currentIndex === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
          whileHover={currentIndex > 0 ? { scale: 1.02 } : {}}
          whileTap={currentIndex > 0 ? { scale: 0.98 } : {}}
        >
          <ChevronLeft className="w-5 h-5" />
          Câu trước
        </motion.button>

        {currentIndex < questions.length - 1 ? (
          <motion.button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl font-medium shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Câu tiếp
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        ) : (
          <motion.button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium shadow-lg disabled:opacity-70"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                Đang xử lý...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Hoàn thành
              </>
            )}
          </motion.button>
        )}
      </motion.div>

      {/* Question navigator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
      >
        <p className="text-sm text-gray-500 mb-3">Điều hướng nhanh:</p>
        <div className="flex flex-wrap gap-2">
          {questions.map((q, index) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = index === currentIndex;
            return (
              <motion.button
                key={q.id}
                onClick={() => setCurrentIndex(index)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                  isCurrent
                    ? 'bg-indigo-500 text-white'
                    : isAnswered
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {index + 1}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Warning if not all answered */}
      {currentIndex === questions.length - 1 && answeredCount < questions.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 flex items-center gap-2 text-amber-600 bg-amber-50 p-4 rounded-xl"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">
            Bạn còn {questions.length - answeredCount} câu chưa trả lời. Hãy hoàn thành tất cả để nhận kết quả chính xác!
          </p>
        </motion.div>
      )}
    </div>
  );
}

