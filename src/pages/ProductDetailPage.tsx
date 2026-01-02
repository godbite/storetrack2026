import { useParams } from 'react-router-dom';
import { VStack, Box, Spinner, Alert } from '@chakra-ui/react';
import { useProduct } from '@/hooks/useProduct';
import { ProductDetail } from '@/components/product/ProductDetail';
import { RelatedProducts } from '@/components/product/RelatedProducts';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : null;
  const { data: product, loading, error } = useProduct(productId);

  if (loading) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="lg" />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Title>{error?.message || 'Product not found'}</Alert.Title>
      </Alert.Root>
    );
  }

  return (
    <VStack align="stretch" gap={8}>
      <ProductDetail product={product} />
      <RelatedProducts category={product.category} excludeProductId={product.id} />
    </VStack>
  );
};
