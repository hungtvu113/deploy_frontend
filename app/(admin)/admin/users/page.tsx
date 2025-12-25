'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Shield,
  UserX,
  UserCheck,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/app/lib/api';

interface User {
  _id: string;
  hoTen: string;
  email: string;
  vaiTro: 'user' | 'admin';
  isActive: boolean;
  ngayTao: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, pages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(search && { search }),
        ...(roleFilter && { role: roleFilter }),
        ...(statusFilter && { status: statusFilter }),
      });

      const response = await fetch(`${API_BASE_URL}/admin/users?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchUsers();
  };

  const updateUserRole = async (userId: string, role: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_BASE_URL}/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });
      fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
    }
    setSelectedUser(null);
  };

  const toggleUserStatus = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_BASE_URL}/admin/users/${userId}/toggle-status`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
    setSelectedUser(null);
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Bạn có chắc muốn xóa người dùng này?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-400" />
            Quản lý Người dùng
          </h1>
          <p className="text-gray-400 mt-1">Quản lý tài khoản người dùng trong hệ thống</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-xl">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm theo tên hoặc email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm flex-1 text-gray-200"
              />
            </div>
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 bg-slate-700 rounded-xl text-gray-200 text-sm"
          >
            <option value="">Tất cả role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-slate-700 rounded-xl text-gray-200 text-sm"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Đã khóa</option>
          </select>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600">
            Tìm kiếm
          </button>
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Người dùng</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Trạng thái</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Ngày tạo</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-700/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {user.hoTen.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.hoTen}</p>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.vaiTro === 'admin'
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {user.vaiTro}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.isActive !== false
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {user.isActive !== false ? 'Hoạt động' : 'Đã khóa'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(user.ngayTao).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative">
                        <button
                          onClick={() => setSelectedUser(selectedUser === user._id ? null : user._id)}
                          className="p-2 hover:bg-slate-600 rounded-lg"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                        {selectedUser === user._id && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute right-0 top-10 w-48 bg-slate-700 rounded-xl shadow-xl border border-slate-600 overflow-hidden z-10"
                          >
                            <button
                              onClick={() => updateUserRole(user._id, user.vaiTro === 'admin' ? 'user' : 'admin')}
                              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-slate-600 text-gray-200 text-sm"
                            >
                              <Shield className="w-4 h-4" />
                              {user.vaiTro === 'admin' ? 'Hạ xuống User' : 'Nâng lên Admin'}
                            </button>
                            <button
                              onClick={() => toggleUserStatus(user._id)}
                              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-slate-600 text-gray-200 text-sm"
                            >
                              {user.isActive !== false ? (
                                <><UserX className="w-4 h-4" /> Khóa tài khoản</>
                              ) : (
                                <><UserCheck className="w-4 h-4" /> Mở khóa</>
                              )}
                            </button>
                            <button
                              onClick={() => deleteUser(user._id)}
                              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-500/20 text-red-400 text-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                              Xóa người dùng
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-700 flex items-center justify-between">
              <p className="text-gray-400 text-sm">
                Hiển thị {users.length} / {pagination.total} người dùng
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page <= 1}
                  className="p-2 hover:bg-slate-700 rounded-lg disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                </button>
                <span className="text-gray-400 text-sm">
                  Trang {pagination.page} / {pagination.pages || 1}
                </span>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page >= pagination.pages}
                  className="p-2 hover:bg-slate-700 rounded-lg disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

