'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Plus, Search, Edit, Trash2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/app/lib/api';

interface Question {
  _id: string;
  noiDung: string;
  loai: string;
  luaChon: { noiDung: string; diem: number }[];
  createdAt: string;
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/questions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setQuestions(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredQuestions = questions.filter(q => 
    q.noiDung.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-purple-400" />
            Quản lý Câu hỏi
          </h1>
          <p className="text-gray-400 mt-1">Quản lý câu hỏi trắc nghiệm</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600">
          <Plus className="w-4 h-4" />
          Thêm câu hỏi
        </button>
      </div>

      {/* Search */}
      <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-xl max-w-md">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm câu hỏi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm flex-1 text-gray-200"
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="text-center py-20">
            <ClipboardList className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Chưa có câu hỏi nào</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700">
            {filteredQuestions.map((question, index) => (
              <motion.div
                key={question._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 hover:bg-slate-700/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                        #{index + 1}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {question.luaChon?.length || 0} lựa chọn
                      </span>
                    </div>
                    <p className="text-white">{question.noiDung}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-600 rounded-lg">
                      <Edit className="w-4 h-4 text-blue-400" />
                    </button>
                    <button className="p-2 hover:bg-red-500/20 rounded-lg">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

