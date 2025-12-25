// Câu hỏi cho Học sinh THPT - Định hướng ngành học đại học
import { Question, UniversityField } from './questions';

export const hocSinhQuestions: Question[] = [
  {
    id: 1,
    text: 'Bạn yêu thích môn học nào nhất trong chương trình THPT?',
    answers: [
      { id: 'a', text: 'Toán, Lý, Hóa', scores: { KHTN: 2, KTCN: 1 } },
      { id: 'b', text: 'Sinh học', scores: { KHTN: 2, YTSK: 1 } },
      { id: 'c', text: 'Văn, Sử, Địa', scores: { KHXH: 3 } },
      { id: 'd', text: 'Ngoại ngữ', scores: { NGOAI_NGU: 3 } },
      { id: 'e', text: 'GDCD, Tin học', scores: { KTQT: 1, KTCN: 2 } },
    ],
  },
  {
    id: 2,
    text: 'Bạn thấy mình học tốt nhất ở lĩnh vực nào?',
    answers: [
      { id: 'a', text: 'Khoa học tự nhiên (Toán, Lý, Hóa, Sinh)', scores: { KHTN: 3, KTCN: 1 } },
      { id: 'b', text: 'Khoa học xã hội (Văn, Sử, Địa)', scores: { KHXH: 3 } },
      { id: 'c', text: 'Ngoại ngữ', scores: { NGOAI_NGU: 3 } },
      { id: 'd', text: 'Nghệ thuật (Vẽ, Âm nhạc)', scores: { NGHE_THUAT: 3 } },
      { id: 'e', text: 'Thể dục, hoạt động ngoại khóa', scores: { YTSK: 1, KTQT: 1 } },
    ],
  },
  {
    id: 3,
    text: 'Hoạt động nào khiến bạn cảm thấy hào hứng nhất?',
    answers: [
      { id: 'a', text: 'Nghiên cứu, thí nghiệm, khám phá', scores: { KHTN: 3, YTSK: 1 } },
      { id: 'b', text: 'Viết lách, đọc sách, thảo luận', scores: { KHXH: 3, NGOAI_NGU: 1 } },
      { id: 'c', text: 'Sáng tạo, thiết kế, vẽ', scores: { NGHE_THUAT: 3 } },
      { id: 'd', text: 'Lập trình, sửa chữa đồ điện tử', scores: { KTCN: 3 } },
      { id: 'e', text: 'Kinh doanh, tổ chức sự kiện', scores: { KTQT: 3 } },
    ],
  },
  {
    id: 4,
    text: 'Bạn thích làm việc độc lập hay theo nhóm?',
    answers: [
      { id: 'a', text: 'Hoàn toàn độc lập', scores: { KHTN: 2, NGHE_THUAT: 1 } },
      { id: 'b', text: 'Chủ yếu độc lập, thỉnh thoảng nhóm', scores: { KTCN: 2, KHTN: 1 } },
      { id: 'c', text: 'Cân bằng cả hai', scores: { KHXH: 2, NGOAI_NGU: 1 } },
      { id: 'd', text: 'Chủ yếu nhóm', scores: { KTQT: 2, YTSK: 1 } },
      { id: 'e', text: 'Luôn muốn làm việc nhóm', scores: { KTQT: 3 } },
    ],
  },
  {
    id: 5,
    text: 'Bạn có khả năng sáng tạo (vẽ, viết, phát minh) không?',
    answers: [
      { id: 'a', text: 'Rất giỏi, đam mê sáng tạo', scores: { NGHE_THUAT: 3 } },
      { id: 'b', text: 'Khá tốt, thỉnh thoảng sáng tạo', scores: { NGHE_THUAT: 2, KTCN: 1 } },
      { id: 'c', text: 'Bình thường', scores: { KHXH: 1, KTQT: 1 } },
      { id: 'd', text: 'Không giỏi sáng tạo nhưng logic tốt', scores: { KHTN: 2, KTCN: 1 } },
      { id: 'e', text: 'Thích phân tích hơn sáng tạo', scores: { KHTN: 3 } },
    ],
  },
  {
    id: 6,
    text: 'Bạn có thích phân tích dữ liệu, con số, biểu đồ không?',
    answers: [
      { id: 'a', text: 'Rất thích, đây là thế mạnh của tôi', scores: { KHTN: 3, KTCN: 1 } },
      { id: 'b', text: 'Khá thích', scores: { KTQT: 2, KHTN: 1 } },
      { id: 'c', text: 'Bình thường', scores: { KHXH: 1 } },
      { id: 'd', text: 'Không thích lắm', scores: { NGHE_THUAT: 2, NGOAI_NGU: 1 } },
      { id: 'e', text: 'Hoàn toàn không thích', scores: { NGHE_THUAT: 3 } },
    ],
  },
  {
    id: 7,
    text: 'Bạn có khả năng giao tiếp trước đám đông không?',
    answers: [
      { id: 'a', text: 'Rất tự tin, thích thuyết trình', scores: { KTQT: 3, KHXH: 1 } },
      { id: 'b', text: 'Khá tự tin', scores: { NGOAI_NGU: 2, KTQT: 1 } },
      { id: 'c', text: 'Bình thường, cần chuẩn bị kỹ', scores: { KHXH: 2 } },
      { id: 'd', text: 'Hơi ngại nhưng có thể làm được', scores: { KTCN: 1, KHTN: 1 } },
      { id: 'e', text: 'Rất ngại, thích làm việc một mình', scores: { KHTN: 2, KTCN: 1 } },
    ],
  },
  {
    id: 8,
    text: 'Bạn thích công việc ổn định hay nhiều thử thách?',
    answers: [
      { id: 'a', text: 'Ổn định, an toàn', scores: { YTSK: 2, KHTN: 1 } },
      { id: 'b', text: 'Khá ổn định với ít thử thách', scores: { KHXH: 2, NGOAI_NGU: 1 } },
      { id: 'c', text: 'Cân bằng cả hai', scores: { KTCN: 2 } },
      { id: 'd', text: 'Thích thử thách nhiều hơn', scores: { KTQT: 2, NGHE_THUAT: 1 } },
      { id: 'e', text: 'Luôn muốn thử thách mới', scores: { KTQT: 3 } },
    ],
  },
  {
    id: 9,
    text: 'Bạn muốn làm việc với máy móc/máy tính hay với con người?',
    answers: [
      { id: 'a', text: 'Chủ yếu với máy móc/máy tính', scores: { KTCN: 3 } },
      { id: 'b', text: 'Cả hai như nhau', scores: { KHTN: 2, YTSK: 1 } },
      { id: 'c', text: 'Chủ yếu với con người', scores: { YTSK: 2, KHXH: 1 } },
      { id: 'd', text: 'Luôn muốn làm việc với con người', scores: { KTQT: 2, NGOAI_NGU: 1 } },
      { id: 'e', text: 'Kết hợp linh hoạt', scores: { KTQT: 1, KTCN: 1 } },
    ],
  },
  {
    id: 10,
    text: 'Bạn có dễ bị căng thẳng khi thi cử hoặc deadline không?',
    answers: [
      { id: 'a', text: 'Rất dễ căng thẳng', scores: { NGHE_THUAT: 2, KHXH: 1 } },
      { id: 'b', text: 'Khá căng thẳng', scores: { KHXH: 2 } },
      { id: 'c', text: 'Bình thường, quản lý được', scores: { KTCN: 1, KHTN: 1 } },
      { id: 'd', text: 'Ít khi căng thẳng', scores: { YTSK: 2, KTQT: 1 } },
      { id: 'e', text: 'Làm việc tốt dưới áp lực', scores: { YTSK: 3 } },
    ],
  },
  {
    id: 11,
    text: 'Bạn học bằng cách nào hiệu quả nhất?',
    answers: [
      { id: 'a', text: 'Nhìn (đọc, xem video)', scores: { KHTN: 2, KTCN: 1 } },
      { id: 'b', text: 'Nghe (giảng bài, thảo luận)', scores: { KHXH: 2, NGOAI_NGU: 1 } },
      { id: 'c', text: 'Thực hành, tự tay làm', scores: { KTCN: 3 } },
      { id: 'd', text: 'Kết hợp nhiều cách', scores: { YTSK: 2 } },
      { id: 'e', text: 'Sáng tạo, tự khám phá', scores: { NGHE_THUAT: 2, KHTN: 1 } },
    ],
  },
  {
    id: 12,
    text: 'Bạn có tính kiên nhẫn khi làm việc tỉ mỉ không?',
    answers: [
      { id: 'a', text: 'Rất kiên nhẫn, tỉ mỉ', scores: { YTSK: 3, KHTN: 1 } },
      { id: 'b', text: 'Khá kiên nhẫn', scores: { KTCN: 2, KHTN: 1 } },
      { id: 'c', text: 'Bình thường', scores: { KHXH: 1, KTQT: 1 } },
      { id: 'd', text: 'Thích làm nhanh hơn tỉ mỉ', scores: { KTQT: 2 } },
      { id: 'e', text: 'Thích công việc đa dạng, không lặp lại', scores: { NGHE_THUAT: 2, KTQT: 1 } },
    ],
  },
  {
    id: 13,
    text: 'Bạn mong muốn mức thu nhập thế nào sau khi ra trường?',
    answers: [
      { id: 'a', text: 'Ổn định, đủ sống', scores: { KHXH: 2, YTSK: 1 } },
      { id: 'b', text: 'Mức khá, có thể tích lũy', scores: { KTCN: 2, NGOAI_NGU: 1 } },
      { id: 'c', text: 'Cao, muốn phát triển nhanh', scores: { KTQT: 3 } },
      { id: 'd', text: 'Thu nhập không quan trọng bằng đam mê', scores: { NGHE_THUAT: 3 } },
      { id: 'e', text: 'Rất cao, sẵn sàng làm việc nhiều', scores: { KTQT: 2, KTCN: 1 } },
    ],
  },
  {
    id: 14,
    text: 'Bạn có thích trải nghiệm thực tế, thực hành nhiều không?',
    answers: [
      { id: 'a', text: 'Rất thích thực hành', scores: { KTCN: 3, YTSK: 1 } },
      { id: 'b', text: 'Thích cân bằng lý thuyết và thực hành', scores: { KHTN: 2, YTSK: 1 } },
      { id: 'c', text: 'Thích lý thuyết hơn', scores: { KHXH: 2, KHTN: 1 } },
      { id: 'd', text: 'Thích sáng tạo tự do', scores: { NGHE_THUAT: 3 } },
      { id: 'e', text: 'Thích giao tiếp, làm việc với người', scores: { KTQT: 2, NGOAI_NGU: 1 } },
    ],
  },
  {
    id: 15,
    text: 'Nếu có thể du học, bạn muốn học ngành gì?',
    answers: [
      { id: 'a', text: 'Khoa học, kỹ thuật, công nghệ', scores: { KTCN: 2, KHTN: 2 } },
      { id: 'b', text: 'Y khoa, dược phẩm', scores: { YTSK: 3 } },
      { id: 'c', text: 'Kinh doanh, quản trị', scores: { KTQT: 3 } },
      { id: 'd', text: 'Nghệ thuật, thiết kế', scores: { NGHE_THUAT: 3 } },
      { id: 'e', text: 'Ngôn ngữ, văn hóa', scores: { NGOAI_NGU: 3 } },
    ],
  },
  {
    id: 16,
    text: 'Bạn có quan tâm đến sức khỏe con người không?',
    answers: [
      { id: 'a', text: 'Rất quan tâm, muốn giúp đỡ người bệnh', scores: { YTSK: 3 } },
      { id: 'b', text: 'Quan tâm nhưng không muốn làm y tế', scores: { KHXH: 2 } },
      { id: 'c', text: 'Bình thường', scores: { KTCN: 1, KTQT: 1 } },
      { id: 'd', text: 'Không quan tâm nhiều', scores: { NGHE_THUAT: 1, KTQT: 1 } },
      { id: 'e', text: 'Quan tâm môi trường hơn sức khỏe', scores: { KHTN: 2 } },
    ],
  },
  {
    id: 17,
    text: 'Bạn muốn làm việc trong nước hay nước ngoài?',
    answers: [
      { id: 'a', text: 'Trong nước', scores: { YTSK: 1, KHXH: 1 } },
      { id: 'b', text: 'Có thể đi nước ngoài một thời gian', scores: { NGOAI_NGU: 2, KTQT: 1 } },
      { id: 'c', text: 'Muốn làm việc ở nước ngoài', scores: { NGOAI_NGU: 3 } },
      { id: 'd', text: 'Làm freelance, không quan trọng địa điểm', scores: { NGHE_THUAT: 2, KTCN: 1 } },
      { id: 'e', text: 'Chưa nghĩ đến', scores: { KHTN: 1 } },
    ],
  },
  {
    id: 18,
    text: 'Gia đình bạn mong muốn bạn theo ngành nào?',
    answers: [
      { id: 'a', text: 'Bác sĩ, Dược sĩ', scores: { YTSK: 2 } },
      { id: 'b', text: 'Kỹ sư, IT', scores: { KTCN: 2 } },
      { id: 'c', text: 'Kinh doanh, quản lý', scores: { KTQT: 2 } },
      { id: 'd', text: 'Giáo viên, công chức', scores: { KHXH: 2 } },
      { id: 'e', text: 'Để tôi tự quyết định', scores: { NGHE_THUAT: 1, NGOAI_NGU: 1 } },
    ],
  },
  {
    id: 19,
    text: 'Bạn thấy công nghệ (AI, lập trình) hấp dẫn không?',
    answers: [
      { id: 'a', text: 'Rất hấp dẫn, muốn theo đuổi', scores: { KTCN: 3 } },
      { id: 'b', text: 'Khá thú vị', scores: { KTCN: 2, KHTN: 1 } },
      { id: 'c', text: 'Bình thường', scores: { KTQT: 1, KHXH: 1 } },
      { id: 'd', text: 'Không quan tâm nhiều', scores: { NGHE_THUAT: 2 } },
      { id: 'e', text: 'Thích công nghệ nhưng không muốn làm IT', scores: { KTQT: 2 } },
    ],
  },
  {
    id: 20,
    text: 'Mục tiêu nghề nghiệp quan trọng nhất với bạn là gì?',
    answers: [
      { id: 'a', text: 'Ổn định, công việc lâu dài', scores: { YTSK: 2, KHXH: 1 } },
      { id: 'b', text: 'Thu nhập cao, phát triển nhanh', scores: { KTQT: 3 } },
      { id: 'c', text: 'Được làm công việc đam mê', scores: { NGHE_THUAT: 3 } },
      { id: 'd', text: 'Đóng góp cho xã hội', scores: { YTSK: 2, KHXH: 1 } },
      { id: 'e', text: 'Được học hỏi, phát triển bản thân', scores: { KHTN: 2, KTCN: 1 } },
    ],
  },
];

