import { memo, useMemo, useState } from "react";
import { categories, currency, products } from "./products.js";

const categoryIcons = ["◈", "✦", "⌂", "▤", "◎"];
const ROW_HEIGHT = 57;
const VIEWPORT_HEIGHT = 509;
const OVERSCAN = 5;
const lowStock = products.filter((product) => product.stock < 20).length;
const totalSold = products.reduce((total, product) => total + product.sold, 0);

const ProductRow = memo(function ProductRow({ product, onSelect }) {
  return (
    <div className="product-row" role="row">
      <div className="product-cell product-identity" role="cell">
        <span className={`product-avatar ${product.accent}`} aria-hidden="true">
          {categoryIcons[categories.indexOf(product.category)]}
        </span>
        <span className="product-copy">
          <button className="product-name" onClick={() => onSelect(product)}>
            {product.name}
          </button>
          <span className="sku">{product.sku}</span>
        </span>
      </div>
      <div className="product-cell category-cell" role="cell">
        {product.category}
      </div>
      <div className="product-cell price-cell" role="cell">
        {currency.format(product.price)}
      </div>
      <div className="product-cell stock-cell" role="cell">
        <span className={product.stock < 20 ? "stock low" : "stock"}>
          <span className="stock-dot" />
          {product.stock < 20 ? "Sắp hết" : "Còn hàng"}
        </span>
      </div>
      <div className="product-cell sold-cell" role="cell">
        {product.sold.toLocaleString("vi-VN")}
      </div>
      <div className="product-cell more-cell" role="cell">
        <button
          className="more-button"
          onClick={() => onSelect(product)}
          aria-label={`Xem ${product.name}`}
        >
          ↗
        </button>
      </div>
    </div>
  );
});

