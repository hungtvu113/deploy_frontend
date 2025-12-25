// ==================== TYPES ====================

// Loại người dùng
export type UserType = 'hoc_sinh' | 'sinh_vien' | 'that_nghiep';

// Ngành học (cho sinh viên)
export type MajorType = 'cntt' | 'dieu_duong' | 'logistics' | 'co_khi' | 'khac';

// Nhóm ngành đại học (cho học sinh)
export type UniversityField =
  | 'KHTN' // Khoa học tự nhiên
  | 'KHXH' // Khoa học xã hội
  | 'KTCN' // Kỹ thuật công nghệ
  | 'YTSK' // Y tế sức khỏe
  | 'KTQT' // Kinh tế quản trị
  | 'NGHE_THUAT' // Nghệ thuật
  | 'NGOAI_NGU'; // Ngoại ngữ

export interface Answer {
  id: string;
  text: string;
  scores?: Partial<Record<UniversityField | string, number>>;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

// Labels
export const userTypeLabels: Record<UserType, { label: string; description: string; icon: string }> = {
  hoc_sinh: {
    label: 'Học sinh THPT',
    description: 'Đang học cấp 3, muốn tìm ngành học đại học phù hợp',
    icon: '🎓'
  },
  sinh_vien: {
    label: 'Sinh viên năm cuối',
    description: 'Đang học đại học, muốn định hướng nghề nghiệp',
    icon: '👨‍🎓'
  },
  that_nghiep: {
    label: 'Người tìm việc',
    description: 'Đang tìm kiếm cơ hội việc làm phù hợp',
    icon: '💼'
  },
};

export const majorLabels: Record<MajorType, { label: string; icon: string }> = {
  cntt: { label: 'Công nghệ thông tin', icon: '💻' },
  dieu_duong: { label: 'Điều dưỡng', icon: '🏥' },
  logistics: { label: 'Logistics', icon: '🚚' },
  co_khi: { label: 'Cơ khí', icon: '⚙️' },
  khac: { label: 'Ngành khác', icon: '📚' },
};

export const universityFieldLabels: Record<UniversityField, { name: string; description: string; icon: string; majors: string[] }> = {
  KHTN: {
    name: 'Khoa học Tự nhiên',
    description: 'Toán, Lý, Hóa, Sinh học',
    icon: '🔬',
    majors: ['Toán học', 'Vật lý', 'Hóa học', 'Sinh học', 'Khoa học môi trường']
  },
  KHXH: {
    name: 'Khoa học Xã hội',
    description: 'Văn, Sử, Địa, Tâm lý',
    icon: '📚',
    majors: ['Văn học', 'Lịch sử', 'Địa lý', 'Tâm lý học', 'Xã hội học', 'Báo chí']
  },
  KTCN: {
    name: 'Kỹ thuật Công nghệ',
    description: 'CNTT, Điện tử, Cơ khí, Xây dựng',
    icon: '⚙️',
    majors: ['Công nghệ thông tin', 'Kỹ thuật điện tử', 'Cơ khí', 'Xây dựng', 'Kiến trúc']
  },
  YTSK: {
    name: 'Y tế Sức khỏe',
    description: 'Y, Dược, Điều dưỡng',
    icon: '🏥',
    majors: ['Bác sĩ đa khoa', 'Dược sĩ', 'Điều dưỡng', 'Răng hàm mặt', 'Y tế công cộng']
  },
  KTQT: {
    name: 'Kinh tế Quản trị',
    description: 'Kinh tế, Kế toán, Marketing',
    icon: '💰',
    majors: ['Quản trị kinh doanh', 'Kế toán', 'Tài chính ngân hàng', 'Marketing', 'Logistics']
  },
  NGHE_THUAT: {
    name: 'Nghệ thuật',
    description: 'Thiết kế, Mỹ thuật, Âm nhạc',
    icon: '🎨',
    majors: ['Thiết kế đồ họa', 'Mỹ thuật', 'Âm nhạc', 'Điện ảnh', 'Kiến trúc nội thất']
  },
  NGOAI_NGU: {
    name: 'Ngoại ngữ',
    description: 'Tiếng Anh, Nhật, Hàn, Trung',
    icon: '🌍',
    majors: ['Ngôn ngữ Anh', 'Ngôn ngữ Nhật', 'Ngôn ngữ Hàn', 'Ngôn ngữ Trung', 'Phiên dịch']
  },
};