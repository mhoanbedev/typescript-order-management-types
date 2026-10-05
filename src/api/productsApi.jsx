import { fallbackProducts } from "../data/fallbackProducts.jsx";

export async function fetchProducts({ signal } = {}) {
  const response = await fetch("/api/products", { signal });

  if (!response.ok) {
    throw new Error("Không thể tải danh sách sản phẩm");
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Dữ liệu sản phẩm không hợp lệ");
  }

  return data;
}
// Adapter dùng cho bản demo khi chưa có backend thật.
export async function fetchDemoProducts({ signal } = {}) {
  await new Promise((resolve, reject) => {
    const timeoutId = setTimeout(resolve, 250);
    signal?.addEventListener("abort", () => {
      clearTimeout(timeoutId);
      reject(new DOMException("Đã hủy yêu cầu", "AbortError"));
    });
  });
  return fallbackProducts;
}
