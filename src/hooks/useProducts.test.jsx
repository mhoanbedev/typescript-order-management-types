import { act, renderHook, waitFor } from "@testing-library/react";
import { useProducts } from "./useProducts.jsx";
import { testProducts } from "../test/fixtures.jsx";

describe("useProducts", () => {
  test("chuyển từ loading sang success khi tải thành công", async () => {
    const loader = jest.fn().mockResolvedValue(testProducts);
    const { result } = renderHook(() => useProducts(loader));

    expect(result.current.status).toBe("loading");
    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.products).toEqual(testProducts);
    expect(result.current.error).toBe("");
  });

  test("lưu thông báo lỗi khi tải thất bại", async () => {
    const loader = jest.fn().mockRejectedValue(new Error("Mất kết nối"));
    const { result } = renderHook(() => useProducts(loader));

    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.error).toBe("Mất kết nối");
  });

  test("dùng thông báo mặc định khi lỗi không có message", async () => {
    const loader = jest.fn().mockRejectedValue({ name: "NetworkError" });
    const { result } = renderHook(() => useProducts(loader));

    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.error).toBe("Đã có lỗi xảy ra");
  });

  test("retry gọi lại loader sau một lần thất bại", async () => {
    const loader = jest
      .fn()
      .mockRejectedValueOnce(new Error("Lỗi tạm thời"))
      .mockResolvedValueOnce(testProducts);
    const { result } = renderHook(() => useProducts(loader));
    await waitFor(() => expect(result.current.status).toBe("error"));

    act(() => result.current.retry());

    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(loader).toHaveBeenCalledTimes(2);
  });

  test("hủy request khi component unmount", () => {
    let receivedSignal;
    const loader = jest.fn(({ signal }) => {
      receivedSignal = signal;
      return new Promise(() => {});
    });
    const { unmount } = renderHook(() => useProducts(loader));

    unmount();

    expect(receivedSignal.aborted).toBe(true);
  });
});
