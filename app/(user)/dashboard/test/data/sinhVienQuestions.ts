// Câu hỏi cho Sinh viên năm cuối - Định hướng nghề nghiệp theo ngành đang học
import { Question, MajorType } from './questions';

// ==================== CNTT ====================
export const cnttQuestions: Question[] = [
  { id: 1, text: 'Bạn giỏi nhất ở lĩnh vực nào trong CNTT?', answers: [
    { id: 'a', text: 'Lập trình Web/Mobile', scores: { frontend: 3, fullstack: 1 } },
    { id: 'b', text: 'Xử lý dữ liệu, thuật toán', scores: { data: 3, ai: 1 } },
    { id: 'c', text: 'Mạng, hệ thống, server', scores: { devops: 3, security: 1 } },
    { id: 'd', text: 'Thiết kế UI/UX', scores: { design: 3, frontend: 1 } },
    { id: 'e', text: 'Quản lý dự án', scores: { pm: 3 } },
  ]},
  { id: 2, text: 'Bạn thích làm việc theo phong cách nào?', answers: [
    { id: 'a', text: 'Làm việc độc lập, tập trung code', scores: { backend: 2, data: 1 } },
    { id: 'b', text: 'Làm việc nhóm, thảo luận nhiều', scores: { pm: 2, fullstack: 1 } },
    { id: 'c', text: 'Sáng tạo, thiết kế giao diện', scores: { design: 3 } },
    { id: 'd', text: 'Phân tích, nghiên cứu công nghệ mới', scores: { ai: 2, data: 1 } },
    { id: 'e', text: 'Linh hoạt, làm đủ thứ', scores: { fullstack: 3 } },
  ]},
  { id: 3, text: 'Ngôn ngữ/công nghệ bạn thành thạo nhất?', answers: [
    { id: 'a', text: 'JavaScript, React, Vue', scores: { frontend: 3 } },
    { id: 'b', text: 'Python, Java, C++', scores: { backend: 2, data: 1 } },
    { id: 'c', text: 'SQL, NoSQL, Data Warehouse', scores: { data: 3 } },
    { id: 'd', text: 'DevOps, Docker, K8s', scores: { devops: 3 } },
    { id: 'e', text: 'Figma, Adobe XD', scores: { design: 3 } },
  ]},
  { id: 4, text: 'Bạn muốn phát triển theo hướng nào?', answers: [
    { id: 'a', text: 'Chuyên gia kỹ thuật (Tech Lead)', scores: { backend: 2, fullstack: 1 } },
    { id: 'b', text: 'Quản lý sản phẩm (PM/PO)', scores: { pm: 3 } },
    { id: 'c', text: 'Data Scientist, AI Engineer', scores: { ai: 2, data: 2 } },
    { id: 'd', text: 'DevOps, SRE', scores: { devops: 3 } },
    { id: 'e', text: 'Startup, khởi nghiệp', scores: { fullstack: 2, pm: 1 } },
  ]},
  { id: 5, text: 'Điểm yếu lớn nhất của bạn trong IT?', answers: [
    { id: 'a', text: 'Giao tiếp, thuyết trình', scores: { backend: 2, data: 1 } },
    { id: 'b', text: 'Thiết kế, UI/UX', scores: { backend: 2, devops: 1 } },
    { id: 'c', text: 'Logic, thuật toán phức tạp', scores: { design: 2, pm: 1 } },
    { id: 'd', text: 'Làm việc dưới áp lực', scores: { design: 2 } },
    { id: 'e', text: 'Quản lý thời gian', scores: { fullstack: 1, pm: 1 } },
  ]},
];

