import { useMemo, useReducer, useState } from "react";
import {
  CART_ACTIONS,
  cartReducer,
  getCartCount,
  getCartSubtotal,
  getShippingFee,
  initialCartState,
} from "./cart/cartReducer.jsx";
import { useProducts } from "./hooks/useProducts.jsx";

const money = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export default function App({ productLoader }) {
  const { products, status, error, retry } = useProducts(productLoader);
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);
  const [query, setQuery] = useState("");

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi-VN");
    return products.filter((product) =>
      `${product.name} ${product.category}`
        .toLocaleLowerCase("vi-VN")
        .includes(normalizedQuery),
    );
  }, [products, query]);

  const itemCount = getCartCount(cart.items);
  const subtotal = getCartSubtotal(cart.items);
  const shippingFee = getShippingFee(subtotal);

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#products" aria-label="Mini Store - Trang chủ">
          <span>mini</span>store
        </a>
        <div className="cart-badge" aria-label={`Giỏ hàng có ${itemCount} sản phẩm`}>
          🛒 <strong>{itemCount}</strong>
        </div>
      </header>

      <main>
        <section className="hero">
          <div>
            <p className="eyebrow">BÀI TẬP KIỂM THỬ REACT</p>
            <h1>Sản phẩm cho ngày năng động.</h1>
            <p className="hero-copy">
              Một cửa hàng nhỏ để minh họa unit test, custom hook và kiểm thử
              tích hợp với React Testing Library.
            </p>
          </div>
          <div className="hero-art" aria-hidden="true">🛍️</div>
        </section>

        <div className="content-grid">
          <section id="products" className="products-section" aria-labelledby="products-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">DANH MỤC NỔI BẬT</p>
                <h2 id="products-title">Sản phẩm</h2>
              </div>
              <label className="search-box">
                <span aria-hidden="true">⌕</span>
                <span className="sr-only">Tìm sản phẩm</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Tìm theo tên hoặc danh mục..."
                />
              </label>
            </div>

            {status === "loading" && (
              <div className="status-card" role="status">Đang tải sản phẩm...</div>
            )}

            {status === "error" && (
              <div className="status-card error" role="alert">
                <strong>Tải dữ liệu thất bại</strong>
                <span>{error}</span>
                <button type="button" onClick={retry}>Thử lại</button>
              </div>
            )}

            {status === "success" && visibleProducts.length === 0 && (
              <p className="status-card">Không tìm thấy sản phẩm phù hợp.</p>
            )}

            {status === "success" && visibleProducts.length > 0 && (
              <div className="product-grid">
                {visibleProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    <div className="product-visual" aria-hidden="true">{product.icon}</div>
                    <span className="category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <div className="product-meta">
                      <strong>{money.format(product.price)}</strong>
                      <small>{product.stock > 0 ? `Còn ${product.stock}` : "Hết hàng"}</small>
                    </div>
                    <button
                      type="button"
                      disabled={product.stock === 0}
                      onClick={() => dispatch({ type: CART_ACTIONS.ADD, payload: product })}
                      aria-label={`Thêm ${product.name} vào giỏ`}
                    >
                      {product.stock === 0 ? "Tạm hết hàng" : "Thêm vào giỏ"}
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>

          <aside className="cart-panel" aria-labelledby="cart-title">
            <div className="cart-heading">
              <div>
                <p className="eyebrow">ĐƠN HÀNG</p>
                <h2 id="cart-title">Giỏ hàng</h2>
              </div>
              <span>{itemCount} món</span>
            </div>

            {cart.items.length === 0 ? (
              <div className="empty-cart">
                <span aria-hidden="true">🧺</span>
                <strong>Giỏ hàng đang trống</strong>
                <p>Hãy chọn một sản phẩm bạn thích.</p>
              </div>
            ) : (
              <>
                <ul className="cart-list">
                  {cart.items.map((item) => (
                    <li key={item.id}>
                      <span className="cart-icon" aria-hidden="true">{item.icon}</span>
                      <div className="cart-copy">
                        <strong>{item.name}</strong>
                        <small>{money.format(item.price)}</small>
                        <div className="quantity-controls" aria-label={`Số lượng ${item.name}`}>
                          <button
                            type="button"
                            onClick={() => dispatch({ type: CART_ACTIONS.DECREASE, payload: item.id })}
                            aria-label={`Giảm ${item.name}`}
                          >−</button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => dispatch({ type: CART_ACTIONS.ADD, payload: item })}
                            aria-label={`Tăng ${item.name}`}
                            disabled={item.quantity >= item.stock}
                          >+</button>
                        </div>
                      </div>
                      <button
                        className="remove-button"
                        type="button"
                        onClick={() => dispatch({ type: CART_ACTIONS.REMOVE, payload: item.id })}
                        aria-label={`Xóa ${item.name} khỏi giỏ`}
                      >×</button>
                    </li>
                  ))}
                </ul>
                <button
                  className="clear-button"
                  type="button"
                  onClick={() => dispatch({ type: CART_ACTIONS.CLEAR })}
                >Xóa toàn bộ giỏ hàng</button>
              </>
            )}

            <dl className="totals">
              <div><dt>Tạm tính</dt><dd>{money.format(subtotal)}</dd></div>
              <div><dt>Phí giao hàng</dt><dd>{shippingFee === 0 ? "Miễn phí" : money.format(shippingFee)}</dd></div>
              <div className="grand-total"><dt>Tổng cộng</dt><dd>{money.format(subtotal + shippingFee)}</dd></div>
            </dl>
            <button className="checkout-button" type="button" disabled={cart.items.length === 0}>
              Thanh toán
            </button>
            <p className="shipping-note">Miễn phí giao hàng cho đơn từ 500.000 ₫</p>
          </aside>
        </div>
      </main>
    </div>
  );
}
