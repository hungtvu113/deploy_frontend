'use client';

import { motion } from 'framer-motion';
import {
  Users,
  ClipboardList,
  Briefcase,
  ArrowUpRight,
  Activity,
  UserPlus,
  FileText,
  Clock,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/app/lib/api';

interface Stats {
  totalUsers: number;
  totalQuizzes: number;
  totalCareers: number;
  totalQuestions: number;
  newUsersToday: number;
  quizzesToday: number;
}

interface RecentActivity {
  type: 'user' | 'quiz' | 'system';
  message: string;
  time: string;
}

interface RecentUser {
  _id: string;
  hoTen: string;
  email: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalQuizzes: 0,
    totalCareers: 0,
    totalQuestions: 0,
    newUsersToday: 0,
    quizzesToday: 0,
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentActivities();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecentActivities = async () => {
    try {
      const token = localStorage.getItem('token');
      // Fetch recent users
      const usersResponse = await fetch(`${API_BASE_URL}/admin/users?limit=5&sort=-createdAt`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usersData = await usersResponse.json();
      
      if (usersData.success && usersData.data) {
        const activities: RecentActivity[] = usersData.data.map((user: RecentUser) => ({
          type: 'user' as const,
          message: `Người dùng mới đăng ký: ${user.hoTen}`,
          time: formatTimeAgo(new Date(user.createdAt)),
        }));
        setRecentActivities(activities);
      }
    } catch (error) {
      console.error('Error fetching recent activities:', error);
    }
  };

  // Format time ago
  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  };

  const statCards = [
    {
      title: 'Tổng người dùng',
      value: stats.totalUsers,
      change: stats.newUsersToday,
      icon: Users,
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
    },
    {
      title: 'Bài trắc nghiệm',
      value: stats.totalQuizzes,
      change: stats.quizzesToday,
      icon: ClipboardList,
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
    },
    {
      title: 'Nghề nghiệp',
      value: stats.totalCareers,
      change: 0,
      icon: Briefcase,
      iconColor: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
    },
    {
      title: 'Câu hỏi',
      value: stats.totalQuestions,
      change: 0,
      icon: FileText,
      iconColor: 'text-green-400',
      bgColor: 'bg-green-500/20',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Tổng quan hệ thống CareerAI</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              {card.change > 0 && (
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+{card.change}</span>
                </div>
              )}
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">
                {isLoading ? '...' : card.value.toLocaleString()}
              </p>
              <p className="text-gray-400 text-sm mt-1">{card.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
      >
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-orange-400" />
          Hoạt động gần đây
        </h2>
        <div className="space-y-4">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-xl">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'user' ? 'bg-blue-500/20' :
                  activity.type === 'quiz' ? 'bg-purple-500/20' : 'bg-green-500/20'
                }`}>
                  {activity.type === 'user' ? <UserPlus className="w-4 h-4 text-blue-400" /> :
                   activity.type === 'quiz' ? <ClipboardList className="w-4 h-4 text-purple-400" /> :
                   <Activity className="w-4 h-4 text-green-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-gray-200 text-sm">{activity.message}</p>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              {isLoading ? 'Đang tải...' : 'Chưa có hoạt động nào'}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
