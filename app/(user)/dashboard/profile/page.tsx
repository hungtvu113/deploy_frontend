'use client';

import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Edit3,
  Camera,
  Shield,
  Save,
  Loader2,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { userApi } from '@/app/lib/api';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    hoTen: '',
    email: '',
    soDienThoai: '',
    ngaySinh: '',
    diaChi: '',
    ngheNghiep: '',
    trinhDo: '',
    gioiThieu: '',
  });

  // Load thông tin user từ AuthContext
  useEffect(() => {
    if (user) {
      setFormData({
        hoTen: user.hoTen || '',
        email: user.email || '',
        soDienThoai: user.soDienThoai || '',
        ngaySinh: user.ngaySinh ? new Date(user.ngaySinh).toISOString().split('T')[0] : '',
        diaChi: user.diaChi || '',
        ngheNghiep: user.ngheNghiep || '',
        trinhDo: user.trinhDo || '',
        gioiThieu: user.gioiThieu || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await userApi.updateProfile({
        hoTen: formData.hoTen,
        soDienThoai: formData.soDienThoai,
        ngaySinh: formData.ngaySinh || undefined,
        diaChi: formData.diaChi,
        ngheNghiep: formData.ngheNghiep,
        trinhDo: formData.trinhDo,
        gioiThieu: formData.gioiThieu,
      });

      if (response.success) {
        setMessage({ type: 'success', text: 'Cập nhật thông tin thành công!' });
        updateUser({ hoTen: formData.hoTen });
        setIsEditing(false);
      } else {
        setMessage({ type: 'error', text: response.message || 'Có lỗi xảy ra' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Không thể kết nối server' });
    }

    setIsSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
      >
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
          <button className="absolute bottom-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Profile info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                {formData.hoTen.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 transition-colors">
                <Camera className="w-3 h-3" />
              </button>
            </div>

            {/* Name & role */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{formData.hoTen}</h1>
              <p className="text-gray-500">{formData.ngheNghiep} • {formData.trinhDo}</p>
            </div>

            {/* Edit button */}
            <motion.button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              disabled={isSaving}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                isEditing
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } disabled:opacity-50`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang lưu...
                </>
              ) : isEditing ? (
                <>
                  <Save className="w-4 h-4" />
                  Lưu thay đổi
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4" />
                  Chỉnh sửa
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Message */}
      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl ${
            message.type === 'success'
              ? 'bg-green-50 text-green-600 border border-green-200'
              : 'bg-red-50 text-red-600 border border-red-200'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      {/* Form sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-500" />
            Thông tin cá nhân
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Họ và tên</label>
              <input
                type="text"
                value={formData.hoTen}
                onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Ngày sinh</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={formData.ngaySinh}
                  onChange={(e) => setFormData({ ...formData, ngaySinh: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Địa chỉ</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.diaChi}
                  onChange={(e) => setFormData({ ...formData, diaChi: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-500" />
            Thông tin liên hệ
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <Shield className="w-3 h-3" /> Email không thể thay đổi
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Số điện thoại</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={formData.soDienThoai}
                  onChange={(e) => setFormData({ ...formData, soDienThoai: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Career info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-500" />
          Thông tin nghề nghiệp
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Nghề nghiệp hiện tại</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={formData.ngheNghiep}
                onChange={(e) => setFormData({ ...formData, ngheNghiep: e.target.value })}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Trình độ học vấn</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={formData.trinhDo}
                onChange={(e) => setFormData({ ...formData, trinhDo: e.target.value })}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none disabled:bg-gray-50 disabled:text-gray-500 appearance-none"
              >
                <option value="THPT">THPT</option>
                <option value="Cao đẳng">Cao đẳng</option>
                <option value="Đại học">Đại học</option>
                <option value="Thạc sĩ">Thạc sĩ</option>
                <option value="Tiến sĩ">Tiến sĩ</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">Giới thiệu bản thân</label>
            <textarea
              value={formData.gioiThieu}
              onChange={(e) => setFormData({ ...formData, gioiThieu: e.target.value })}
              disabled={!isEditing}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none disabled:bg-gray-50 disabled:text-gray-500 resize-none"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

