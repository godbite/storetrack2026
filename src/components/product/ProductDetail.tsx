import { useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Badge,
  Button,
  SimpleGrid,
  Separator,
  Stack,
} from "@chakra-ui/react";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import type { Product } from "@/types/product";
import {
  formatPrice,
  formatStockStatus,
  getStockStatusColor,
  formatCategoryName,
} from "@/utils/formatters";

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const navigate = useNavigate();
  const stockColor = getStockStatusColor(product.stock);
  const stockStatus = formatStockStatus(product.stock, product.availabilityStatus);

  return (
    <VStack align="stretch" gap={6}>
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        alignSelf="flex-start"
        color="white"
        _hover={{ bg: "whiteAlpha.100" }}
      >
        <FaArrowLeft style={{ marginRight: "8px" }} />
        Back
      </Button>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
        {/* Product Images */}
        <Box>
          <Image
            src={product.images[0] || product.thumbnail}
            alt={product.title}
            borderRadius="md"
            width="100%"
            maxH="500px"
            objectFit="contain"
            bg="whiteAlpha.100"
            backdropFilter="blur(10px)"
            p={4}
            border="1px"
            borderColor="whiteAlpha.200"
          />
          {product.images.length > 1 && (
            <SimpleGrid columns={4} gap={2} mt={4}>
              {product.images.slice(1, 5).map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 2}`}
                  borderRadius="md"
                  cursor="pointer"
                  _hover={{ opacity: 0.8 }}
                  border="1px"
                  borderColor="whiteAlpha.200"
                />
              ))}
            </SimpleGrid>
          )}
        </Box>

        {/* Product Info */}
        <VStack align="stretch" gap={4}>
          <VStack align="stretch" gap={2}>
            <Heading size="xl" color="white">
              {product.title}
            </Heading>
            <HStack>
              <Badge bg="blue.600" color="white">
                {formatCategoryName(product.category)}
              </Badge>
              <Badge bg="purple.600" color="white">
                {product.brand}
              </Badge>
              <Badge colorScheme={stockColor}>{stockStatus}</Badge>
            </HStack>
          </VStack>

          <Separator borderColor="whiteAlpha.200" />

          <VStack align="stretch" gap={3}>
            <HStack>
              <Text fontSize="3xl" fontWeight="bold" color="purple.400">
                {formatPrice(product.price)}
              </Text>
              {product.discountPercentage > 0 && (
                <Badge bg="green.500" color="white" fontSize="md" p={1}>
                  {product.discountPercentage}% OFF
                </Badge>
              )}
            </HStack>

            <HStack gap={2}>
              <HStack gap={1}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < Math.floor(product.rating) ? "#FFD700" : "#4A5568"}
                  />
                ))}
              </HStack>
              <Text fontSize="sm" color="whiteAlpha.800">
                {product.rating} ({product.reviews.length} reviews)
              </Text>
            </HStack>

            <Text fontSize="sm" color="whiteAlpha.800">
              Stock: {product.stock} units
            </Text>
          </VStack>

          <Separator borderColor="whiteAlpha.200" />

          <VStack align="stretch" gap={2}>
            <Heading size="md" color="white">
              Description
            </Heading>
            <Text color="whiteAlpha.800" lineHeight="tall">
              {product.description}
            </Text>
          </VStack>

          <Separator borderColor="whiteAlpha.200" />

          <VStack align="stretch" gap={2}>
            <Heading size="md" color="white">
              Product Details
            </Heading>
            <Stack gap={2} fontSize="sm">
              <HStack justify="space-between">
                <Text fontWeight="medium" color="whiteAlpha.900">
                  SKU:
                </Text>
                <Text color="whiteAlpha.700">{product.sku}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="medium" color="whiteAlpha.900">
                  Weight:
                </Text>
                <Text color="whiteAlpha.700">{product.weight} kg</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="medium" color="whiteAlpha.900">
                  Dimensions:
                </Text>
                <Text color="whiteAlpha.700">
                  {product.dimensions.width} × {product.dimensions.height} ×{" "}
                  {product.dimensions.depth} cm
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="medium" color="whiteAlpha.900">
                  Warranty:
                </Text>
                <Text color="whiteAlpha.700">{product.warrantyInformation}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="medium" color="whiteAlpha.900">
                  Shipping:
                </Text>
                <Text color="whiteAlpha.700">{product.shippingInformation}</Text>
              </HStack>
            </Stack>
          </VStack>
        </VStack>
      </SimpleGrid>
    </VStack>
  );
};
