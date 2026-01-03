import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  SimpleGrid,
  Card,
  Image,
  VStack,
  Text,
  Spinner,
  Box,
  Heading,
  Input,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useCategories } from "@/hooks/useCategories";
import { getCategoryProducts } from "@/utils/api";
import { useDebounce } from "@/hooks/useDebounce";
import type { Category } from "@/types/product";

export const CategoryGrid = () => {
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>(
    {}
  );
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (!categories || categories.length === 0) return;

    const fetchImages = async () => {
      const imagePromises = categories.map(async (category) => {
        setLoadingImages((prev) => ({ ...prev, [category.slug]: true }));
        try {
          const data = await getCategoryProducts(category.slug, 1, 0);
          if (data && data.products.length > 0) {
            setCategoryImages((prev) => ({
              ...prev,
              [category.slug]: data.products[0].thumbnail,
            }));
          }
        } catch (error) {
          console.error(
            `Failed to fetch image for category ${category.slug}:`,
            error
          );
        } finally {
          setLoadingImages((prev) => ({ ...prev, [category.slug]: false }));
        }
      });

      await Promise.all(imagePromises);
    };

    fetchImages();
  }, [categories]);

  if (categoriesLoading) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="lg" color="purple.400" />
      </Box>
    );
  }

  if (categoriesError || !categories) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="red.400">Failed to load categories</Text>
      </Box>
    );
  }

  // Filter categories based on search term
  const filteredCategories = categories.filter((category: Category) => {
    if (!debouncedSearchTerm.trim()) return true;
    const searchLower = debouncedSearchTerm.toLowerCase();
    return (
      category.name.toLowerCase().includes(searchLower) ||
      category.slug.toLowerCase().includes(searchLower)
    );
  });

  return (
    <VStack align="stretch" gap={6}>
      <VStack align="stretch" gap={4}>
        <Heading size="xl" color="white" fontWeight="bold">
          Product Categories
        </Heading>

        {/* Search Bar */}
        <Box position="relative">
          <Box
            position="absolute"
            left={3}
            top="50%"
            transform="translateY(-50%)"
            zIndex={1}
          >
            <FaSearch color="white" opacity={0.7} />
          </Box>
          <Input
            placeholder="Search categories by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg="whiteAlpha.100"
            backdropFilter="blur(10px)"
            border="1px"
            borderColor="whiteAlpha.200"
            color="white"
            _placeholder={{ color: "whiteAlpha.600" }}
            pl={10}
            _focus={{
              borderColor: "purple.400",
              boxShadow: "0 0 0 1px var(--chakra-colors-purple-400)",
            }}
            _hover={{ borderColor: "whiteAlpha.300" }}
          />
        </Box>
      </VStack>

      {filteredCategories.length === 0 ? (
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
              🔍
            </Box>
            <Heading size="md" color="white">
              No Categories Found
            </Heading>
            <Text color="whiteAlpha.600" maxW="md">
              We couldn't find any categories matching "{debouncedSearchTerm}".
              Try a different search term.
            </Text>
          </VStack>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 2, sm: 3, lg: 4 }} gap={4}>
          {filteredCategories.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              style={{ textDecoration: "none" }}
            >
              <Card.Root
                bg="whiteAlpha.100"
                backdropFilter="blur(10px)"
                border="1px"
                borderColor="whiteAlpha.200"
                shadow="xl"
                _hover={{
                  transform: "translateY(-4px)",
                  shadow: "2xl",
                  borderColor: "purple.400",
                }}
                transition="all 0.2s"
                cursor="pointer"
                height="100%"
              >
                <Card.Body p={0}>
                  <Box
                    position="relative"
                    height="200px"
                    bg="whiteAlpha.50"
                    overflow="hidden"
                  >
                    {loadingImages[category.slug] ? (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                      >
                        <Spinner color="purple.400" />
                      </Box>
                    ) : categoryImages[category.slug] ? (
                      <Image
                        src={categoryImages[category.slug]}
                        alt={category.name}
                        width="100%"
                        height="100%"
                        objectFit="contain"
                        objectPosition="center"
                        p={4}
                      />
                    ) : (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                        color="whiteAlpha.500"
                      >
                        <Text>No Image</Text>
                      </Box>
                    )}
                  </Box>
                  <VStack p={4} align="stretch">
                    <Text
                      fontWeight="bold"
                      fontSize="lg"
                      textAlign="center"
                      color="white"
                    >
                      {category.name}
                    </Text>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </Link>
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};
