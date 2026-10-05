import { fetchDemoProducts, fetchProducts } from "./productsApi.jsx";
import { fallbackProducts } from "../data/fallbackProducts.jsx";

describe("productsApi", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  test("trả về danh sách sản phẩm khi API phản hồi thành công", async () => {
    const products = [{ id: 1, name: "Sản phẩm mẫu" }];
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(products),
    });
    const controller = new AbortController();

    await expect(fetchProducts({ signal: controller.signal })).resolves.toEqual(products);
    expect(global.fetch).toHaveBeenCalledWith("/api/products", {
      signal: controller.signal,
    });
  });

  test("ném lỗi khi API phản hồi không thành công", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false });

    await expect(fetchProducts()).rejects.toThrow("Không thể tải danh sách sản phẩm");
  });

  test("ném lỗi khi dữ liệu API không phải mảng", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ products: [] }),
    });

    await expect(fetchProducts()).rejects.toThrow("Dữ liệu sản phẩm không hợp lệ");
  });

  test("API demo trả về dữ liệu sau thời gian chờ", async () => {
    jest.useFakeTimers();
    const promise = fetchDemoProducts();
    jest.advanceTimersByTime(250);

    await expect(promise).resolves.toEqual(fallbackProducts);
    jest.useRealTimers();
  });

  test("API demo hủy yêu cầu bằng AbortSignal", async () => {
    const controller = new AbortController();
    const promise = fetchDemoProducts({ signal: controller.signal });
    controller.abort();

    await expect(promise).rejects.toMatchObject({ name: "AbortError" });
  });
});
