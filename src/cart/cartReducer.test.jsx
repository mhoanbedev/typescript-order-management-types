import {
  CART_ACTIONS,
  cartReducer,
  getCartCount,
  getCartSubtotal,
  getShippingFee,
  initialCartState,
} from "./cartReducer.jsx";

const headphone = {
  id: 1,
  name: "Tai nghe Bluetooth Pro",
  price: 590000,
  stock: 2,
};
const bottle = {
  id: 2,
  name: "Bình nước thể thao",
  price: 180000,
  stock: 3,
};

describe("cartReducer", () => {
  test("thêm sản phẩm mới vào giỏ với số lượng 1", () => {
    const result = cartReducer(initialCartState, {
      type: CART_ACTIONS.ADD,
      payload: headphone,
    });

    expect(result.items).toEqual([{ ...headphone, quantity: 1 }]);
  });

  test("tăng số lượng khi thêm sản phẩm đã có", () => {
    const state = { items: [{ ...headphone, quantity: 1 }] };
    const result = cartReducer(state, {
      type: CART_ACTIONS.ADD,
      payload: headphone,
    });

    expect(result.items[0].quantity).toBe(2);
  });

  test("không tăng số lượng vượt quá tồn kho", () => {
    const state = { items: [{ ...headphone, quantity: 2 }] };
    const result = cartReducer(state, {
      type: CART_ACTIONS.ADD,
      payload: headphone,
    });

    expect(result).toBe(state);
  });

  test("không thêm sản phẩm đã hết hàng", () => {
    const outOfStock = { ...headphone, stock: 0 };
    const result = cartReducer(initialCartState, {
      type: CART_ACTIONS.ADD,
      payload: outOfStock,
    });

    expect(result).toBe(initialCartState);
  });

  test("giảm số lượng sản phẩm lớn hơn 1", () => {
    const state = { items: [{ ...headphone, quantity: 2 }] };
    const result = cartReducer(state, {
      type: CART_ACTIONS.DECREASE,
      payload: headphone.id,
    });

    expect(result.items[0].quantity).toBe(1);
  });

  test("xóa sản phẩm khi giảm số lượng từ 1", () => {
    const state = { items: [{ ...headphone, quantity: 1 }] };
    const result = cartReducer(state, {
      type: CART_ACTIONS.DECREASE,
      payload: headphone.id,
    });

    expect(result.items).toEqual([]);
  });

  test("giữ nguyên state khi giảm một sản phẩm không tồn tại", () => {
    const state = { items: [{ ...headphone, quantity: 1 }] };
    const result = cartReducer(state, {
      type: CART_ACTIONS.DECREASE,
      payload: 999,
    });

    expect(result).toBe(state);
  });

  test("xóa đúng sản phẩm được chọn", () => {
    const state = {
      items: [
        { ...headphone, quantity: 1 },
        { ...bottle, quantity: 1 },
      ],
    };
    const result = cartReducer(state, {
      type: CART_ACTIONS.REMOVE,
      payload: headphone.id,
    });

    expect(result.items).toEqual([{ ...bottle, quantity: 1 }]);
  });

  test("xóa toàn bộ giỏ hàng", () => {
    const state = { items: [{ ...headphone, quantity: 1 }] };
    const result = cartReducer(state, { type: CART_ACTIONS.CLEAR });

    expect(result).toEqual(initialCartState);
  });

  test("giữ nguyên state với action không xác định", () => {
    const state = { items: [{ ...headphone, quantity: 1 }] };

    expect(cartReducer(state, { type: "unknown" })).toBe(state);
  });
});
describe("các selector của giỏ hàng", () => {
  const items = [
    { ...headphone, quantity: 2 },
    { ...bottle, quantity: 3 },
  ];

  test("tính tổng số lượng sản phẩm", () => {
    expect(getCartCount(items)).toBe(5);
  });

  test("tính đúng tạm tính", () => {
    expect(getCartSubtotal(items)).toBe(1720000);
  });

  test.each([
    [0, 0],
    [499999, 30000],
    [500000, 0],
  ])("tính phí giao hàng cho tạm tính %i", (subtotal, expected) => {
    expect(getShippingFee(subtotal)).toBe(expected);
  });
});
