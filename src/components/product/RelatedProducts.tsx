import { VStack, Heading, SimpleGrid, Box, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getProducts } from "@/utils/api";
import { ProductCard } from "@/components/inventory/ProductCard";
import type { Product } from "@/types/product";

interface RelatedProductsProps {
  category: string;
  excludeProductId?: number;
}

export const RelatedProducts = ({
  category,
  excludeProductId,
}: RelatedProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!category) return;

      setLoading(true);
      setError(null);

      try {
        const allProducts: Product[] = [];
        let skip = 0;
        const limit = 30; // Fetch in batches
        const maxAttempts = 3; // Try up to 3 pages
        let attempts = 0;

        // Fetch products from multiple pages until we have at least 7 (to ensure 6 after filtering)
        while (allProducts.length < 7 && attempts < maxAttempts) {
          const response = await getProducts({
            category,
            limit,
            skip,
          });

          if (!response.products || response.products.length === 0) {
            break; // No more products available
          }

          allProducts.push(...response.products);

          // If we got fewer products than requested, we've reached the end
          if (response.products.length < limit) {
            break;
          }

          skip += limit;
          attempts++;
        }

        // Filter out the current product and take up to 6
        const filtered = allProducts
          .filter((p) => p.id !== excludeProductId)
          .slice(0, 6);

        setProducts(filtered);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch related products")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [category, excludeProductId]);

  if (loading) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="lg" />
      </Box>
    );
  }

  if (error || products.length === 0) {
    return null;
  }

  return (
    <VStack align="stretch" gap={4} mt={8}>
      <Heading size="lg" color="white">
        Browse Similar Products
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};
