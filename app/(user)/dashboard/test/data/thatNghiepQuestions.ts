// Câu hỏi cho Người thất nghiệp/tìm việc
import { Question } from './questions';

export const thatNghiepQuestions: Question[] = [
  {
    id: 1,
    text: 'Trình độ học vấn cao nhất của bạn?',
    answers: [
      { id: 'a', text: 'THPT', scores: { lao_dong: 3, ban_hang: 1 } },
      { id: 'b', text: 'Trung cấp/Cao đẳng', scores: { ky_thuat: 2, van_phong: 1 } },
      { id: 'c', text: 'Đại học', scores: { van_phong: 2, chuyen_gia: 1 } },
      { id: 'd', text: 'Sau đại học', scores: { chuyen_gia: 3 } },
      { id: 'e', text: 'Chưa tốt nghiệp THPT', scores: { lao_dong: 3 } },
    ],
  },
  {
    id: 2,
    text: 'Bạn có bao nhiêu năm kinh nghiệm làm việc?',
    answers: [
      { id: 'a', text: 'Chưa có kinh nghiệm', scores: { thuc_tap: 3, lao_dong: 1 } },
      { id: 'b', text: '1-2 năm', scores: { nhan_vien: 3 } },
      { id: 'c', text: '3-5 năm', scores: { nhan_vien: 2, chuyen_gia: 1 } },
      { id: 'd', text: '5-10 năm', scores: { chuyen_gia: 2, quan_ly: 1 } },
      { id: 'e', text: 'Trên 10 năm', scores: { quan_ly: 3 } },
    ],
  },
  {
    id: 3,
    text: 'Lĩnh vực bạn có kinh nghiệm nhất?',
    answers: [
      { id: 'a', text: 'Bán hàng, dịch vụ khách hàng', scores: { ban_hang: 3 } },
      { id: 'b', text: 'Văn phòng, hành chính', scores: { van_phong: 3 } },
      { id: 'c', text: 'Kỹ thuật, sản xuất', scores: { ky_thuat: 3 } },
      { id: 'd', text: 'Công nghệ thông tin', scores: { it: 3 } },
      { id: 'e', text: 'Chưa có kinh nghiệm cụ thể', scores: { lao_dong: 2, thuc_tap: 1 } },
    ],
  },
  {
    id: 4,
    text: 'Bạn có thể làm việc theo ca, cuối tuần không?',
    answers: [
      { id: 'a', text: 'Có, không vấn đề gì', scores: { ban_hang: 2, lao_dong: 2 } },
      { id: 'b', text: 'Được nhưng hạn chế', scores: { nhan_vien: 2 } },
      { id: 'c', text: 'Chỉ làm giờ hành chính', scores: { van_phong: 3 } },
      { id: 'd', text: 'Linh hoạt theo yêu cầu', scores: { ky_thuat: 2, it: 1 } },
      { id: 'e', text: 'Muốn tự chủ thời gian', scores: { tu_do: 3 } },
    ],
  },
  {
    id: 5,
    text: 'Mức lương mong muốn của bạn?',
    answers: [
      { id: 'a', text: 'Dưới 5 triệu', scores: { lao_dong: 3, thuc_tap: 2 } },
      { id: 'b', text: '5-10 triệu', scores: { nhan_vien: 2, ban_hang: 1 } },
      { id: 'c', text: '10-15 triệu', scores: { van_phong: 2, ky_thuat: 1 } },
      { id: 'd', text: '15-25 triệu', scores: { chuyen_gia: 2, it: 1 } },
      { id: 'e', text: 'Trên 25 triệu', scores: { quan_ly: 3 } },
    ],
  },
  {
    id: 6,
    text: 'Bạn có bằng cấp/chứng chỉ nghề nào không?',
    answers: [
      { id: 'a', text: 'Bằng lái xe (B2, C)', scores: { lai_xe: 3, lao_dong: 1 } },
      { id: 'b', text: 'Chứng chỉ nghề (điện, hàn, may...)', scores: { ky_thuat: 3 } },
      { id: 'c', text: 'Chứng chỉ tin học, ngoại ngữ', scores: { van_phong: 2, it: 1 } },
      { id: 'd', text: 'Nhiều chứng chỉ chuyên môn', scores: { chuyen_gia: 3 } },
      { id: 'e', text: 'Chưa có chứng chỉ nào', scores: { lao_dong: 2, thuc_tap: 1 } },
    ],
  },
  {
    id: 7,
    text: 'Bạn có thể di chuyển xa để làm việc không?',
    answers: [
      { id: 'a', text: 'Có thể đi làm xa nhà', scores: { lao_dong: 2, ky_thuat: 1 } },
      { id: 'b', text: 'Trong bán kính 10km', scores: { nhan_vien: 2, van_phong: 1 } },
      { id: 'c', text: 'Muốn làm gần nhà', scores: { ban_hang: 2 } },
      { id: 'd', text: 'Có thể làm từ xa (remote)', scores: { it: 3, tu_do: 1 } },
      { id: 'e', text: 'Sẵn sàng chuyển chỗ ở', scores: { quan_ly: 2, ky_thuat: 1 } },
    ],
  },
  {
    id: 8,
    text: 'Điểm mạnh lớn nhất của bạn?',
    answers: [
      { id: 'a', text: 'Siêng năng, chịu khó', scores: { lao_dong: 3 } },
      { id: 'b', text: 'Giao tiếp tốt', scores: { ban_hang: 3 } },
      { id: 'c', text: 'Tỉ mỉ, cẩn thận', scores: { van_phong: 2, ky_thuat: 1 } },
      { id: 'd', text: 'Sáng tạo, giải quyết vấn đề', scores: { it: 2, chuyen_gia: 1 } },
      { id: 'e', text: 'Lãnh đạo, quản lý', scores: { quan_ly: 3 } },
    ],
  },
  {
    id: 9,
    text: 'Bạn muốn làm việc trong môi trường nào?',
    answers: [
      { id: 'a', text: 'Văn phòng máy lạnh', scores: { van_phong: 3, it: 1 } },
      { id: 'b', text: 'Cửa hàng, siêu thị', scores: { ban_hang: 3 } },
      { id: 'c', text: 'Nhà máy, xưởng sản xuất', scores: { ky_thuat: 3 } },
      { id: 'd', text: 'Ngoài trời, công trường', scores: { lao_dong: 3 } },
      { id: 'e', text: 'Làm việc tại nhà', scores: { tu_do: 3, it: 1 } },
    ],
  },
  {
    id: 10,
    text: 'Lý do bạn đang tìm việc mới?',
    answers: [
      { id: 'a', text: 'Mới ra trường', scores: { thuc_tap: 3, nhan_vien: 1 } },
      { id: 'b', text: 'Bị sa thải/công ty đóng cửa', scores: { nhan_vien: 2, lao_dong: 1 } },
      { id: 'c', text: 'Muốn thay đổi nghề nghiệp', scores: { chuyen_gia: 2 } },
      { id: 'd', text: 'Muốn mức lương cao hơn', scores: { quan_ly: 2, it: 1 } },
      { id: 'e', text: 'Muốn cân bằng cuộc sống', scores: { van_phong: 2, tu_do: 1 } },
    ],
  },
  {
    id: 11,
    text: 'Bạn có sẵn sàng học thêm kỹ năng mới không?',
    answers: [
      { id: 'a', text: 'Rất sẵn sàng, đang tự học', scores: { it: 2, chuyen_gia: 1 } },
      { id: 'b', text: 'Sẵn sàng nếu công ty đào tạo', scores: { nhan_vien: 2, ky_thuat: 1 } },
      { id: 'c', text: 'Có thể học những gì cần thiết', scores: { van_phong: 2 } },
      { id: 'd', text: 'Muốn dùng kỹ năng hiện có', scores: { quan_ly: 2 } },
      { id: 'e', text: 'Khó tiếp thu kiến thức mới', scores: { lao_dong: 3 } },
    ],
  },
  {
    id: 12,
    text: 'Trình độ tiếng Anh của bạn?',
    answers: [
      { id: 'a', text: 'Rất tốt (IELTS 6.0+)', scores: { chuyen_gia: 2, it: 2 } },
      { id: 'b', text: 'Khá (đọc hiểu, giao tiếp cơ bản)', scores: { van_phong: 2, nhan_vien: 1 } },
      { id: 'c', text: 'Cơ bản', scores: { ban_hang: 1, nhan_vien: 1 } },
      { id: 'd', text: 'Yếu', scores: { lao_dong: 2, ky_thuat: 1 } },
      { id: 'e', text: 'Không biết tiếng Anh', scores: { lao_dong: 3 } },
    ],
  },
  {
    id: 13,
    text: 'Bạn có thể làm việc dưới áp lực cao không?',
    answers: [
      { id: 'a', text: 'Có, làm tốt dưới áp lực', scores: { quan_ly: 2, it: 1 } },
      { id: 'b', text: 'Được nếu có deadline rõ ràng', scores: { nhan_vien: 2, van_phong: 1 } },
      { id: 'c', text: 'Thích công việc ổn định', scores: { van_phong: 3 } },
      { id: 'd', text: 'Không thích áp lực', scores: { lao_dong: 2 } },
      { id: 'e', text: 'Muốn tự kiểm soát nhịp độ', scores: { tu_do: 3 } },
    ],
  },
  {
    id: 14,
    text: 'Bạn có phương tiện đi lại cá nhân không?',
    answers: [
      { id: 'a', text: 'Có xe máy', scores: { ban_hang: 2, lao_dong: 1 } },
      { id: 'b', text: 'Có ô tô', scores: { quan_ly: 2, lai_xe: 1 } },
      { id: 'c', text: 'Đi xe công cộng', scores: { van_phong: 2 } },
      { id: 'd', text: 'Cần công ty hỗ trợ', scores: { ky_thuat: 1, lao_dong: 1 } },
      { id: 'e', text: 'Làm việc từ xa nên không cần', scores: { it: 3, tu_do: 1 } },
    ],
  },
  {
    id: 15,
    text: 'Điều gì quan trọng nhất với bạn trong công việc?',
    answers: [
      { id: 'a', text: 'Thu nhập ổn định', scores: { lao_dong: 2, nhan_vien: 1 } },
      { id: 'b', text: 'Cơ hội thăng tiến', scores: { quan_ly: 2, chuyen_gia: 1 } },
      { id: 'c', text: 'Môi trường làm việc tốt', scores: { van_phong: 2, it: 1 } },
      { id: 'd', text: 'Cân bằng công việc - cuộc sống', scores: { tu_do: 2, van_phong: 1 } },
      { id: 'e', text: 'Được làm đúng đam mê', scores: { chuyen_gia: 3 } },
    ],
  },
];

