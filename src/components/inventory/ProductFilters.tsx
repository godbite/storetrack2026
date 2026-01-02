import { HStack, Box, Text } from "@chakra-ui/react";
import type { Category } from "@/types/product";
import type { SortBy, SortOrder } from "@/types/product";

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: SortBy | "";
  onSortByChange: (sortBy: SortBy) => void;
  order: SortOrder;
  onOrderChange: (order: SortOrder) => void;
  isLoading?: boolean;
}

export const ProductFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortByChange,
  order,
  onOrderChange,
  isLoading,
}: ProductFiltersProps) => {
  return (
    <Box mb={4}>
      <HStack gap={4} flexWrap="wrap">
        <Box flex="1" minW="200px">
          <Text mb={2} fontSize="sm" fontWeight="medium" color="whiteAlpha.900">
            Category
          </Text>
          <Box
            as="select"
            // @ts-ignore - Box as select doesn't have proper types
            value={selectedCategory}
            onChange={(e) =>
              onCategoryChange((e.target as HTMLSelectElement).value)
            }
            bg="whiteAlpha.100"
            backdropFilter="blur(10px)"
            border="1px"
            borderColor="whiteAlpha.200"
            borderRadius="md"
            px={3}
            py={2}
            width="100%"
            disabled={isLoading}
            color="white"
            _focus={{
              borderColor: "purple.400",
              boxShadow: "0 0 0 1px var(--chakra-colors-purple-400)",
            }}
            _hover={{ borderColor: "whiteAlpha.300" }}
            _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
          >
            <option value="" style={{ background: "#1a202c", color: "white" }}>
              All Categories
            </option>
            {categories.map((category) => (
              <option
                key={category.slug}
                value={category.slug}
                style={{ background: "#1a202c", color: "white" }}
              >
                {category.name}
              </option>
            ))}
          </Box>
        </Box>
        <Box flex="1" minW="200px">
          <Text mb={2} fontSize="sm" fontWeight="medium" color="whiteAlpha.900">
            Sort By
          </Text>
          <Box
            as="select"
            // @ts-ignore - Box as select doesn't have proper types
            value={sortBy}
            onChange={(e) =>
              onSortByChange((e.target as HTMLSelectElement).value as SortBy)
            }
            bg="whiteAlpha.100"
            backdropFilter="blur(10px)"
            border="1px"
            borderColor="whiteAlpha.200"
            borderRadius="md"
            px={3}
            py={2}
            width="100%"
            disabled={isLoading}
            color="white"
            _focus={{
              borderColor: "purple.400",
              boxShadow: "0 0 0 1px var(--chakra-colors-purple-400)",
            }}
            _hover={{ borderColor: "whiteAlpha.300" }}
            _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
          >
            <option value="" style={{ background: "#1a202c", color: "white" }}>
              None
            </option>
            <option value="title" style={{ background: "#1a202c", color: "white" }}>
              Name
            </option>
            <option value="price" style={{ background: "#1a202c", color: "white" }}>
              Price
            </option>
            <option value="rating" style={{ background: "#1a202c", color: "white" }}>
              Rating
            </option>
            <option value="stock" style={{ background: "#1a202c", color: "white" }}>
              Stock
            </option>
          </Box>
        </Box>
        <Box flex="1" minW="200px">
          <Text mb={2} fontSize="sm" fontWeight="medium" color="whiteAlpha.900">
            Order
          </Text>
          <Box
            as="select"
            // @ts-ignore - Box as select doesn't have proper types
            value={order}
            onChange={(e) =>
              onOrderChange((e.target as HTMLSelectElement).value as SortOrder)
            }
            bg="whiteAlpha.100"
            backdropFilter="blur(10px)"
            border="1px"
            borderColor="whiteAlpha.200"
            borderRadius="md"
            px={3}
            py={2}
            width="100%"
            disabled={isLoading || !sortBy}
            color="white"
            _focus={{
              borderColor: "purple.400",
              boxShadow: "0 0 0 1px var(--chakra-colors-purple-400)",
            }}
            _hover={{ borderColor: "whiteAlpha.300" }}
            _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
          >
            <option value="asc" style={{ background: "#1a202c", color: "white" }}>
              Ascending
            </option>
            <option value="desc" style={{ background: "#1a202c", color: "white" }}>
              Descending
            </option>
          </Box>
        </Box>
      </HStack>
    </Box>
  );
};