function VirtualProductList({ items, onSelect }) {
  const [scrollTop, setScrollTop] = useState(0);
  const firstIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const lastIndex = Math.min(
    items.length,
    firstIndex + Math.ceil(VIEWPORT_HEIGHT / ROW_HEIGHT) + OVERSCAN * 2,
  );

  return (
    <div
      className="table-body virtual-body"
      style={{ height: VIEWPORT_HEIGHT }}
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      aria-rowcount={items.length}
    >
      <div
        className="virtual-spacer"
        style={{ height: items.length * ROW_HEIGHT }}
      >
        {items.slice(firstIndex, lastIndex).map((product, offset) => (
          <div
            className="virtual-row"
            style={{ top: (firstIndex + offset) * ROW_HEIGHT }}
            key={product.id}
          >
            <ProductRow product={product} onSelect={onSelect} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [sort, setSort] = useState("default");
  const [selected, setSelected] = useState(null);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi-VN");
    return products
      .filter(
        (product) =>
          (category === "Tất cả" || product.category === category) &&
          `${product.name} ${product.sku}`
            .toLocaleLowerCase("vi-VN")
            .includes(normalizedQuery),
      )
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        if (sort === "stock") return a.stock - b.stock;
        return a.id - b.id;
      });
  }, [query, category, sort]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">
            s<span>.</span>
          </span>
          <span>
            store<span className="brand-light">pilot</span>
          </span>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <div className="workspace-card">
          <span className="workspace-icon">S</span>
          <span>
            <strong>Studio Market</strong>
            <small>Gói quản trị viên</small>
          </span>
          <span className="workspace-chevron">⌄</span>
        </div>
        <div className="nav-caption">TỔNG QUAN</div>
        <nav aria-label="Điều hướng chính">
          <a className="nav-link" href="#overview">
            <span>▦</span> Tổng quan
          </a>
          <a className="nav-link active" href="#products" aria-current="page">
            <span>◫</span> Sản phẩm <span className="nav-count">10k</span>
          </a>
          <a className="nav-link" href="#products">
            <span>◱</span> Đơn hàng
          </a>
          <a className="nav-link" href="#products">
            <span>♧</span> Khách hàng
          </a>
          <a className="nav-link" href="#products">
            <span>▥</span> Báo cáo
          </a>
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <span className="help-icon">✧</span>
            <strong>Cần trợ giúp?</strong>
            <p>Quản lý cửa hàng của bạn dễ dàng hơn mỗi ngày.</p>
            <span className="help-link">Xem hướng dẫn →</span>
          </div>
          <div className="profile">
            <span className="profile-avatar">AD</span>
            <span>
              <strong>Admin Studio</strong>
              <small>Quản trị viên</small>
            </span>
            <span className="profile-more">···</span>
          </div>
        </div>
      </aside>

      <main id="products" className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            Cửa hàng <span>/</span> <strong>Sản phẩm</strong>
          </div>
          <div className="topbar-actions">
            <span className="today">◷ &nbsp;Hôm nay</span>
            <span className="topbar-divider" />
            <button className="icon-button" aria-label="Thông báo">
              ♧
            </button>
            <span className="top-avatar">AD</span>
          </div>
        </header>
        <div className="content-inner">
          <div className="page-heading">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" /> QUẢN LÝ CỬA HÀNG
              </div>
              <h1>Sản phẩm</h1>
              <p>
                Theo dõi và quản lý toàn bộ sản phẩm trong cửa hàng của bạn.
              </p>
            </div>
            <button
              className="primary-button"
              onClick={() => window.alert("Bản demo chỉ dùng để đo hiệu năng.")}
            >
              ＋ <span>Thêm sản phẩm</span>
            </button>
          </div>

          <section
            id="overview"
            className="stats-grid"
            aria-label="Thống kê sản phẩm"
          >
            <div className="stat-card">
              <div className="stat-top">
                <span>Tổng sản phẩm</span>
                <span className="stat-icon blue">◫</span>
              </div>
              <strong>{products.length.toLocaleString("vi-VN")}</strong>
              <small>
                <span className="up">↗ 12,8%</span> so với tháng trước
              </small>
            </div>
            <div className="stat-card">
              <div className="stat-top">
                <span>Đang bán</span>
                <span className="stat-icon mint">✓</span>
              </div>
              <strong>
                {(products.length - lowStock).toLocaleString("vi-VN")}
              </strong>
              <small>
                <span className="up">↗ 8,2%</span> so với tháng trước
              </small>
            </div>
            <div className="stat-card">
              <div className="stat-top">
                <span>Sắp hết hàng</span>
                <span className="stat-icon peach">!</span>
              </div>
              <strong>{lowStock.toLocaleString("vi-VN")}</strong>
              <small>
                <span className="muted">Cần bổ sung hàng sớm</span>
              </small>
            </div>
            <div className="stat-card">
              <div className="stat-top">
                <span>Đã bán</span>
                <span className="stat-icon violet">↗</span>
              </div>
              <strong>{totalSold.toLocaleString("vi-VN")}</strong>
              <small>
                <span className="up">↗ 18,4%</span> so với tháng trước
              </small>
            </div>
          </section>

          <section className="products-panel" aria-label="Danh sách sản phẩm">
            <div className="panel-header">
              <div>
                <h2>
                  Danh sách sản phẩm{" "}
                  <span>{visibleProducts.length.toLocaleString("vi-VN")}</span>
                </h2>
                <p>Tất cả sản phẩm hiện có trong cửa hàng</p>
              </div>
              <button
                className="outline-button"
                onClick={() => window.alert("Bản demo không kết nối máy chủ.")}
              >
                ⇩ &nbsp; Xuất dữ liệu
              </button>
            </div>
            <div className="toolbar">
              <label className="search-box">
                <span aria-hidden="true">⌕</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Tìm theo tên hoặc mã sản phẩm..."
                  aria-label="Tìm sản phẩm"
                />
                <kbd>⌘ K</kbd>
              </label>
              <div className="toolbar-filters">
                <label className="select-wrap">
                  <span aria-hidden="true">▤</span>
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    aria-label="Lọc danh mục"
                  >
                    <option>Tất cả</option>
                    {categories.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className="select-wrap">
                  <span aria-hidden="true">⇅</span>
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    aria-label="Sắp xếp"
                  >
                    <option value="default">Mặc định</option>
                    <option value="price-asc">Giá tăng dần</option>
                    <option value="price-desc">Giá giảm dần</option>
                    <option value="stock">Tồn kho ít nhất</option>
                  </select>
                </label>
              </div>
            </div>
            <div
              className="table-scroll"
              role="table"
              aria-label="Bảng sản phẩm"
            >
              <div className="table-header" role="row">
                <span role="columnheader">SẢN PHẨM</span>
                <span role="columnheader">DANH MỤC</span>
                <span role="columnheader">GIÁ BÁN</span>
                <span role="columnheader">TRẠNG THÁI</span>
                <span role="columnheader">ĐÃ BÁN</span>
                <span role="columnheader" aria-label="Thao tác" />
              </div>
              <VirtualProductList
                key={`${query}|${category}|${sort}`}
                items={visibleProducts}
                onSelect={setSelected}
              />
            </div>
            <div className="panel-footer">
              <span>
                Hiển thị{" "}
                <strong>
                  {visibleProducts.length.toLocaleString("vi-VN")}
                </strong>{" "}
                trong tổng số{" "}
                <strong>{products.length.toLocaleString("vi-VN")}</strong> sản
                phẩm
              </span>
              <span className="footer-note">
                Dữ liệu mẫu phục vụ bài thực hành tối ưu React
              </span>
            </div>
          </section>
          <p className="copyright">
            © 2026 Storepilot. Bài thực hành tối ưu hiệu năng React.
          </p>
        </div>
      </main>

      {selected && (
        <div className="drawer-backdrop" onClick={() => setSelected(null)}>
          <aside
            className="details-drawer"
            aria-label="Chi tiết sản phẩm"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-head">
              <span>CHI TIẾT SẢN PHẨM</span>
              <button onClick={() => setSelected(null)} aria-label="Đóng">
                ×
              </button>
            </div>
            <div className={`drawer-art ${selected.accent}`}>
              {categoryIcons[categories.indexOf(selected.category)]}
            </div>
            <h2>{selected.name}</h2>
            <p className="drawer-sku">{selected.sku}</p>
            <dl>
              <div>
                <dt>Danh mục</dt>
                <dd>{selected.category}</dd>
              </div>
              <div>
                <dt>Giá bán</dt>
                <dd>{currency.format(selected.price)}</dd>
              </div>
              <div>
                <dt>Tồn kho</dt>
                <dd>{selected.stock} sản phẩm</dd>
              </div>
              <div>
                <dt>Đã bán</dt>
                <dd>{selected.sold} sản phẩm</dd>
              </div>
            </dl>
          </aside>
        </div>
      )}
    </div>
  );
}
