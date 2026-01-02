import { useState, useEffect } from "react";
import { getCategoryProducts } from "@/utils/api";
import type { ProductsResponse } from "@/types/product";

export const useCategoryProducts = (
  category: string | null,
  limit: number = 30,
  skip: number = 0
) => {
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!category) return;

    const fetchCategoryProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getCategoryProducts(category, limit, skip);
        setData(response);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch category products")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category, limit, skip]);

  return { data, loading, error };
};
