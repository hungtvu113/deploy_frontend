'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Search,
  Briefcase,
  TrendingUp,
  DollarSign,
  ChevronRight,
  GraduationCap,
  Building2,
  Star,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { UserType, UniversityField, universityFieldLabels } from '../test/data/questions';
import { jobSuggestions } from '../test/data/thatNghiepQuestions';

interface CareerItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  salary?: string;
  demand?: string;
  skills?: string[];
  category: string;
}

interface QuizResult {
  userType: UserType;
  selectedMajor?: string;
  scores: Record<string, number>;
  completedAt: string;
}

// Dữ liệu ngành học đại học cho học sinh
const universityMajors: CareerItem[] = [
  // KHTN
  { id: '1', name: 'Toán học', description: 'Nghiên cứu các cấu trúc, không gian và phép tính', icon: '📐', salary: '12-25', demand: 'Cao', skills: ['Tư duy logic', 'Phân tích', 'Giải quyết vấn đề'], category: 'KHTN' },
  { id: '2', name: 'Vật lý', description: 'Nghiên cứu vật chất, năng lượng và các định luật tự nhiên', icon: '⚛️', salary: '15-30', demand: 'Cao', skills: ['Tư duy logic', 'Thực nghiệm', 'Phân tích dữ liệu'], category: 'KHTN' },
  { id: '3', name: 'Hóa học', description: 'Nghiên cứu cấu tạo, tính chất và biến đổi của chất', icon: '🧪', salary: '12-28', demand: 'Cao', skills: ['Thực hành lab', 'Phân tích', 'Nghiên cứu'], category: 'KHTN' },
  { id: '4', name: 'Sinh học', description: 'Nghiên cứu sự sống và các sinh vật', icon: '🧬', salary: '10-25', demand: 'Trung bình', skills: ['Nghiên cứu', 'Thực hành', 'Quan sát'], category: 'KHTN' },

  // KTCN
  { id: '5', name: 'Công nghệ thông tin', description: 'Phát triển phần mềm, hệ thống và ứng dụng', icon: '💻', salary: '15-50', demand: 'Rất cao', skills: ['Lập trình', 'Giải quyết vấn đề', 'Tư duy logic'], category: 'KTCN' },
  { id: '6', name: 'Kỹ thuật điện tử', description: 'Thiết kế và phát triển các hệ thống điện tử', icon: '🔌', salary: '12-35', demand: 'Cao', skills: ['Điện tử', 'Lập trình nhúng', 'Thiết kế mạch'], category: 'KTCN' },
  { id: '7', name: 'Cơ khí', description: 'Thiết kế, chế tạo máy móc và thiết bị', icon: '⚙️', salary: '12-30', demand: 'Cao', skills: ['Thiết kế CAD', 'Vật liệu', 'Sản xuất'], category: 'KTCN' },
  { id: '8', name: 'Xây dựng', description: 'Thiết kế và xây dựng công trình', icon: '🏗️', salary: '15-40', demand: 'Cao', skills: ['Thiết kế kết cấu', 'Quản lý dự án', 'AutoCAD'], category: 'KTCN' },

  // YTSK
  { id: '9', name: 'Bác sĩ đa khoa', description: 'Khám chữa bệnh và chăm sóc sức khỏe', icon: '👨‍⚕️', salary: '20-60', demand: 'Rất cao', skills: ['Chẩn đoán', 'Điều trị', 'Giao tiếp'], category: 'YTSK' },
  { id: '10', name: 'Dược sĩ', description: 'Nghiên cứu và cung cấp thuốc', icon: '💊', salary: '15-35', demand: 'Cao', skills: ['Hóa dược', 'Tư vấn', 'Nghiên cứu'], category: 'YTSK' },
  { id: '11', name: 'Điều dưỡng', description: 'Chăm sóc và hỗ trợ bệnh nhân', icon: '🏥', salary: '10-25', demand: 'Rất cao', skills: ['Chăm sóc', 'Giao tiếp', 'Y tế cơ bản'], category: 'YTSK' },

  // KTQT
  { id: '12', name: 'Quản trị kinh doanh', description: 'Quản lý và điều hành doanh nghiệp', icon: '📊', salary: '15-50', demand: 'Cao', skills: ['Lãnh đạo', 'Chiến lược', 'Quản lý'], category: 'KTQT' },
  { id: '13', name: 'Kế toán', description: 'Quản lý tài chính và sổ sách kế toán', icon: '📒', salary: '10-30', demand: 'Cao', skills: ['Kế toán', 'Excel', 'Phân tích tài chính'], category: 'KTQT' },
  { id: '14', name: 'Marketing', description: 'Nghiên cứu thị trường và xây dựng thương hiệu', icon: '📈', salary: '12-40', demand: 'Cao', skills: ['Sáng tạo', 'Digital marketing', 'Phân tích'], category: 'KTQT' },
  { id: '15', name: 'Logistics', description: 'Quản lý chuỗi cung ứng và vận tải', icon: '🚚', salary: '12-35', demand: 'Rất cao', skills: ['Quản lý kho', 'Vận tải', 'Lập kế hoạch'], category: 'KTQT' },

  // KHXH
  { id: '16', name: 'Luật', description: 'Nghiên cứu và thực hành pháp luật', icon: '⚖️', salary: '15-50', demand: 'Cao', skills: ['Phân tích', 'Tranh luận', 'Viết lách'], category: 'KHXH' },
  { id: '17', name: 'Tâm lý học', description: 'Nghiên cứu tâm lý và hành vi con người', icon: '🧠', salary: '10-30', demand: 'Đang tăng', skills: ['Lắng nghe', 'Phân tích', 'Tư vấn'], category: 'KHXH' },
  { id: '18', name: 'Báo chí', description: 'Thu thập và truyền tải thông tin', icon: '📰', salary: '10-30', demand: 'Trung bình', skills: ['Viết lách', 'Phỏng vấn', 'Truyền thông'], category: 'KHXH' },

  // NGHE_THUAT
  { id: '19', name: 'Thiết kế đồ họa', description: 'Thiết kế hình ảnh và truyền thông thị giác', icon: '🎨', salary: '10-35', demand: 'Cao', skills: ['Photoshop', 'Illustrator', 'Sáng tạo'], category: 'NGHE_THUAT' },
  { id: '20', name: 'Kiến trúc', description: 'Thiết kế công trình và không gian', icon: '🏛️', salary: '15-45', demand: 'Cao', skills: ['Thiết kế', 'AutoCAD', '3D modeling'], category: 'NGHE_THUAT' },

  // NGOAI_NGU
  { id: '21', name: 'Ngôn ngữ Anh', description: 'Nghiên cứu và giảng dạy tiếng Anh', icon: '🇬🇧', salary: '10-30', demand: 'Cao', skills: ['Giao tiếp', 'Dịch thuật', 'Giảng dạy'], category: 'NGOAI_NGU' },
  { id: '22', name: 'Ngôn ngữ Nhật', description: 'Nghiên cứu và giảng dạy tiếng Nhật', icon: '🇯🇵', salary: '12-35', demand: 'Cao', skills: ['Giao tiếp', 'Dịch thuật', 'Văn hóa Nhật'], category: 'NGOAI_NGU' },
  { id: '23', name: 'Ngôn ngữ Hàn', description: 'Nghiên cứu và giảng dạy tiếng Hàn', icon: '🇰🇷', salary: '12-35', demand: 'Cao', skills: ['Giao tiếp', 'Dịch thuật', 'Văn hóa Hàn'], category: 'NGOAI_NGU' },
];

