import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";
import { fetchProducts } from "./api/productsApi.jsx";
import { testProducts } from "./test/fixtures.jsx";

function successfulResponse(products = testProducts) {
  return {
    ok: true,
    json: jest.fn().mockResolvedValue(products),
  };
}

describe("App - integration", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue(successfulResponse());
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  test("hiển thị loading rồi render sản phẩm từ API được mock", async () => {
    render(<App productLoader={fetchProducts} />);

    expect(screen.getByRole("status")).toHaveTextContent("Đang tải sản phẩm");
    expect(await screen.findByText("Tai nghe Bluetooth Pro")).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/products",
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  test("hiển thị lỗi và tải lại thành công khi nhấn Thử lại", async () => {
    const user = userEvent.setup();
    global.fetch
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce(successfulResponse());
    render(<App productLoader={fetchProducts} />);

    expect(await screen.findByRole("alert")).toHaveTextContent("Tải dữ liệu thất bại");
    await user.click(screen.getByRole("button", { name: "Thử lại" }));

    expect(await screen.findByText("Bình nước thể thao")).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  test("lọc sản phẩm theo từ khóa không phân biệt hoa thường", async () => {
    const user = userEvent.setup();
    render(<App productLoader={fetchProducts} />);
    await screen.findByText("Tai nghe Bluetooth Pro");

    await user.type(screen.getByRole("searchbox"), "THỂ THAO");

    expect(screen.getByText("Bình nước thể thao")).toBeInTheDocument();
    expect(screen.queryByText("Tai nghe Bluetooth Pro")).not.toBeInTheDocument();
  });

  test("hiển thị trạng thái rỗng khi tìm kiếm không có kết quả", async () => {
    const user = userEvent.setup();
    render(<App productLoader={fetchProducts} />);
    await screen.findByText("Tai nghe Bluetooth Pro");

    await user.type(screen.getByRole("searchbox"), "không tồn tại");

    expect(screen.getByText("Không tìm thấy sản phẩm phù hợp.")).toBeInTheDocument();
  });

  test("thêm sản phẩm cập nhật số món, tạm tính và miễn phí giao hàng", async () => {
    const user = userEvent.setup();
    render(<App productLoader={fetchProducts} />);
    await screen.findByText("Tai nghe Bluetooth Pro");

    await user.click(screen.getByRole("button", { name: "Thêm Tai nghe Bluetooth Pro vào giỏ" }));

    expect(screen.getByLabelText("Giỏ hàng có 1 sản phẩm")).toBeInTheDocument();
    const totals = screen.getByText("Tạm tính").closest("dl");
    expect(within(totals).getAllByText(/590\.000/)).toHaveLength(2);
    expect(within(totals).getByText("Miễn phí")).toBeInTheDocument();
  });

  test("tăng số lượng và khóa nút khi đạt giới hạn tồn kho", async () => {
    const user = userEvent.setup();
    render(<App productLoader={fetchProducts} />);
    await screen.findByText("Tai nghe Bluetooth Pro");
    await user.click(screen.getByRole("button", { name: "Thêm Tai nghe Bluetooth Pro vào giỏ" }));

    const increaseButton = screen.getByRole("button", { name: "Tăng Tai nghe Bluetooth Pro" });
    await user.click(increaseButton);

    expect(screen.getByLabelText("Giỏ hàng có 2 sản phẩm")).toBeInTheDocument();
    expect(increaseButton).toBeDisabled();
  });

  test("giảm sản phẩm cuối cùng sẽ đưa giỏ về trạng thái trống", async () => {
    const user = userEvent.setup();
    render(<App productLoader={fetchProducts} />);
    await screen.findByText("Tai nghe Bluetooth Pro");
    await user.click(screen.getByRole("button", { name: "Thêm Tai nghe Bluetooth Pro vào giỏ" }));

    await user.click(screen.getByRole("button", { name: "Giảm Tai nghe Bluetooth Pro" }));

    expect(screen.getByText("Giỏ hàng đang trống")).toBeInTheDocument();
    expect(screen.getByLabelText("Giỏ hàng có 0 sản phẩm")).toBeInTheDocument();
  });

  test("xóa riêng một sản phẩm khỏi giỏ", async () => {
    const user = userEvent.setup();
    render(<App productLoader={fetchProducts} />);
    await screen.findByText("Tai nghe Bluetooth Pro");
    await user.click(screen.getByRole("button", { name: "Thêm Tai nghe Bluetooth Pro vào giỏ" }));
    await user.click(screen.getByRole("button", { name: "Thêm Bình nước thể thao vào giỏ" }));

    await user.click(screen.getByRole("button", { name: "Xóa Tai nghe Bluetooth Pro khỏi giỏ" }));

    expect(screen.queryByRole("button", { name: "Xóa Tai nghe Bluetooth Pro khỏi giỏ" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Xóa Bình nước thể thao khỏi giỏ" })).toBeInTheDocument();
  });

  test("xóa toàn bộ giỏ hàng", async () => {
    const user = userEvent.setup();
    render(<App productLoader={fetchProducts} />);
    await screen.findByText("Tai nghe Bluetooth Pro");
    await user.click(screen.getByRole("button", { name: "Thêm Tai nghe Bluetooth Pro vào giỏ" }));

    await user.click(screen.getByRole("button", { name: "Xóa toàn bộ giỏ hàng" }));

    expect(screen.getByText("Giỏ hàng đang trống")).toBeInTheDocument();
  });

  test("không cho thêm sản phẩm hết hàng", async () => {
    render(<App productLoader={fetchProducts} />);
    await screen.findByText("Sổ tay thiết kế");

    expect(screen.getByRole("button", { name: "Thêm Sổ tay thiết kế vào giỏ" })).toBeDisabled();
  });
});
