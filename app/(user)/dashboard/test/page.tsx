'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  Briefcase,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { userTypeLabels, UserType } from './data/questions';

const userTypes: { type: UserType; benefits: string[] }[] = [
  {
    type: 'hoc_sinh',
    benefits: [
      'Khám phá ngành học đại học phù hợp',
      'Hiểu rõ năng lực và sở thích',
      'Định hướng tương lai rõ ràng',
      '20 câu hỏi - 10 phút',
    ],
  },
  {
    type: 'sinh_vien',
    benefits: [
      'Tìm nghề nghiệp phù hợp với ngành học',
      'Gợi ý vị trí việc làm cụ thể',
      'Định hướng phát triển sự nghiệp',
      '5 câu hỏi chuyên sâu - 5 phút',
    ],
  },
  {
    type: 'that_nghiep',
    benefits: [
      'Phân tích kinh nghiệm và kỹ năng',
      'Gợi ý công việc phù hợp',
      'Mức lương và yêu cầu rõ ràng',
      '15 câu hỏi - 8 phút',
    ],
  },
];

const iconMap = {
  hoc_sinh: GraduationCap,
  sinh_vien: Briefcase,
  that_nghiep: Search,
};

export default function TestPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<UserType | null>(null);

  const handleStart = () => {
    if (selectedType) {
      localStorage.setItem('quizUserType', selectedType);
      router.push('/dashboard/test/quiz');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          Trắc nghiệm định hướng nghề nghiệp
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Bạn là ai?
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Chọn đối tượng phù hợp với bạn để nhận bộ câu hỏi và kết quả phù hợp nhất
        </p>
      </motion.div>

      {/* User type selection */}
      <div className="grid md:grid-cols-3 gap-6">
        {userTypes.map((item, index) => {
          const info = userTypeLabels[item.type];
          const Icon = iconMap[item.type];
          const isSelected = selectedType === item.type;

          return (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedType(item.type)}
              className={`relative bg-white rounded-2xl p-6 cursor-pointer transition-all border-2 ${
                isSelected
                  ? 'border-indigo-500 shadow-lg shadow-indigo-100'
                  : 'border-gray-100 hover:border-indigo-200 hover:shadow-md'
              }`}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </motion.div>
              )}

              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                isSelected
                  ? 'bg-gradient-to-br from-indigo-500 to-pink-500'
                  : 'bg-gray-100'
              }`}>
                <span className="text-3xl">{info.icon}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">{info.label}</h3>
              <p className="text-gray-500 text-sm mb-4">{info.description}</p>

              <div className="space-y-2">
                {item.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-indigo-500' : 'text-gray-400'}`} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Start button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <motion.button
          onClick={handleStart}
          disabled={!selectedType}
          className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all ${
            selectedType
              ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-200 hover:shadow-xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          whileHover={selectedType ? { scale: 1.02 } : {}}
          whileTap={selectedType ? { scale: 0.98 } : {}}
        >
          <Sparkles className="w-5 h-5" />
          Bắt đầu làm bài
          <ArrowRight className="w-5 h-5" />
        </motion.button>
        <p className="text-gray-500 text-sm mt-4">
          {selectedType
            ? `Bạn đã chọn: ${userTypeLabels[selectedType].label}`
            : 'Vui lòng chọn đối tượng phù hợp với bạn'}
        </p>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-amber-50 border border-amber-200 rounded-2xl p-6"
      >
        <h4 className="font-semibold text-amber-800 mb-2">💡 Mẹo làm bài</h4>
        <ul className="text-amber-700 text-sm space-y-1">
          <li>• Chọn đáp án phản ánh đúng nhất con người thật của bạn</li>
          <li>• Không có đáp án đúng hay sai, chỉ có đáp án phù hợp với bạn</li>
          <li>• Đọc kỹ câu hỏi trước khi trả lời</li>
        </ul>
      </motion.div>
    </div>
  );
}

