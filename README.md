# Bài tập tối ưu hiệu năng React

Trang quản lý **10.000 sản phẩm** bằng React và Vite. Có tìm kiếm theo tên/mã, lọc danh mục, sắp xếp giá/tồn kho, cuộn danh sách và xem chi tiết. Dữ liệu được tạo cố định trong `src/products.js`; không cần backend. Nút thêm sản phẩm và xuất dữ liệu là phần minh họa giao diện.

## Chạy project

Yêu cầu Node.js 20.19 trở lên và Chrome hoặc Edge.

```powershell
npm ci
npm run dev
```

Mở địa chỉ Vite in ra trong terminal. Để xem đúng bản production đã dùng khi đo Lighthouse:

```powershell
npm run build
npm run preview -- --port 4173
```

Mở `http://127.0.0.1:4173/`. Giữ server preview đang chạy, mở terminal thứ hai để kiểm tra các thao tác chính:

```powershell
npm run test:smoke
```

## Bài nộp

- [Báo cáo trước/sau](REPORT.md)
- Báo cáo Lighthouse gốc: `reports/before/` (3 lần, mỗi lần có HTML và JSON)
- Báo cáo Lighthouse sau tối ưu: `reports/after/` (3 lần, mỗi lần có HTML và JSON)
- Ảnh giao diện: `reports/after/preview.png` và `reports/after/preview-filtered.png`
- Mã nguồn trước tối ưu được lưu ở Git commit `b53f81b`; mã nguồn hiện tại là bản đã tối ưu.

Lighthouse được đo trên production build ở chế độ desktop. Chi tiết phương pháp, số liệu và nhận xét có trong `REPORT.md`.
