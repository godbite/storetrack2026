export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const formatStockStatus = (stock: number, availabilityStatus?: string): string => {
  if (stock === 0) return 'Out of Stock';
  if (stock < 10) return 'Low Stock';
  if (availabilityStatus) return availabilityStatus;
  return 'In Stock';
};

export const getStockStatusColor = (stock: number): string => {
  if (stock === 0) return 'red';
  if (stock < 10) return 'orange';
  return 'green';
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatCategoryName = (category: string): string => {
  return category
    .split('-')
    .map((word) => capitalizeFirst(word))
    .join(' ');
};

