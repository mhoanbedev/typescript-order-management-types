# Báo cáo tối ưu hiệu năng trang quản lý 10.000 sản phẩm

Ngày thực hiện: **04/10/2026**. Mã nguồn bản đầu được lưu tại commit **`b53f81b`**; thư mục `src/` hiện tại là bản đã tối ưu.

## 1. Trang và vấn đề ban đầu

Trang React hiển thị 10.000 sản phẩm được tạo cố định, có tìm kiếm theo tên/mã, lọc danh mục, sắp xếp giá/tồn kho và xem chi tiết. Bản đầu gọi `filter()` và `sort()` trong mỗi lần component `App` render, rồi tạo **toàn bộ 10.000 dòng** bên trong vùng cuộn cao 509 px. Vì vậy phần lớn dòng nằm ngoài màn hình vẫn được React dựng và trình duyệt xử lý. Bản đầu cũng tính lại hai chỉ số thống kê từ toàn bộ dữ liệu mỗi lần render.

Trong Lighthouse, bản đầu có khoảng **140.132 phần tử DOM** và TBT trung vị **1.204 ms**. Đây là tín hiệu phù hợp với chi phí JavaScript và DOM của bảng dài. TBT không xác định riêng một nguyên nhân, nên phần nhận định nguyên nhân dựa thêm vào cấu trúc mã nguồn và số lượng DOM.

## 2. Cách đo

