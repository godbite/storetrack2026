import { Link } from "react-router-dom";
import { Card, Image, VStack, HStack, Text, Badge } from "@chakra-ui/react";
import type { Product } from "@/types/product";
import { formatPrice, formatStockStatus, getStockStatusColor } from "@/utils/formatters";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const stockColor = getStockStatusColor(product.stock);
  const stockStatus = formatStockStatus(product.stock, product.availabilityStatus);

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
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
          <Image
            src={product.thumbnail}
            alt={product.title}
            width="100%"
            height="200px"
            objectFit="cover"
            borderTopRadius="md"
          />
          <VStack align="stretch" p={4} gap={2}>
            <Text
              fontWeight="bold"
              fontSize="lg"
              color="white"
              overflow="hidden"
              textOverflow="ellipsis"
              display="-webkit-box"
              style={{ WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
            >
              {product.title}
            </Text>
            <HStack justify="space-between">
              <Text fontSize="xl" fontWeight="bold" color="purple.400">
                {formatPrice(product.price)}
              </Text>
              {product.discountPercentage > 0 && (
                <Badge bg="green.500" color="white">
                  {product.discountPercentage}% OFF
                </Badge>
              )}
            </HStack>
            <HStack justify="space-between" fontSize="sm" color="whiteAlpha.700">
              <Text>{product.brand}</Text>
              <Text>{product.category}</Text>
            </HStack>
            <HStack justify="space-between">
              <Badge colorScheme={stockColor}>{stockStatus}</Badge>
              <Text fontSize="sm" color="whiteAlpha.700">
                Stock: {product.stock}
              </Text>
            </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Link>
  );
};
