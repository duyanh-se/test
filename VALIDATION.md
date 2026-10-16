# Trạng thái kiểm tra — 16/10/2026

- Đã tạo React Native 0.88 / Expo SDK 58, hỗ trợ tablet.
- TypeScript: đạt.
- ESLint: đạt.
- Export bundle iOS/Hermes: đạt (626 modules). Lần đầu trong sandbox lỗi exit 6; chạy ngoài sandbox đã thành công.
- Tạo project native iOS trên Windows: Expo từ chối; bước này nằm trên runner macOS trong workflow.
- Xcode build / đóng gói IPA: CHƯA CHẠY; cần repository và runner GitHub.
- Ký bằng Apple ID / cài / mở trên iPad: CHƯA THỰC HIỆN.
- Thiết bị do người dùng xác nhận: iPad Air 11-inch (M3), iPadOS 26.6.1; đáp ứng yêu cầu iPadOS 16.4+ của project. Chưa kết nối để kiểm chứng trực tiếp.
- npm báo 22 cảnh báo bảo mật dependencies (7 moderate, 15 high) khi cài mẫu hiện tại; chưa audit chi tiết hoặc tự động nâng major. Project là bản thử cài đặt, chưa được đánh giá sẵn sàng cho production.

Không coi bundle thành công là bằng chứng triển khai thiết bị thành công.