// ==================== ĐIỀU DƯỠNG ====================
export const dieuDuongQuestions: Question[] = [
  { id: 1, text: 'Bạn muốn làm việc ở môi trường nào?', answers: [
    { id: 'a', text: 'Bệnh viện công', scores: { clinical: 3 } },
    { id: 'b', text: 'Bệnh viện tư, phòng khám', scores: { private: 3 } },
    { id: 'c', text: 'Cơ sở chăm sóc người cao tuổi', scores: { elderly: 3 } },
    { id: 'd', text: 'Trung tâm y tế cộng đồng', scores: { community: 3 } },
    { id: 'e', text: 'Làm việc tự do, tại nhà bệnh nhân', scores: { homecare: 3 } },
  ]},
  { id: 2, text: 'Bạn giỏi nhất ở khía cạnh nào?', answers: [
    { id: 'a', text: 'Chăm sóc trực tiếp bệnh nhân', scores: { clinical: 3 } },
    { id: 'b', text: 'Giao tiếp, tư vấn sức khỏe', scores: { community: 2, private: 1 } },
    { id: 'c', text: 'Quản lý, tổ chức công việc', scores: { management: 3 } },
    { id: 'd', text: 'Kỹ thuật y tế, thiết bị', scores: { clinical: 2, private: 1 } },
    { id: 'e', text: 'Kiên nhẫn với người cao tuổi', scores: { elderly: 3 } },
  ]},
  { id: 3, text: 'Bạn có thể làm việc ca đêm không?', answers: [
    { id: 'a', text: 'Sẵn sàng, không vấn đề', scores: { clinical: 3 } },
    { id: 'b', text: 'Có thể nhưng hạn chế', scores: { private: 2, community: 1 } },
    { id: 'c', text: 'Muốn làm giờ hành chính', scores: { community: 3 } },
    { id: 'd', text: 'Linh hoạt theo nhu cầu', scores: { homecare: 2, private: 1 } },
    { id: 'e', text: 'Muốn tự chủ thời gian', scores: { homecare: 3 } },
  ]},
  { id: 4, text: 'Mục tiêu nghề nghiệp của bạn?', answers: [
    { id: 'a', text: 'Điều dưỡng trưởng', scores: { management: 3 } },
    { id: 'b', text: 'Chuyên gia lâm sàng', scores: { clinical: 3 } },
    { id: 'c', text: 'Mở phòng khám riêng', scores: { private: 3 } },
    { id: 'd', text: 'Giảng dạy, đào tạo', scores: { education: 3 } },
    { id: 'e', text: 'Chăm sóc tại nhà', scores: { homecare: 3 } },
  ]},
  { id: 5, text: 'Điểm mạnh lớn nhất của bạn?', answers: [
    { id: 'a', text: 'Kiên nhẫn, cẩn thận', scores: { elderly: 2, clinical: 1 } },
    { id: 'b', text: 'Giao tiếp tốt', scores: { community: 2, private: 1 } },
    { id: 'c', text: 'Chịu được áp lực cao', scores: { clinical: 3 } },
    { id: 'd', text: 'Kỹ năng quản lý', scores: { management: 3 } },
    { id: 'e', text: 'Tận tâm, chu đáo', scores: { homecare: 2, elderly: 1 } },
  ]},
];

// ==================== LOGISTICS ====================
export const logisticsQuestions: Question[] = [
  { id: 1, text: 'Bạn muốn làm việc ở bộ phận nào?', answers: [
    { id: 'a', text: 'Kho vận, quản lý hàng hóa', scores: { warehouse: 3 } },
    { id: 'b', text: 'Vận tải, điều phối xe', scores: { transport: 3 } },
    { id: 'c', text: 'Xuất nhập khẩu, hải quan', scores: { customs: 3 } },
    { id: 'd', text: 'Mua hàng, sourcing', scores: { procurement: 3 } },
    { id: 'e', text: 'Lập kế hoạch, tối ưu hóa', scores: { planning: 3 } },
  ]},
  { id: 2, text: 'Kỹ năng nào bạn tự tin nhất?', answers: [
    { id: 'a', text: 'Quản lý dữ liệu, Excel', scores: { planning: 2, warehouse: 1 } },
    { id: 'b', text: 'Đàm phán, giao tiếp', scores: { procurement: 2, customs: 1 } },
    { id: 'c', text: 'Tổ chức, sắp xếp công việc', scores: { warehouse: 3 } },
    { id: 'd', text: 'Tiếng Anh, ngoại ngữ', scores: { customs: 2, procurement: 1 } },
    { id: 'e', text: 'Phân tích, giải quyết vấn đề', scores: { planning: 3 } },
  ]},
  { id: 3, text: 'Bạn muốn làm việc ở đâu?', answers: [
    { id: 'a', text: 'Văn phòng công ty', scores: { planning: 2, procurement: 1 } },
    { id: 'b', text: 'Kho, trung tâm phân phối', scores: { warehouse: 3 } },
    { id: 'c', text: 'Cảng biển, sân bay', scores: { customs: 3 } },
    { id: 'd', text: 'Di chuyển nhiều nơi', scores: { transport: 3 } },
    { id: 'e', text: 'Linh hoạt, không quan trọng', scores: { procurement: 2 } },
  ]},
  { id: 4, text: 'Mục tiêu phát triển nghề nghiệp?', answers: [
    { id: 'a', text: 'Quản lý kho, Supply Chain Manager', scores: { warehouse: 2, planning: 1 } },
    { id: 'b', text: 'Chuyên gia xuất nhập khẩu', scores: { customs: 3 } },
    { id: 'c', text: 'Giám đốc mua hàng', scores: { procurement: 3 } },
    { id: 'd', text: 'Quản lý vận tải', scores: { transport: 3 } },
    { id: 'e', text: 'Khởi nghiệp logistics', scores: { planning: 2, transport: 1 } },
  ]},
  { id: 5, text: 'Bạn có thể làm việc ngoài giờ không?', answers: [
    { id: 'a', text: 'Sẵn sàng 24/7', scores: { transport: 3, warehouse: 1 } },
    { id: 'b', text: 'Có thể OT khi cần', scores: { warehouse: 2, customs: 1 } },
    { id: 'c', text: 'Muốn giờ hành chính', scores: { planning: 2, procurement: 1 } },
    { id: 'd', text: 'Linh hoạt theo dự án', scores: { customs: 2 } },
    { id: 'e', text: 'Work-life balance', scores: { planning: 3 } },
  ]},
];

