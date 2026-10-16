# iPad Lab — Windows → iPad, Apple ID miễn phí

Ứng dụng React Native/Expo nhỏ: tăng/đặt lại bộ đếm, xem phiên bản hệ điều hành và mở hộp thoại native. Không có backend, không thu thập thông tin Apple ID.

## Điều kiện

- iPadOS 16.4 trở lên cho Expo SDK 58; cần xác nhận phiên bản thực tế của iPad.
- Windows, cáp dữ liệu, Apple ID miễn phí do bạn tự đăng nhập khi ký app.
- Tài khoản GitHub và repository có quyền dùng GitHub Actions trên runner macOS.
- AltStore **Classic** và AltServer cho Windows. AltStore PAL là sản phẩm khác.

Không cần trả phí Apple Developer Program, TestFlight hay tài khoản Expo. Vẫn sử dụng cơ chế ký phát triển miễn phí của Apple. Bản unsigned không thể cài trực tiếp lên iPad.

## 1. Tạo file IPA trên macOS của GitHub Actions

Đưa **nội dung thư mục này** vào thư mục gốc của một repository GitHub, bao gồm `.github/workflows/ios-unsigned.yml`, `package-lock.json`, mã nguồn và assets; bỏ `node_modules`, `.expo`, `dist`, `build`, `ios`, `android`.

Chọn visibility trước khi upload. Runner tiêu chuẩn miễn phí ở repository public; repository private dùng hạn mức tài khoản và có thể phát sinh phí khi vượt hạn mức. Không đưa Apple ID, mật khẩu hay chứng chỉ lên repository.

Trong GitHub: Actions → Build iPad app (unsigned) → Run workflow. Sau khi thành công, tải artifact `iPadLab-unsigned`, giải nén lấy `iPadLab-unsigned.ipa`.

Workflow tạo project iOS từ cấu hình Expo, dùng Xcode build Release cho thiết bị thật, kiểm tra có JavaScript bundle và đóng gói IPA chưa ký. Không dùng bản dành cho simulator. Bản này dự kiến chạy không cần Metro sau khi ký/cài; phải kiểm chứng trên thiết bị.

Nếu lỗi Xcode quá cũ: runner phải có Xcode 26.4 trở lên theo yêu cầu SDK 58. Xem log `Check Xcode` và chọn Xcode tương thích trên runner. Nếu lỗi native compilation, lưu log bước build để xử lý trước khi cài.

## 2. Chuẩn bị AltStore trên Windows và iPad

Làm theo hướng dẫn chính thức: https://faq.altstore.io/altstore-classic/how-to-install-altstore-windows

1. Cài iTunes/iCloud theo yêu cầu trong hướng dẫn AltStore hiện tại, rồi cài AltServer từ https://altstore.io/.
2. Kết nối iPad bằng cáp, mở khóa, chọn Trust/Tin cậy máy tính trên iPad.
3. Bật Wi-Fi sync trong iTunes nếu dùng đồng bộ không dây.
4. Trong biểu tượng AltServer ở khay hệ thống, chọn Install AltStore → iPad.
5. Bạn tự nhập Apple ID và xác thực trực tiếp trong công cụ. Không gửi mật khẩu vào chat.
6. Trên iPad, vào Settings → General → VPN & Device Management để tin cậy tài khoản ký nếu được yêu cầu.
7. Bật Developer Mode trong Settings → Privacy & Security nếu xuất hiện yêu cầu; khởi động lại và xác nhận trên iPad.

Không thay thế hay gỡ phần mềm Apple đang có trước khi kiểm tra phiên bản và khả năng tương thích.

## 3. Ký và cài app mẫu

Giữ AltServer chạy và iPad kết nối/cùng mạng. Chuyển IPA vào ứng dụng Files trên iPad, mở AltStore Classic → My Apps → dấu + → chọn IPA. AltStore ký bằng Apple ID miễn phí rồi cài app. Nếu gặp lỗi đăng nhập hoặc trust, hoàn tất trên thiết bị; nếu lỗi provisioning/cài đặt, lưu nguyên thông báo lỗi.

## 4. Kiểm chứng toàn bộ quá trình

- Màn hình chính xuất hiện biểu tượng iPad Lab và mở app được.
- Nhấn tăng 3 lần → số 3; Đặt lại → số 0.
- Nhấn Thử hộp thoại native → xuất hiện hộp thoại.
- Xoay iPad ngang/dọc: nội dung vẫn đọc được, cuộn được.
- Đóng hẳn app, bật chế độ máy bay, mở lại và thử bộ đếm. Giá trị trở về 0 là hành vi chủ đích.
- Ghi lại mẫu iPad, iPadOS, thời điểm cài và kết quả. Chỉ sau các bước này mới xác nhận triển khai thành công.

Tài khoản miễn phí có giới hạn provisioning 7 ngày và số app hoạt động. Trong AltStore dùng Refresh All khi còn hạn, với AltServer truy cập được. Hết hạn có thể cần ký/cài lại. Đây là cách thử nghiệm cá nhân, không phải phát hành lâu dài cho khách hàng.

## Lệnh kiểm tra trên Windows

```powershell
npm ci
npx tsc --noEmit
npx expo lint
npx expo export --platform ios --output-dir ../../work/ios-bundle
```

Export JavaScript thành công không chứng minh Xcode build hoặc cài trên iPad thành công. Windows không chạy Xcode.

## Nguồn

- Apple — Personal Team và giới hạn: https://developer.apple.com/help/account/basics/about-your-developer-account
- Expo SDK 58 / yêu cầu iOS-Xcode: https://docs.expo.dev/versions/v58.0.0/
- Expo Prebuild: https://docs.expo.dev/workflow/continuous-native-generation/
- GitHub runners: https://docs.github.com/en/actions/reference/runners/github-hosted-runners
- AltStore Windows: https://faq.altstore.io/altstore-classic/how-to-install-altstore-windows
- AltStore refresh: https://faq.altstore.io/altstore-classic/your-altstore
