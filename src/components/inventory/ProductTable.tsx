import { useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Badge,
  SimpleGrid,
  useBreakpointValue,
  Table,
} from "@chakra-ui/react";
import type { Product } from "@/types/product";
import {
  formatPrice,
  formatStockStatus,
  getStockStatusColor,
} from "@/utils/formatters";
import { ProductCard } from "./ProductCard";

interface ProductTableProps {
  products: Product[];
  viewMode?: "table" | "grid";
}

export const ProductTable = ({
  products,
  viewMode = "table",
}: ProductTableProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  if (viewMode === "grid" || isMobile) {
    return (
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={4}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <Box
      bg="whiteAlpha.100"
      backdropFilter="blur(10px)"
      borderRadius="md"
      shadow="xl"
      border="1px"
      borderColor="whiteAlpha.200"
      overflow="hidden"
    >
      <Table.Root variant="outline" size="sm">
        <Table.Header bg="whiteAlpha.100">
          <Table.Row>
            <Table.ColumnHeader color="white" fontWeight="bold">
              Image
            </Table.ColumnHeader>
            <Table.ColumnHeader color="white" fontWeight="bold">
              Name
            </Table.ColumnHeader>
            <Table.ColumnHeader color="white" fontWeight="bold">
              Price
            </Table.ColumnHeader>
            <Table.ColumnHeader color="white" fontWeight="bold">
              Brand
            </Table.ColumnHeader>
            <Table.ColumnHeader color="white" fontWeight="bold">
              Category
            </Table.ColumnHeader>
            <Table.ColumnHeader color="white" fontWeight="bold">
              Stock Status
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products.map((product) => {
            const stockColor = getStockStatusColor(product.stock);
            const stockStatus = formatStockStatus(
              product.stock,
              product.availabilityStatus
            );

            return (
              <Table.Row
                key={product.id}
                _hover={{ bg: "whiteAlpha.100" }}
                cursor="pointer"
                transition="background 0.2s"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <Table.Cell>
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    boxSize="50px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Text fontWeight="medium" color="white">
                    {product.title}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text fontWeight="bold" color="purple.400">
                    {formatPrice(product.price)}
                  </Text>
                </Table.Cell>
                <Table.Cell color="whiteAlpha.800">{product.brand}</Table.Cell>
                <Table.Cell color="whiteAlpha.800">
                  {product.category}
                </Table.Cell>
                <Table.Cell>
                  <Badge colorScheme={stockColor}>{stockStatus}</Badge>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};
