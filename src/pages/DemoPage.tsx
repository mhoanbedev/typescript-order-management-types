import React from 'react'
import { Accordion } from '../components/Accordion/Accordion'
import { ProductList } from '../components/ProductList/ProductList'
import './DemoPage.css'

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'Nike Air Max 90',
    price: 129.99,
    description: 'Giày thể thao thoải mái với công nghệ Air Max',
  },
  {
    id: 2,
    name: 'Sony WH-1000XM5',
    price: 399.99,
    description: 'Tai nghe chống ồn hàng đầu với âm thanh chất lượng cao',
  },
  {
    id: 3,
    name: 'Samsung Galaxy Buds',
    price: 149.99,
    description: 'Tai nghe không dây với pin 24 giờ',
  },
  {
    id: 4,
    name: 'Apple Watch Series 9',
    price: 399.99,
    description: 'Đồng hồ thông minh với tính năng sức khỏe nâng cao',
  },
  {
    id: 5,
    name: 'Adidas Ultraboost 22',
    price: 189.99,
    description: 'Giày chạy bộ với công nghệ Boost reaction',
  },
  {
    id: 6,
    name: 'Canon EOS M50',
    price: 799.99,
    description: 'Máy ảnh mirrorless 4K với AF nhanh',
  },
  {
    id: 7,
    name: 'DJI Air 3S',
    price: 999.99,
    description: 'Drone chụp ảnh với cảm biến 48MP',
  },
  {
    id: 8,
    name: 'Logitech MX Master 3S',
    price: 99.99,
    description: 'Chuột wireless chuyên nghiệp cho văn phòng',
  },
  {
    id: 9,
    name: 'Keychron K2 Pro',
    price: 199.99,
    description: 'Bàn phím cơ 75% với Gateron switches',
  },
]

export const DemoPage: React.FC = () => {
  return (
    <div className="demo-page">
      <header className="demo-header">
        <h1>E-Commerce Product Showcase</h1>
        <p>Compound Component & Pagination Pattern Implementation</p>
      </header>

      <div className="demo-content">
        {/* Accordion Demo */}
        <section className="demo-section">
          <h2>Yêu cầu bài tập</h2>
          <Accordion.Root>
            <Accordion.Panel id="panel-1">
              <Accordion.Header panelId="panel-1">
                1. Xây dựng Compound Component Accordion
              </Accordion.Header>
              <Accordion.Content panelId="panel-1">
                Tạo component Accordion với multiple panels, chỉ có thể mở 1 panel tại một thời điểm. Sử dụng Context API để quản lý state của panel nào đang mở, tương tự như pattern Tabs.
              </Accordion.Content>
            </Accordion.Panel>

            <Accordion.Panel id="panel-2">
              <Accordion.Header panelId="panel-2">
                2. Context API Implementation
              </Accordion.Header>
              <Accordion.Content panelId="panel-2">
                Sử dụng React Context API để chia sẻ state giữa Accordion.Header và Accordion.Content mà không cần prop drilling. Mỗi panel có ID duy nhất để track trạng thái.
              </Accordion.Content>
            </Accordion.Panel>

            <Accordion.Panel id="panel-3">
              <Accordion.Header panelId="panel-3">
                3. Custom Hook usePagination&lt;T&gt;
              </Accordion.Header>
              <Accordion.Content panelId="panel-3">
                Viết custom hook generic nhận vào mảng dữ liệu T[] và số item/trang. Trả về: currentPage, totalPages, currentItems, next(), prev(), goToPage(page).
              </Accordion.Content>
            </Accordion.Panel>

            <Accordion.Panel id="panel-4">
              <Accordion.Header panelId="panel-4">
                4. TypeScript Generic Pattern
              </Accordion.Header>
              <Accordion.Content panelId="panel-4">
                Hook usePagination sử dụng TypeScript Generic &lt;T&gt; để hoạt động với bất kỳ kiểu dữ liệu nào. Điều này giúp tái sử dụng hook cho Product, User, Article, v.v.
              </Accordion.Content>
            </Accordion.Panel>

            <Accordion.Panel id="panel-5">
              <Accordion.Header panelId="panel-5">
                5. Compound Components Pattern
              </Accordion.Header>
              <Accordion.Content panelId="panel-5">
                Xây dựng Accordion.Root, Accordion.Panel, Accordion.Header, Accordion.Content như một hệ thống liên kết. Mỗi component con biết cách tương tác với nhau thông qua Context.
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion.Root>
        </section>

        {/* Pagination Demo */}
        <section className="demo-section">
          <h2>Danh sách sản phẩm - Demo usePagination Hook</h2>
          <ProductList products={SAMPLE_PRODUCTS} itemsPerPage={6} />
        </section>
      </div>

      <footer className="demo-footer">
        <p>LTWNC - Bài tập tuần 2: Compound Components & Custom Hooks</p>
      </footer>
    </div>
  )
}