// Kết quả gợi ý cho người thất nghiệp
export const jobSuggestions: Record<string, { name: string; description: string; salary: string }[]> = {
  lao_dong: [
    { name: 'Công nhân sản xuất', description: 'Làm việc tại nhà máy, xưởng sản xuất', salary: '5-8 triệu' },
    { name: 'Nhân viên kho', description: 'Quản lý, sắp xếp hàng hóa trong kho', salary: '6-9 triệu' },
    { name: 'Tài xế giao hàng', description: 'Giao hàng cho khách, shipper', salary: '7-15 triệu' },
  ],
  ban_hang: [
    { name: 'Nhân viên bán hàng', description: 'Tư vấn, bán hàng tại cửa hàng', salary: '6-12 triệu' },
    { name: 'Nhân viên telesales', description: 'Bán hàng qua điện thoại', salary: '7-15 triệu' },
    { name: 'Nhân viên CSKH', description: 'Chăm sóc khách hàng, giải đáp thắc mắc', salary: '7-12 triệu' },
  ],
  van_phong: [
    { name: 'Nhân viên hành chính', description: 'Xử lý công việc văn phòng', salary: '7-12 triệu' },
    { name: 'Nhân viên kế toán', description: 'Theo dõi sổ sách, chứng từ', salary: '8-15 triệu' },
    { name: 'Thư ký văn phòng', description: 'Hỗ trợ ban giám đốc', salary: '8-15 triệu' },
  ],
  ky_thuat: [
    { name: 'Kỹ thuật viên bảo trì', description: 'Sửa chữa, bảo trì máy móc', salary: '8-15 triệu' },
    { name: 'Thợ điện công nghiệp', description: 'Lắp đặt, sửa chữa hệ thống điện', salary: '10-18 triệu' },
    { name: 'Thợ hàn/Thợ tiện', description: 'Gia công kim loại', salary: '10-20 triệu' },
  ],
  it: [
    { name: 'Nhân viên IT Support', description: 'Hỗ trợ kỹ thuật máy tính', salary: '8-15 triệu' },
    { name: 'Lập trình viên Junior', description: 'Phát triển phần mềm', salary: '10-20 triệu' },
    { name: 'Tester/QC', description: 'Kiểm thử phần mềm', salary: '10-18 triệu' },
  ],
  quan_ly: [
    { name: 'Quản lý cửa hàng', description: 'Điều hành hoạt động cửa hàng', salary: '12-20 triệu' },
    { name: 'Supervisor sản xuất', description: 'Quản lý dây chuyền sản xuất', salary: '15-25 triệu' },
    { name: 'Trưởng phòng', description: 'Quản lý nhân sự phòng ban', salary: '20-40 triệu' },
  ],
  tu_do: [
    { name: 'Freelancer', description: 'Làm việc tự do theo dự án', salary: 'Linh hoạt' },
    { name: 'Kinh doanh online', description: 'Bán hàng qua mạng', salary: 'Không giới hạn' },
    { name: 'Shipper công nghệ', description: 'Grab, Be, Gojek...', salary: '10-20 triệu' },
  ],
};

