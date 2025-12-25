# Hướng dẫn sử dụng Chatbox Frontend

## ✅ Đã hoàn thành

### 1. Components đã tạo

#### **Chatbox.tsx** - Component chatbox chính
- Giao diện đẹp với gradient indigo-purple-pink
- Streaming response real-time
- Auto-scroll khi có tin nhắn mới
- Textarea tự động resize
- Loading states và typing indicator
- Tin nhắn chào mừng tự động
- Xóa chat và tạo mới
- Support Shift+Enter để xuống dòng

#### **FloatingChatButton.tsx** - Nút chat nổi cho mobile
- Hiển thị trên mobile (< lg)
- Animation ping effect
- Gradient button đẹp mắt

#### **AIRobotMascot.tsx** (đã cập nhật)
- Thêm props `onChatClick`
- Click vào robot để mở chatbox
- Cursor pointer và hover effect
- Message hướng dẫn user

### 2. Tích hợp

#### Trang chính (page.tsx)
```tsx
- Robot AI: Click để mở chat
- Floating button: Cho mobile
- Chatbox: Modal overlay
```

#### Dashboard (user layout)
```tsx
- Floating button: Luôn hiển thị
- Chatbox: Có thể chat khi làm việc
```

### 3. Features

✅ **Authentication**: Chỉ user đã login mới chat được
✅ **Auto-create chat**: Tự động tạo cuộc trò chuyện khi mở
✅ **Streaming**: Response từng từ một như ChatGPT
✅ **Context-aware**: Biết user type và quiz results
✅ **Responsive**: Hoạt động tốt trên mọi thiết bị
✅ **Beautiful UI**: Gradient, animations, shadows
✅ **User-friendly**: Clear chat, auto-scroll, typing indicator

### 4. API Integration

```typescript
// Tạo chat mới
POST /api/chat/new

// Gửi tin nhắn (streaming)
POST /api/chat/:id/stream
- Server-Sent Events (SSE)
- Real-time response

// Chat API đã thêm vào lib/api.ts
chatApi.createChat()
chatApi.sendMessage()
chatApi.getChats()
chatApi.deleteChat()
```

### 5. Cách sử dụng

#### Từ Landing Page:
1. Click vào Robot AI (desktop)
2. Hoặc click nút chat nổi (mobile)
3. Chatbox mở ra
4. Nhập tin nhắn và Enter

#### Từ Dashboard:
1. Click nút chat nổi ở góc phải
2. Chat ngay khi làm việc
3. Tư vấn nghề nghiệp real-time

### 6. UI/UX Details

**Chatbox (400x600px)**:
- Header: Gradient với avatar bot
- Messages area: Scrollable, gradient bubbles
- Input: Auto-resize textarea
- Send button: Gradient with icon
- Typing indicator: 3 dots animation

**Messages**:
- User: Right side, indigo-purple gradient
- AI: Left side, white with border
- Avatar: User icon / Bot icon
- Timestamp: Auto-generated

**Animations**:
- Fade in/out
- Scale effect
- Typing dots
- Loading spinner
- Message slide up

### 7. Responsive Design

**Desktop (lg+)**:
- Robot mascot clickable
- Chatbox: Fixed bottom-right
- Full features

**Mobile (< lg)**:
- Floating chat button
- Chatbox: Full width responsive
- Touch-friendly

### 8. Security

✅ User authentication required
✅ Token in Authorization header
✅ User ownership checking
✅ Input validation
✅ XSS protection (no dangerouslySetInnerHTML)

### 9. Performance

✅ Lazy loading (Dynamic imports)
✅ Optimistic UI updates
✅ Debounced textarea resize
✅ Efficient re-renders
✅ Memory cleanup

### 10. Testing

Để test chatbox:

1. **Khởi động backend**:
```bash
cd backend
npm run dev
```

2. **Khởi động frontend**:
```bash
cd aisubject
npm run dev
```

3. **Đăng nhập**:
- Tạo tài khoản hoặc login
- Click vào robot AI
- Hoặc click nút chat

4. **Test features**:
- Gửi tin nhắn đơn giản
- Test streaming response
- Xóa chat và tạo mới
- Test trên mobile

### 11. Troubleshooting

**Lỗi "Not authenticated"**:
- Đảm bảo đã login
- Check token trong localStorage

**Chatbox không mở**:
- Check console errors
- Verify imports
- Check z-index conflicts

**Streaming không hoạt động**:
- Check CORS settings
- Verify backend URL
- Check network tab

**Robot không click được**:
- Clear browser cache
- Check z-index
- Verify onClick handler

### 12. Customization

Để tùy chỉnh:

**Colors**: Thay gradient trong className
**Size**: Điều chỉnh w-[400px] h-[600px]
**Position**: Thay bottom-4 right-4
**Animation**: Sửa motion props
**Messages**: Customize welcome message

### 13. Future Enhancements

⏳ Lưu lịch sử chat
⏳ Search trong chat
⏳ Upload file/image
⏳ Voice input
⏳ Export chat history
⏳ Multiple conversations list
⏳ AI suggestions
⏳ Emoji support

## 🎉 Kết luận

Chatbox đã sẵn sàng! Bạn có thể:
- Chat với AI từ landing page
- Chat trong dashboard
- Trải nghiệm streaming real-time
- UI/UX đẹp và mượt mà

Hãy test và enjoy! 🚀
