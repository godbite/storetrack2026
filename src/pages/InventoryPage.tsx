import { useState, useEffect } from "react";
import {
  VStack,
  Heading,
  Box,
  Text,
  Spinner,
  Alert,
  Button,
  HStack,
  Container,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { ProductTable } from "@/components/inventory/ProductTable";
import { ProductFilters } from "@/components/inventory/ProductFilters";
import { ProductSearch } from "@/components/inventory/ProductSearch";
import type { SortBy, SortOrder } from "@/types/product";
import type { Product } from "@/types/product";

export const InventoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState<SortBy | "">("");
  const [order, setOrder] = useState<SortOrder>("asc");
  const [skip, setSkip] = useState(0);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const limit = 20;

  // Use API search for efficiency, but filter results by product name only client-side
  const { data, loading, error } = useProducts({
    limit: searchQuery ? 100 : limit, // Fetch more when searching to ensure we get enough name matches
    skip,
    category: selectedCategory || undefined,
    search: searchQuery || undefined,
    sortBy: sortBy || undefined,
    order: sortBy ? order : undefined,
  });

  // Reset products when filters change
  useEffect(() => {
    setAllProducts([]);
    setSkip(0);
  }, [searchQuery, sortBy, order, selectedCategory]);

  // Filter products by name only when search query exists
  const filterProductsByName = (
    products: Product[],
    searchTerm: string
  ): Product[] => {
    if (!searchTerm.trim()) return products;

    const searchLower = searchTerm.toLowerCase().trim();
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchLower)
    );
  };

  // Accumulate products when new data arrives
  useEffect(() => {
    if (data?.products) {
      // Filter products by name if search query exists
      const filtered = searchQuery
        ? filterProductsByName(data.products, searchQuery)
        : data.products;

      if (skip === 0) {
        setAllProducts(filtered);
      } else {
        setAllProducts((prev) => [...prev, ...filtered]);
      }
    }
  }, [data, skip, searchQuery]);

  const { data: categories } = useCategories();

  const handleLoadMore = () => {
    setSkip((prev) => prev + limit);
  };

  const handleReset = () => {
    setSkip(0);
    setSearchQuery("");
    setSelectedCategory("");
    setSortBy("");
    setOrder("asc");
  };

  if (loading && !data) {
    return (
      <Container maxW="container.xl" py={12}>
        <Flex justify="center" align="center" minH="60vh">
          <VStack gap={4}>
            <Spinner size="xl" color="purple.500" />
            <Text color="whiteAlpha.700" fontSize="sm">
              Loading products...
            </Text>
          </VStack>
        </Flex>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={12}>
        <Alert.Root
          status="error"
          bg="red.900"
          color="white"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="red.700"
        >
          <Alert.Indicator />
          <Alert.Title fontWeight="medium">{error.message}</Alert.Title>
        </Alert.Root>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack align="stretch" gap={8}>
        {/* Header Section */}
        <Box>
          <Flex align="center" gap={3} mb={2}>
            <Heading
              size="2xl"
              color="white"
              fontWeight="bold"
              letterSpacing="tight"
            >
              All Products
            </Heading>
            {data?.total !== undefined && (
              <Badge
                colorScheme="purple"
                fontSize="md"
                px={3}
                py={1}
                borderRadius="full"
                bg="purple.600"
              >
                {data.total}
              </Badge>
            )}
          </Flex>
          <Text color="whiteAlpha.600" fontSize="md">
            Browse and manage your product inventory
          </Text>
        </Box>

        {/* Search and Filters Section */}
        <Box
          bg="whiteAlpha.50"
          borderRadius="xl"
          p={6}
          borderWidth="1px"
          borderColor="whiteAlpha.100"
          backdropFilter="blur(10px)"
        >
          <VStack align="stretch" gap={5}>
            <ProductSearch onSearch={setSearchQuery} isLoading={loading} />

            {categories && (
              <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                sortBy={sortBy}
                onSortByChange={(sb) => {
                  setSortBy(sb);
                  setSkip(0);
                }}
                order={order}
                onOrderChange={(o) => {
                  setOrder(o);
                  setSkip(0);
                }}
                isLoading={loading}
              />
            )}
          </VStack>
        </Box>

        {/* Results Info */}
        {allProducts.length > 0 && (
          <Flex justify="space-between" align="center" px={1}>
            <Text fontSize="sm" color="whiteAlpha.700" fontWeight="medium">
              Showing{" "}
              <Text as="span" color="purple.300" fontWeight="bold">
                {allProducts.length}
              </Text>{" "}
              {searchQuery ? (
                <>
                  product{allProducts.length !== 1 ? "s" : ""} matching "
                  {searchQuery}"
                </>
              ) : (
                <>
                  of{" "}
                  <Text as="span" color="purple.300" fontWeight="bold">
                    {data?.total || 0}
                  </Text>{" "}
                  products
                </>
              )}
            </Text>
            {(searchQuery || sortBy || selectedCategory) && (
              <Button
                size="sm"
                onClick={handleReset}
                variant="ghost"
                color="whiteAlpha.700"
                _hover={{ bg: "whiteAlpha.100", color: "white" }}
              >
                Clear Filters
              </Button>
            )}
          </Flex>
        )}

        {/* Empty State */}
        {((data && data.products.length === 0) ||
          (searchQuery && allProducts.length === 0 && !loading)) && (
          <Box
            bg="whiteAlpha.50"
            borderRadius="xl"
            p={12}
            textAlign="center"
            borderWidth="1px"
            borderColor="whiteAlpha.100"
            borderStyle="dashed"
          >
            <VStack gap={3}>
              <Box fontSize="4xl" color="whiteAlpha.400" mb={2}>
                📦
              </Box>
              <Heading size="md" color="white">
                No Products Found
              </Heading>
              <Text color="whiteAlpha.600" maxW="md">
                We couldn't find any products matching your criteria. Try
                adjusting your filters or search query.
              </Text>
              {(searchQuery || sortBy || selectedCategory) && (
                <Button
                  mt={4}
                  onClick={handleReset}
                  colorScheme="purple"
                  bg="purple.600"
                  _hover={{ bg: "purple.700" }}
                >
                  Reset Filters
                </Button>
              )}
            </VStack>
          </Box>
        )}

        {/* Product Table */}
        {allProducts.length > 0 && (
          <Box
            bg="whiteAlpha.50"
            borderRadius="xl"
            overflow="hidden"
            borderWidth="1px"
            borderColor="whiteAlpha.100"
          >
            <ProductTable products={allProducts} />
          </Box>
        )}

        {/* Load More Section */}
        {data && data.skip + data.limit < data.total && (
          <Flex justify="center" pt={4}>
            <HStack gap={3}>
              <Button
                onClick={handleLoadMore}
                loading={loading}
                size="lg"
                colorScheme="purple"
                bg="purple.600"
                color="white"
                px={8}
                _hover={{ bg: "purple.700", transform: "translateY(-2px)" }}
                _active={{ transform: "translateY(0)" }}
                transition="all 0.2s"
                boxShadow="lg"
              >
                Load More Products
              </Button>
            </HStack>
          </Flex>
        )}
      </VStack>
    </Container>
  );
};
