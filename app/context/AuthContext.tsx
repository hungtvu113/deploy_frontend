'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../lib/api';

interface User {
  _id: string;
  hoTen: string;
  email: string;
  vaiTro: string;
  avatar?: string;
  soDienThoai?: string;
  ngaySinh?: string;
  diaChi?: string;
  ngheNghiep?: string;
  trinhDo?: string;
  gioiThieu?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, matKhau: string) => Promise<{ success: boolean; message?: string }>;
  register: (hoTen: string, email: string, matKhau: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Kiểm tra token khi app load
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        setToken(savedToken);
        try {
          const response = await authApi.getMe();
          if (response.success && response.data) {
            setUser(response.data as User);
          } else {
            // Token không hợp lệ, xóa đi
            localStorage.removeItem('token');
            setToken(null);
          }
        } catch {
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Đăng nhập
  const login = async (email: string, matKhau: string) => {
    try {
      const response = await authApi.login({ email, matKhau });
      
      if (response.success && response.token && response.data) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        setUser(response.data as User);
        return { success: true };
      }
      
      return { success: false, message: response.message || 'Đăng nhập thất bại' };
    } catch {
      return { success: false, message: 'Có lỗi xảy ra. Vui lòng thử lại.' };
    }
  };

  // Đăng ký
  const register = async (hoTen: string, email: string, matKhau: string) => {
    try {
      const response = await authApi.register({ hoTen, email, matKhau });
      
      if (response.success && response.token && response.data) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        setUser(response.data as User);
        return { success: true };
      }
      
      return { success: false, message: response.message || 'Đăng ký thất bại' };
    } catch {
      return { success: false, message: 'Có lỗi xảy ra. Vui lòng thử lại.' };
    }
  };

  // Đăng xuất
  const logout = () => {
    // Chỉ xóa token và session data
    // Giữ lại quizHistory và chatHistory vì đã được phân biệt theo userId
    localStorage.removeItem('token');
    localStorage.removeItem('quizResults'); // Xóa kết quả mới nhất (session)
    localStorage.removeItem('quizUserType'); // Xóa loại user hiện tại (session)
    // KHÔNG xóa quizHistory - data được lưu với userId, sẽ filter khi load
    // KHÔNG xóa chatHistory - data được lưu với userId, sẽ filter khi load
    setToken(null);
    setUser(null);
  };

  // Cập nhật thông tin user
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

