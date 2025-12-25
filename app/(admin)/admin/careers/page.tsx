'use client';

import { motion } from 'framer-motion';
import { Briefcase, Plus, Search, Edit, Trash2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/app/lib/api';

interface Career {
  _id: string;
  tenNghe: string;
  moTa: string;
  nhomNganh: { tenNhom: string };
  mucLuong: { min: number; max: number };
}

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/careers`);
      const data = await response.json();
      if (data.success) {
        setCareers(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching careers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCareers = careers.filter(c => 
    c.tenNghe?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-orange-400" />
            Quản lý Nghề nghiệp
          </h1>
          <p className="text-gray-400 mt-1">Quản lý danh sách nghề nghiệp và nhóm ngành</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600">
          <Plus className="w-4 h-4" />
          Thêm nghề
        </button>
      </div>

      {/* Search */}
      <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-xl max-w-md">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm nghề nghiệp..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm flex-1 text-gray-200"
          />
        </div>
      </div>

      {/* Careers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-orange-400 animate-spin" />
          </div>
        ) : filteredCareers.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Chưa có nghề nghiệp nào</p>
          </div>
        ) : (
          filteredCareers.map((career, index) => (
            <motion.div
              key={career._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-orange-500/50"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-white font-semibold">{career.tenNghe}</h3>
                <div className="flex gap-1">
                  <button className="p-1.5 hover:bg-slate-600 rounded-lg">
                    <Edit className="w-4 h-4 text-blue-400" />
                  </button>
                  <button className="p-1.5 hover:bg-red-500/20 rounded-lg">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
              <p className="text-gray-400 text-sm line-clamp-2 mb-3">{career.moTa}</p>
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                  {career.nhomNganh?.tenNhom || 'Chưa phân loại'}
                </span>
                {career.mucLuong && (
                  <span className="text-green-400 text-sm">
                    {career.mucLuong.min}-{career.mucLuong.max}M
                  </span>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

