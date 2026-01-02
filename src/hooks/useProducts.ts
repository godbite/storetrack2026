import { useState, useEffect } from "react";
import {
  getProducts,
  searchProducts,
  type GetProductsParams,
} from "@/utils/api";
import type { ProductsResponse } from "@/types/product";

interface UseProductsOptions extends GetProductsParams {
  enabled?: boolean;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const { enabled = true, ...params } = options;
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let response: ProductsResponse;
        if (params.search) {
          response = await searchProducts(params.search, params.limit);
        } else {
          response = await getProducts(params);
        }
        setData(response);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch products")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    enabled,
    params.limit,
    params.skip,
    params.search,
    params.category,
    params.sortBy,
    params.order,
  ]);

  return {
    data,
    loading,
    error,
    refetch: () => {
      const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
          let response: ProductsResponse;
          if (params.search) {
            response = await searchProducts(params.search, params.limit);
          } else {
            response = await getProducts(params);
          }
          setData(response);
        } catch (err) {
          setError(
            err instanceof Error ? err : new Error("Failed to fetch products")
          );
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    },
  };
};
