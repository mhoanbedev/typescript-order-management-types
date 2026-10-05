import { useCallback, useEffect, useState } from "react";
import { fetchDemoProducts } from "../api/productsApi.jsx";

export function useProducts(loader = fetchDemoProducts) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState(0);

  const retry = useCallback(() => {
    setRequestId((current) => current + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setError("");

    loader({ signal: controller.signal })
      .then((data) => {
        setProducts(data);
        setStatus("success");
      })
      .catch((reason) => {
        if (reason.name !== "AbortError") {
          setError(reason.message || "Đã có lỗi xảy ra");
          setStatus("error");
        }
      });

    return () => controller.abort();
  }, [loader, requestId]);

  return { products, status, error, retry };
}