// Dữ liệu việc làm cho người tìm việc
const jobCareers: CareerItem[] = [
  // Lao động phổ thông
  { id: 'j1', name: 'Công nhân sản xuất', description: 'Làm việc trong nhà máy, dây chuyền sản xuất', icon: '🏭', salary: '6-12', demand: 'Rất cao', skills: ['Chăm chỉ', 'Làm việc nhóm'], category: 'lao_dong' },
  { id: 'j2', name: 'Thợ xây dựng', description: 'Xây dựng và sửa chữa công trình', icon: '👷', salary: '8-15', demand: 'Cao', skills: ['Thể lực', 'Kỹ thuật xây dựng'], category: 'lao_dong' },
  { id: 'j3', name: 'Tài xế', description: 'Lái xe vận tải, giao hàng', icon: '🚗', salary: '8-18', demand: 'Cao', skills: ['Bằng lái', 'Am hiểu đường'], category: 'lao_dong' },

  // Bán hàng
  { id: 'j4', name: 'Nhân viên bán hàng', description: 'Tư vấn và bán sản phẩm cho khách', icon: '🛒', salary: '7-15', demand: 'Cao', skills: ['Giao tiếp', 'Thuyết phục'], category: 'ban_hang' },
  { id: 'j5', name: 'Telesales', description: 'Bán hàng qua điện thoại', icon: '📞', salary: '8-20', demand: 'Cao', skills: ['Giao tiếp', 'Kiên nhẫn'], category: 'ban_hang' },

  // Văn phòng
  { id: 'j6', name: 'Nhân viên hành chính', description: 'Xử lý công việc văn phòng, giấy tờ', icon: '📋', salary: '8-15', demand: 'Trung bình', skills: ['Tin học VP', 'Tổ chức'], category: 'van_phong' },
  { id: 'j7', name: 'Kế toán viên', description: 'Xử lý sổ sách, chứng từ kế toán', icon: '📒', salary: '10-20', demand: 'Cao', skills: ['Kế toán', 'Excel'], category: 'van_phong' },

  // Kỹ thuật
  { id: 'j8', name: 'Thợ điện', description: 'Sửa chữa và lắp đặt hệ thống điện', icon: '⚡', salary: '10-20', demand: 'Cao', skills: ['Điện cơ bản', 'An toàn điện'], category: 'ky_thuat' },
  { id: 'j9', name: 'Thợ sửa xe', description: 'Bảo dưỡng và sửa chữa xe máy, ô tô', icon: '🔧', salary: '8-18', demand: 'Cao', skills: ['Cơ khí', 'Chẩn đoán lỗi'], category: 'ky_thuat' },

  // IT
  { id: 'j10', name: 'Lập trình viên', description: 'Phát triển phần mềm và ứng dụng', icon: '💻', salary: '15-50', demand: 'Rất cao', skills: ['Lập trình', 'Tư duy logic'], category: 'it' },
  { id: 'j11', name: 'Tester', description: 'Kiểm thử phần mềm', icon: '🔍', salary: '10-25', demand: 'Cao', skills: ['Kiểm thử', 'Chi tiết'], category: 'it' },

  // Quản lý
  { id: 'j12', name: 'Quản lý cửa hàng', description: 'Điều hành và quản lý cửa hàng', icon: '🏪', salary: '12-25', demand: 'Cao', skills: ['Lãnh đạo', 'Quản lý'], category: 'quan_ly' },

  // Tự do
  { id: 'j13', name: 'Freelancer', description: 'Làm việc tự do theo dự án', icon: '🎯', salary: '10-50', demand: 'Cao', skills: ['Chuyên môn', 'Tự quản lý'], category: 'tu_do' },
  { id: 'j14', name: 'Kinh doanh online', description: 'Bán hàng trực tuyến', icon: '🛍️', salary: '5-30', demand: 'Cao', skills: ['Marketing', 'Bán hàng'], category: 'tu_do' },
];