- Chạy `npm run build` rồi `npm run preview -- --port 4173`, đo trang `http://127.0.0.1:4173/`. Cả hai phiên bản đều được đo từ production build, không đo từ Vite dev server.
- Dùng Lighthouse **12.8.2**, Chrome headless **154.0.0.0**, preset **desktop**, viewport mô phỏng **1350 × 940**, phương pháp throttling **simulate**, chỉ chọn hạng mục Performance.
- Mỗi phiên bản chạy **3 lần liên tiếp** trên cùng máy, cùng dữ liệu và cấu hình; bảng so sánh dùng **trung vị từng chỉ số**. Các file HTML và JSON gốc được giữ trong `reports/before/` và `reports/after/`.
- Lệnh đo cho mỗi lần: `./node_modules/.bin/lighthouse.cmd http://127.0.0.1:4173/ --preset=desktop --only-categories=performance --chrome-flags="--headless --disable-gpu --no-sandbox" --output=html --output=json --output-path=reports/<before|after>/run-N --quiet` (trên Windows PowerShell dùng `./` hoặc `.\`).

FCP là lúc nội dung đầu tiên xuất hiện; LCP là lúc phần nội dung lớn nhất trong vùng nhìn thấy xuất hiện; TBT là tổng thời gian tác vụ dài cản trở luồng chính trong giai đoạn tải; CLS là mức xê dịch bố cục. Với bốn chỉ số này, **càng thấp càng tốt**. Điểm Performance càng cao càng tốt. [Tài liệu Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/), [giải thích TBT](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/).

## 3. Kết quả đo trước tối ưu

| Lần đo | Performance | FCP | LCP | TBT | CLS | DOM |
|---|---:|---:|---:|---:|---:|---:|
| [1](reports/before/run-1.report.html) | 69 | 329 ms | 727 ms | 1.204 ms | 0 | 140.132 |
| [2](reports/before/run-2.report.html) | 70 | 324 ms | 658 ms | 1.045 ms | 0 | 140.132 |
| [3](reports/before/run-3.report.html) | 68 | 326 ms | 722 ms | 1.273 ms | 0 | 140.132 |
| **Trung vị** | **69** | **326 ms** | **722 ms** | **1.204 ms** | **0** | **140.132** |

JSON tương ứng: [lần 1](reports/before/run-1.report.json), [lần 2](reports/before/run-2.report.json), [lần 3](reports/before/run-3.report.json).

## 4. Giải pháp đã áp dụng

### Virtualization cho bảng 10.000 sản phẩm

`VirtualProductList` trong `src/App.jsx` tính vị trí dòng đầu tiên từ `scrollTop`, chiều cao cố định **57 px/dòng** và chiều cao vùng nhìn thấy **509 px**. Component chỉ dựng nhóm dòng đang thấy cùng 5 dòng đệm mỗi phía; một phần tử đệm giữ nguyên tổng chiều cao cuộn. Khi cuộn, nhóm dòng được thay thế. Dữ liệu vẫn đủ 10.000 sản phẩm và các thao tác lọc/sắp xếp vẫn thực hiện trên toàn bộ dữ liệu. Kiểm tra trình duyệt cho thấy **19 dòng** được render lúc đầu, thay vì 10.000. Đây là thay đổi tác động chính đến số phần tử DOM và TBT khi tải. [Giải thích virtualization](https://web.dev/articles/virtualize-long-lists-react-window).

### Memoization cho phép tính và dòng sản phẩm

`useMemo` ghi nhớ mảng sản phẩm đã lọc/sắp xếp theo ba phụ thuộc `query`, `category` và `sort`. Mở/đóng khung chi tiết hay các lần render không đổi ba giá trị này không cần xử lý lại 10.000 sản phẩm. `React.memo` giúp dòng sản phẩm giữ nguyên props không render lại; hai số thống kê cố định được tính một lần ngoài component. Memoization chủ yếu hỗ trợ **tương tác sau khi tải**, nên không quy toàn bộ mức tăng điểm Lighthouse cho kỹ thuật này. [Tài liệu `useMemo`](https://react.dev/reference/react/useMemo), [`memo`](https://react.dev/reference/react/memo).

Khi đổi tìm kiếm/bộ lọc/sắp xếp, danh sách cuộn được đặt lại từ đầu để không rơi vào vị trí cuộn cũ nằm ngoài kết quả mới.

## 5. Kết quả sau tối ưu và so sánh

| Lần đo | Performance | FCP | LCP | TBT | CLS | DOM |
|---|---:|---:|---:|---:|---:|---:|
| [1](reports/after/run-1.report.html) | 100 | 324 ms | 324 ms | 0 ms | 0 | 418 |
| [2](reports/after/run-2.report.html) | 100 | 324 ms | 324 ms | 0 ms | 0 | 418 |
| [3](reports/after/run-3.report.html) | 100 | 324 ms | 324 ms | 0 ms | 0 | 418 |
| **Trung vị** | **100** | **324 ms** | **324 ms** | **0 ms** | **0** | **418** |

JSON tương ứng: [lần 1](reports/after/run-1.report.json), [lần 2](reports/after/run-2.report.json), [lần 3](reports/after/run-3.report.json).

| Chỉ số (trung vị) | Trước | Sau | Thay đổi |
|---|---:|---:|---:|
| Performance | 69/100 | 100/100 | **+31 điểm** |
| FCP | 326 ms | 324 ms | −2 ms; chênh lệch rất nhỏ |
| LCP | 722 ms | 324 ms | **−398 ms (~55%)** |
| TBT | 1.204 ms | 0 ms | **−1.204 ms** trong phép đo |
| CLS | 0 | 0 | Không đổi |
| Số phần tử DOM | 140.132 | 418 | **giảm ~99,7%** |

## 6. Kiểm tra chức năng và kết luận

Lệnh `npm run test:smoke` mở Chrome thật và xác nhận: trang có 10.000 sản phẩm, số dòng DOM ban đầu dưới 40, cuộn tới sản phẩm gần cuối, lọc danh mục, tìm kiếm, sắp xếp giảm dần, mở/đóng chi tiết và không có lỗi JavaScript. Có thể xem [ảnh trang ban đầu](reports/after/preview.png) và [ảnh sau khi lọc](reports/after/preview-filtered.png).

Kết quả cho thấy **virtualization giải quyết rõ vấn đề bảng quá dài** trong phép đo tải trang; memoization giảm xử lý lặp khi tương tác. FCP gần như không đổi và CLS vốn đã bằng 0. Lighthouse là phép đo trong môi trường mô phỏng; TBT bằng 0 ms ở đây không có nghĩa mọi thao tác trên mọi thiết bị đều không có độ trễ. Nếu cần đánh giá trải nghiệm tìm kiếm sâu hơn, có thể ghi thêm trace bằng Chrome Performance hoặc React Profiler khi gõ vào ô tìm kiếm.
