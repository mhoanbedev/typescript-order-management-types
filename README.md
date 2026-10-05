# Bài tập tuần 6 - Kiểm thử module sản phẩm và giỏ hàng

Ứng dụng React/Vite minh họa module sản phẩm và giỏ hàng. Dữ liệu được tải bất đồng bộ qua một lớp API; reducer chịu trách nhiệm thêm, tăng, giảm, xóa sản phẩm và các hàm selector tính tổng tiền/phí giao hàng.

## Chạy project

Yêu cầu Node.js 20.19 trở lên.

```powershell
npm ci
npm run dev
```

## Chạy kiểm thử

```powershell
npm test
npm run test:coverage
```

Cấu hình Jest bắt buộc cả statements, branches, functions và lines đạt tối thiểu 70%. Nếu bất kỳ chỉ số nào thấp hơn, lệnh coverage sẽ trả về lỗi.

Ảnh báo cáo coverage dùng để nộp nằm tại [reports/coverage-report.png](reports/coverage-report.png). Có thể tạo lại ảnh sau khi chạy coverage bằng:

```powershell
npm run coverage:screenshot
```

## Cấu trúc chính

```text
src/
├── api/productsApi.jsx         # API thật và adapter dữ liệu demo
├── cart/cartReducer.jsx        # Reducer + selector giỏ hàng
├── hooks/useProducts.jsx       # Hook tải dữ liệu bất đồng bộ
├── App.jsx                     # Component tích hợp sản phẩm/giỏ hàng
└── **/*.test.jsx               # Unit và integration test
```

Chi tiết test case và kết quả thực thi được ghi trong [TEST_REPORT.md](TEST_REPORT.md).
