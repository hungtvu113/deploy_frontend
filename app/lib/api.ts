// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
  errors?: Array<{ field: string; message: string }>;
}

// Helper function để gọi API
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      message: 'Không thể kết nối đến server. Vui lòng thử lại sau.',
    };
  }
}

// Auth API
export const authApi = {
  // Đăng ký
  register: (userData: { hoTen: string; email: string; matKhau: string }) =>
    fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  // Đăng nhập
  login: (credentials: { email: string; matKhau: string }) =>
    fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  // Lấy thông tin user hiện tại
  getMe: () => fetchApi('/auth/me'),

  // Đăng xuất
  logout: () => fetchApi('/auth/logout', { method: 'POST' }),
};

// User API
export const userApi = {
  // Lấy profile
  getProfile: () => fetchApi('/users/profile'),

  // Cập nhật profile
  updateProfile: (data: Record<string, unknown>) =>
    fetchApi('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Đổi mật khẩu
  changePassword: (data: { matKhauCu: string; matKhauMoi: string }) =>
    fetchApi('/users/change-password', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Quiz API
export const quizApi = {
  // Lấy câu hỏi
  getQuestions: () => fetchApi('/questions'),

  // Bắt đầu làm bài
  startQuiz: () => fetchApi('/quiz/start', { method: 'POST' }),

  // Nộp bài
  submitQuiz: (data: { baiLamId: string; cauTraLoi: Array<{ cauHoiId: string; luaChonId: string }> }) =>
    fetchApi('/quiz/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Lấy kết quả
  getResult: (id: string) => fetchApi(`/quiz/result/${id}`),

  // Lấy lịch sử
  getHistory: () => fetchApi('/quiz/history'),
};

// Career API
export const careerApi = {
  // Lấy danh sách nghề
  getCareers: (params?: { nhomNganh?: string; search?: string; page?: number }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return fetchApi(`/careers${query ? `?${query}` : ''}`);
  },

  // Lấy chi tiết nghề
  getCareer: (id: string) => fetchApi(`/careers/${id}`),

  // Lấy nhóm ngành
  getCareerGroups: () => fetchApi('/careers/groups'),
};

// Chat API
export const chatApi = {
  // Tạo cuộc trò chuyện mới
  createChat: (data: { tieuDe?: string; userType?: string; latestQuizResult?: any }) =>
    fetchApi('/chat/new', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Gửi tin nhắn
  sendMessage: (chatId: string, message: string) =>
    fetchApi(`/chat/${chatId}/message`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),

  // Lấy danh sách chat
  getChats: (params?: { status?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return fetchApi(`/chat${query ? `?${query}` : ''}`);
  },

  // Lấy chi tiết chat
  getChat: (id: string) => fetchApi(`/chat/${id}`),

  // Cập nhật chat
  updateChat: (id: string, data: { tieuDe?: string; trangThai?: string }) =>
    fetchApi(`/chat/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Xóa chat
  deleteChat: (id: string) =>
    fetchApi(`/chat/${id}`, {
      method: 'DELETE',
    }),
};

export default fetchApi;