const categoryLabels: Record<string, { name: string; icon: string }> = {
  // Học sinh
  KHTN: { name: 'Khoa học Tự nhiên', icon: '🔬' },
  KTCN: { name: 'Kỹ thuật Công nghệ', icon: '⚙️' },
  YTSK: { name: 'Y tế Sức khỏe', icon: '🏥' },
  KTQT: { name: 'Kinh tế Quản trị', icon: '💰' },
  KHXH: { name: 'Khoa học Xã hội', icon: '📚' },
  NGHE_THUAT: { name: 'Nghệ thuật', icon: '🎨' },
  NGOAI_NGU: { name: 'Ngoại ngữ', icon: '🌍' },
  // Người tìm việc
  lao_dong: { name: 'Lao động phổ thông', icon: '👷' },
  ban_hang: { name: 'Bán hàng', icon: '🛒' },
  van_phong: { name: 'Văn phòng', icon: '📋' },
  ky_thuat: { name: 'Kỹ thuật', icon: '🔧' },
  it: { name: 'Công nghệ thông tin', icon: '💻' },
  quan_ly: { name: 'Quản lý', icon: '👔' },
  tu_do: { name: 'Làm việc tự do', icon: '🎯' },
};

export default function CareersPage() {
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [recommendedCategories, setRecommendedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCareer, setSelectedCareer] = useState<CareerItem | null>(null);

  // Load data từ localStorage
  useEffect(() => {
    const loadData = () => {
      // Đọc kết quả quiz
      const quizResults = localStorage.getItem('quizResults');
      let type: UserType = 'hoc_sinh'; // Mặc định
      let topCategories: string[] = [];

      if (quizResults) {
        const parsed: QuizResult = JSON.parse(quizResults);
        type = parsed.userType;
        setUserType(type);

        // Lấy top 3 categories từ kết quả
        topCategories = Object.entries(parsed.scores)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([key]) => key);
        setRecommendedCategories(topCategories);
      }

      // Load dữ liệu theo loại user
      if (type === 'hoc_sinh') {
        setCareers(universityMajors);
        const cats = [...new Set(universityMajors.map(c => c.category))];
        setCategories(cats);
      } else if (type === 'that_nghiep') {
        setCareers(jobCareers);
        const cats = [...new Set(jobCareers.map(c => c.category))];
        setCategories(cats);
      } else {
        // Sinh viên - hiển thị việc làm
        setCareers(jobCareers);
        const cats = [...new Set(jobCareers.map(c => c.category))];
        setCategories(cats);
      }
    };

    loadData();
  }, []);

  // Filter careers
  const filteredCareers = careers.filter(career => {
    const matchSearch = career.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = !selectedCategory || career.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  // Sắp xếp: ưu tiên ngành phù hợp lên đầu
  const sortedCareers = [...filteredCareers].sort((a, b) => {
    const aRecommended = recommendedCategories.includes(a.category);
    const bRecommended = recommendedCategories.includes(b.category);
    if (aRecommended && !bRecommended) return -1;
    if (!aRecommended && bRecommended) return 1;
    return 0;
  });

  const pageTitle = userType === 'hoc_sinh' ? 'Khám phá ngành học' : 'Khám phá nghề nghiệp';
  const pageSubtitle = userType === 'hoc_sinh'
    ? 'Tìm hiểu các ngành học đại học phù hợp với bạn'
    : 'Tìm hiểu các công việc phù hợp với bạn';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{pageTitle}</h1>
          <p className="text-gray-500">{pageSubtitle}</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={userType === 'hoc_sinh' ? 'Tìm kiếm ngành học...' : 'Tìm kiếm việc làm...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
          />
        </div>
      </div>

      {/* Recommended banner */}
      {recommendedCategories.length > 0 && !selectedCategory && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-4 text-white"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            <div>
              <p className="font-semibold">Gợi ý cho bạn</p>
              <p className="text-sm text-white/80">
                Dựa trên kết quả trắc nghiệm, bạn phù hợp với: {' '}
                {recommendedCategories.map(cat => categoryLabels[cat]?.name || cat).join(', ')}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Filter by category */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <motion.button
          onClick={() => setSelectedCategory('')}
          className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
            selectedCategory === ''
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          Tất cả
        </motion.button>
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors flex items-center gap-2 ${
              selectedCategory === cat
                ? 'bg-indigo-500 text-white'
                : recommendedCategories.includes(cat)
                ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <span>{categoryLabels[cat]?.icon || '📁'}</span>
            {categoryLabels[cat]?.name || cat}
            {recommendedCategories.includes(cat) && (
              <Star className="w-3 h-3" />
            )}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Career list */}
        <div className="lg:col-span-2 space-y-4">
          {sortedCareers.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Không tìm thấy kết quả nào</p>
              <Link href="/dashboard/test">
                <motion.button
                  className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-xl font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  Làm bài trắc nghiệm
                </motion.button>
              </Link>
            </div>
          ) : (
            sortedCareers.map((career, index) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => setSelectedCareer(career)}
                className={`bg-white rounded-2xl p-5 border-2 cursor-pointer transition-all hover:shadow-md relative ${
                  selectedCareer?.id === career.id
                    ? 'border-indigo-500 shadow-md'
                    : recommendedCategories.includes(career.category)
                    ? 'border-purple-200'
                    : 'border-gray-100'
                }`}
              >
                {recommendedCategories.includes(career.category) && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center text-2xl flex-shrink-0">
                    {career.icon || '💼'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 truncate">{career.name}</h3>
                      {recommendedCategories.includes(career.category) && (
                        <span className="text-xs px-2 py-0.5 rounded-full text-purple-600 bg-purple-50">
                          Phù hợp
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{career.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      {career.salary && (
                        <div className="flex items-center gap-1 text-green-600">
                          <DollarSign className="w-4 h-4" />
                          <span>{career.salary} triệu</span>
                        </div>
                      )}
                      {career.demand && (
                        <div className="flex items-center gap-1 text-blue-600">
                          <TrendingUp className="w-4 h-4" />
                          <span>Nhu cầu: {career.demand}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Career detail panel */}
        <div className="hidden lg:block">
          {selectedCareer ? (
            <motion.div
              key={selectedCareer.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24"
            >
              <div className="text-center mb-6">
                {recommendedCategories.includes(selectedCareer.category) && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm mb-3">
                    <Star className="w-4 h-4" />
                    Phù hợp với bạn
                  </div>
                )}
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center text-4xl mb-4">
                  {selectedCareer.icon || '💼'}
                </div>
                <h2 className="text-xl font-bold text-gray-800">{selectedCareer.name}</h2>
                <p className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
                  {categoryLabels[selectedCareer.category]?.icon} {categoryLabels[selectedCareer.category]?.name}
                </p>
              </div>

              <div className="space-y-4">
                {selectedCareer.salary && (
                  <div className="p-4 bg-green-50 rounded-xl">
                    <p className="text-sm text-green-600 font-medium mb-1">Mức lương trung bình</p>
                    <p className="text-xl font-bold text-green-700">
                      {selectedCareer.salary} triệu/tháng
                    </p>
                  </div>
                )}

                {selectedCareer.demand && (
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-600 font-medium mb-1">Nhu cầu thị trường</p>
                    <p className="text-lg font-semibold text-blue-700">
                      {selectedCareer.demand}
                    </p>
                  </div>
                )}

                {selectedCareer.description && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Mô tả</p>
                    <p className="text-gray-600 text-sm">{selectedCareer.description}</p>
                  </div>
                )}

                {selectedCareer.skills && selectedCareer.skills.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Kỹ năng cần thiết</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCareer.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Link href="/dashboard/chat">
                  <motion.button
                    className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sparkles className="w-5 h-5" />
                    Hỏi AI về ngành này
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
              {userType === 'hoc_sinh' ? (
                <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              ) : (
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              )}
              <p className="text-gray-500">
                {userType === 'hoc_sinh' ? 'Chọn một ngành để xem chi tiết' : 'Chọn một việc làm để xem chi tiết'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