// ==================== CƠ KHÍ ====================
export const coKhiQuestions: Question[] = [
  { id: 1, text: 'Bạn muốn làm việc trong lĩnh vực nào?', answers: [
    { id: 'a', text: 'Chế tạo máy, gia công', scores: { manufacturing: 3 } },
    { id: 'b', text: 'Thiết kế, CAD/CAM', scores: { design: 3 } },
    { id: 'c', text: 'Bảo trì, sửa chữa thiết bị', scores: { maintenance: 3 } },
    { id: 'd', text: 'Tự động hóa, robot', scores: { automation: 3 } },
    { id: 'e', text: 'Quản lý sản xuất', scores: { management: 3 } },
  ]},
  { id: 2, text: 'Kỹ năng nào bạn thành thạo nhất?', answers: [
    { id: 'a', text: 'AutoCAD, SolidWorks', scores: { design: 3 } },
    { id: 'b', text: 'Vận hành máy CNC', scores: { manufacturing: 3 } },
    { id: 'c', text: 'Sửa chữa, lắp ráp', scores: { maintenance: 3 } },
    { id: 'd', text: 'PLC, điều khiển tự động', scores: { automation: 3 } },
    { id: 'e', text: 'Quản lý, lập kế hoạch', scores: { management: 3 } },
  ]},
  { id: 3, text: 'Bạn thích làm việc ở môi trường nào?', answers: [
    { id: 'a', text: 'Văn phòng kỹ thuật', scores: { design: 3 } },
    { id: 'b', text: 'Nhà máy, xưởng sản xuất', scores: { manufacturing: 2, maintenance: 1 } },
    { id: 'c', text: 'Công trường, lắp đặt', scores: { maintenance: 3 } },
    { id: 'd', text: 'Phòng R&D', scores: { automation: 2, design: 1 } },
    { id: 'e', text: 'Kết hợp văn phòng và xưởng', scores: { management: 3 } },
  ]},
  { id: 4, text: 'Mục tiêu nghề nghiệp của bạn?', answers: [
    { id: 'a', text: 'Kỹ sư thiết kế cao cấp', scores: { design: 3 } },
    { id: 'b', text: 'Quản đốc, quản lý xưởng', scores: { management: 3 } },
    { id: 'c', text: 'Chuyên gia tự động hóa', scores: { automation: 3 } },
    { id: 'd', text: 'Kỹ sư bảo trì trưởng', scores: { maintenance: 3 } },
    { id: 'e', text: 'Mở xưởng riêng', scores: { manufacturing: 2, management: 1 } },
  ]},
  { id: 5, text: 'Bạn có thể làm việc trong điều kiện khắc nghiệt?', answers: [
    { id: 'a', text: 'Có, quen rồi', scores: { manufacturing: 2, maintenance: 2 } },
    { id: 'b', text: 'Được nếu cần thiết', scores: { automation: 2 } },
    { id: 'c', text: 'Thích môi trường sạch sẽ', scores: { design: 3 } },
    { id: 'd', text: 'Muốn làm văn phòng', scores: { management: 3 } },
    { id: 'e', text: 'Linh hoạt', scores: { design: 1, management: 1 } },
  ]},
];

// Export tất cả
export const sinhVienQuestionsByMajor: Record<MajorType, Question[]> = {
  cntt: cnttQuestions,
  dieu_duong: dieuDuongQuestions,
  logistics: logisticsQuestions,
  co_khi: coKhiQuestions,
  khac: [], // Sẽ dùng bộ câu hỏi chung
};

