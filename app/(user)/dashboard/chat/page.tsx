'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Loader2,
  Bot,
  User,
  Trash2,
  Sparkles,
  TrendingUp,
  Award,
  Target,
  MessageCircle,
} from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/app/lib/api';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string; // Changed to string for localStorage serialization
}

interface QuizContext {
  userType?: string;
  scores?: Record<string, number>;
  topFields?: string[];
  completedAt?: string;
  selectedMajor?: string;
}

interface StoredChat {
  chatId: string;
  messages: Message[];
  quizContext: QuizContext | null;
  userId: string;
  updatedAt: string;
}

// Helper: Get current userId from token
const getCurrentUserId = (): string | null => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    } catch (e) {
      console.error('Error parsing token:', e);
    }
  }
  return null;
};

export default function ChatPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [quizContext, setQuizContext] = useState<QuizContext | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (chatId && messages.length > 0) {
      const userId = getCurrentUserId();
      if (userId) {
        const storedChat: StoredChat = {
          chatId,
          messages,
          quizContext,
          userId,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem('chatHistory', JSON.stringify(storedChat));
      }
    }
  }, [messages, chatId, quizContext]);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  // Load chat from localStorage or create new
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    loadChatHistory();
  }, [isAuthenticated]);

  // Load existing chat or create new
  const loadChatHistory = () => {
    const userId = getCurrentUserId();
    const storedChat = localStorage.getItem('chatHistory');

    if (storedChat) {
      try {
        const parsed: StoredChat = JSON.parse(storedChat);

        // Only load if chat belongs to current user
        if (parsed.userId === userId && parsed.messages.length > 0) {
          setChatId(parsed.chatId);
          setMessages(parsed.messages);
          setQuizContext(parsed.quizContext);
          return;
        }
      } catch (e) {
        console.error('Error loading chat history:', e);
      }
    }

    // No valid stored chat, create new
    loadQuizResultsAndCreateChat();
  };

  // Load quiz results từ localStorage
  const loadQuizResultsAndCreateChat = async () => {
    try {
      // Lấy quiz results từ localStorage
      const quizResults = localStorage.getItem('quizResults');
      let latestQuizResult = null;

      if (quizResults) {
        const parsed = JSON.parse(quizResults);
        
        // Lấy userId hiện tại để verify
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

        // Chỉ sử dụng nếu là kết quả của user hiện tại
        const resultUserId = (parsed as any).userId;
        if (!currentUserId || !resultUserId || resultUserId === currentUserId) {
          latestQuizResult = {
            userType: parsed.userType,
            scores: parsed.scores,
            selectedMajor: parsed.selectedMajor,
            completedAt: parsed.completedAt,
          };
          setQuizContext(latestQuizResult);
        }
      }

      // Tạo chat với context
      createNewChat(latestQuizResult);
    } catch (error) {
      console.error('Error loading quiz results:', error);
      createNewChat(null);
    }
  };

  // Tạo cuộc trò chuyện mới
  const createNewChat = async (quizResult: any) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/chat/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tieuDe: 'Phân tích kết quả trắc nghiệm',
          userType: quizResult?.userType || 'general',
          latestQuizResult: quizResult,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setChatId(data.data._id);
        
        // Tạo welcome message dựa trên quiz results
        let welcomeMessage = `Xin chào ${user?.hoTen || 'bạn'}! 👋\n\nMình là CareerBot - trợ lý AI chuyên nghiệp của CareerAI.\n\n`;

        if (quizResult) {
          welcomeMessage += `🎯 **Tôi đã phân tích kết quả trắc nghiệm của bạn:**\n\n`;
          
          if (quizResult.userType === 'hoc_sinh') {
            welcomeMessage += `📚 **Loại:** Học sinh THPT\n`;
            welcomeMessage += `💡 **Nhóm ngành phù hợp:** ${getTopFields(quizResult.scores)}\n\n`;
            welcomeMessage += `Bạn có thể hỏi tôi về:\n• Các trường đại học phù hợp\n• Ngành học cụ thể\n• Điểm chuẩn và yêu cầu\n• Cơ hội nghề nghiệp sau khi tốt nghiệp`;
          } else if (quizResult.userType === 'sinh_vien') {
            welcomeMessage += `🎓 **Loại:** Sinh viên\n`;
            if (quizResult.selectedMajor) {
              welcomeMessage += `📖 **Ngành học:** ${getMajorLabel(quizResult.selectedMajor)}\n`;
            }
            welcomeMessage += `\nBạn có thể hỏi tôi về:\n• Vị trí việc làm phù hợp\n• Kỹ năng cần phát triển\n• Công ty và môi trường làm việc\n• Lộ trình sự nghiệp`;
          } else if (quizResult.userType === 'that_nghiep') {
            welcomeMessage += `💼 **Loại:** Người tìm việc\n`;
            welcomeMessage += `\nBạn có thể hỏi tôi về:\n• Công việc phù hợp với kinh nghiệm\n• Cách tìm việc hiệu quả\n• CV và phỏng vấn\n• Chuyển đổi nghề nghiệp`;
          }
        } else {
          welcomeMessage += `💬 Tôi có thể giúp bạn:\n• Tư vấn nghề nghiệp\n• Định hướng học tập\n• Phát triển kỹ năng\n• Lộ trình sự nghiệp\n\n💡 **Gợi ý:** Làm bài trắc nghiệm để tôi phân tích sâu hơn về bạn!`;
        }

        welcomeMessage += `\n\n😊 Bạn muốn hỏi gì nào?`;

        setMessages([
          {
            role: 'assistant',
            content: welcomeMessage,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  // Helper: Get top fields từ scores
  const getTopFields = (scores: Record<string, number>) => {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 3);
    return sorted.map(([key]) => getFieldLabel(key)).join(', ');
  };

  // Helper: Get field label
  const getFieldLabel = (key: string) => {
    const labels: Record<string, string> = {
      KHTN: 'Khoa học Tự nhiên',
      KHXH: 'Khoa học Xã hội',
      KTCN: 'Kỹ thuật Công nghệ',
      YTSK: 'Y tế Sức khỏe',
      KTQT: 'Kinh tế Quản trị',
      NGHE_THUAT: 'Nghệ thuật',
      NGOAI_NGU: 'Ngoại ngữ',
    };
    return labels[key] || key;
  };

  // Helper: Get major label
  const getMajorLabel = (major: string) => {
    const labels: Record<string, string> = {
      cntt: 'Công nghệ thông tin',
      dieu_duong: 'Điều dưỡng',
      logistics: 'Logistics',
      co_khi: 'Cơ khí',
    };
    return labels[major] || major;
  };

  // Gửi tin nhắn với streaming
  const sendMessage = async () => {
    if (!input.trim() || !chatId || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Thêm tin nhắn user
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/chat/${chatId}/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No reader available');
      }

      setIsStreaming(true);
      let aiMessageContent = '';

      // Thêm message rỗng cho AI
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '',
          timestamp: new Date().toISOString(),
        },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                aiMessageContent += data.content;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: 'assistant',
                    content: aiMessageContent,
                    timestamp: new Date().toISOString(),
                  };
                  return newMessages;
                });
              }
              if (data.done) {
                break;
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
      }

      setIsStreaming(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  // Xử lý Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Clear chat
  const clearChat = () => {
    setMessages([]);
    setChatId(null);
    localStorage.removeItem('chatHistory');
    loadQuizResultsAndCreateChat();
  };

  // Suggested questions
  const suggestedQuestions = quizContext?.userType === 'hoc_sinh'
    ? [
        'Trường nào phù hợp với điểm số của tôi?',
        'Ngành này học những gì?',
        'Cơ hội việc làm ra sao?',
      ]
    : quizContext?.userType === 'sinh_vien'
    ? [
        'Kỹ năng nào cần thiết cho ngành này?',
        'Mức lương trung bình là bao nhiêu?',
        'Công ty nào tuyển vị trí này?',
      ]
    : [
        'Tôi nên học thêm gì để chuyển ngành?',
        'Làm sao để tìm việc nhanh?',
        'CV của tôi cần cải thiện điều gì?',
      ];

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Trò chuyện với CareerBot</h1>
              <p className="text-gray-500">
                {quizContext
                  ? '🎯 Phân tích dựa trên kết quả trắc nghiệm của bạn'
                  : '💬 Tư vấn nghề nghiệp thông minh'}
              </p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl font-medium flex items-center gap-2 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Xóa chat
          </button>
        </div>

        {/* Quiz Context Summary */}
        {quizContext && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-indigo-50 rounded-xl p-3">
              <div className="flex items-center gap-2 text-indigo-600 mb-1">
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">Loại</span>
              </div>
              <p className="text-sm text-gray-700">
                {quizContext.userType === 'hoc_sinh' && 'Học sinh THPT'}
                {quizContext.userType === 'sinh_vien' && 'Sinh viên'}
                {quizContext.userType === 'that_nghiep' && 'Người tìm việc'}
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3">
              <div className="flex items-center gap-2 text-purple-600 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">Kết quả</span>
              </div>
              <p className="text-sm text-gray-700">
                {quizContext.scores ? Object.keys(quizContext.scores).length + ' nhóm' : 'Chưa có'}
              </p>
            </div>
            <div className="bg-pink-50 rounded-xl p-3">
              <div className="flex items-center gap-2 text-pink-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Phù hợp</span>
              </div>
              <p className="text-sm text-gray-700">
                {quizContext.scores ? getTopFields(quizContext.scores).split(',')[0] : 'Đa dạng'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-500'
                    : 'bg-gradient-to-br from-pink-500 to-orange-500'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-6 h-6 text-white" />
                ) : (
                  <Bot className="w-6 h-6 text-white" />
                )}
              </div>

              {/* Message bubble */}
              <div
                className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white'
                    : 'bg-gray-50 border border-gray-200 text-gray-800'
                }`}
              >
                <p className="text-[15px] whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isStreaming && messages[messages.length - 1]?.role === 'assistant' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4">
                <div className="flex gap-1">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <div className="px-6 pb-4">
            <p className="text-sm text-gray-500 mb-3">💡 Câu hỏi gợi ý:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl text-sm transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập câu hỏi của bạn..."
                rows={1}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 max-h-32"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span className="font-medium">Gửi</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            <Sparkles className="w-3 h-3 inline mr-1" />
            Powered by Cerebras AI • Shift + Enter để xuống dòng
          </p>
        </div>
      </div>
    </div>
  );
}
