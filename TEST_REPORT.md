# Báo cáo kiểm thử module sản phẩm và giỏ hàng

## Phạm vi

- Unit test: reducer, selector, API service và custom hook `useProducts`.
- Integration test: component `App` với React Testing Library và `user-event`.
- Async test: tải sản phẩm, xử lý lỗi/thử lại và mock `fetch` của API.
- Coverage threshold: tối thiểu 70% cho statements, branches, functions và lines.

## Danh sách test case

| Nhóm | Số lượng | Nội dung chính |
| --- | ---: | --- |
| Reducer + selector | 15 | Thêm/tăng/giảm/xóa/xóa tất cả, giới hạn tồn kho, action lạ, đếm số lượng, tạm tính, phí giao hàng |
| API | 5 | API thành công, HTTP lỗi, payload sai, dữ liệu demo bất đồng bộ, hủy request |
| Custom hook | 5 | Loading/success, error, message mặc định, retry, abort khi unmount |
| Integration RTL | 10 | Loading, API mock, retry, tìm kiếm, giỏ hàng, giới hạn tồn kho, xóa sản phẩm |
| **Tổng** | **35** | Vượt yêu cầu tối thiểu 10 test case |

## Các lệnh xác minh

```powershell
npm test -- --runInBand
npm run test:coverage -- --runInBand
npm run build
npm run coverage:screenshot
```

## Kết quả

Xác minh ngày **05/10/2026**:

- Test suites: **4 passed / 4 total**.
- Test cases: **35 passed / 35 total**.
- Production build: **thành công** với Vite 8.3.2.
- Dependency production: **0 lỗ hổng** (`npm audit --omit=dev`).

| Chỉ số coverage | Kết quả | Yêu cầu | Đánh giá |
| --- | ---: | ---: | --- |
| Statements | **100%** (88/88) | ≥ 70% | Đạt |
| Branches | **92,3%** (48/52) | ≥ 70% | Đạt |
| Functions | **100%** (34/34) | ≥ 70% | Đạt |
| Lines | **100%** (79/79) | ≥ 70% | Đạt |

Ảnh bằng chứng đã được tạo và kiểm tra tại `reports/coverage-report.png`.
