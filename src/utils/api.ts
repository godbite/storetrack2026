import axios from 'axios';
import type { ProductsResponse, SingleProductResponse, Category, SortBy, SortOrder } from '@/types/product';

const API_BASE_URL = 'https://dummyjson.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface GetProductsParams {
  limit?: number;
  skip?: number;
  search?: string;
  category?: string;
  sortBy?: SortBy;
  order?: SortOrder;
  select?: string;
}

export const getProducts = async (params: GetProductsParams = {}): Promise<ProductsResponse> => {
  const { limit, skip, search, category, sortBy, order, select } = params;
  
  let url = '/products';
  const queryParams: string[] = [];
  
  if (search) {
    url = '/products/search';
    queryParams.push(`q=${encodeURIComponent(search)}`);
  } else if (category) {
    url = `/products/category/${category}`;
  }
  
  if (limit !== undefined) queryParams.push(`limit=${limit}`);
  if (skip !== undefined) queryParams.push(`skip=${skip}`);
  if (sortBy) queryParams.push(`sortBy=${sortBy}`);
  if (order) queryParams.push(`order=${order}`);
  if (select) queryParams.push(`select=${select}`);
  
  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`;
  }
  
  const response = await apiClient.get<ProductsResponse>(url);
  return response.data;
};

export const getProduct = async (id: number): Promise<SingleProductResponse> => {
  const response = await apiClient.get<SingleProductResponse>(`/products/${id}`);
  return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>('/products/categories');
  return response.data;
};

export const getCategoryList = async (): Promise<string[]> => {
  const response = await apiClient.get<string[]>('/products/category-list');
  return response.data;
};

export const getCategoryProducts = async (
  category: string,
  limit: number = 30,
  skip: number = 0
): Promise<ProductsResponse> => {
  const response = await apiClient.get<ProductsResponse>(
    `/products/category/${category}?limit=${limit}&skip=${skip}`
  );
  return response.data;
};

export const searchProducts = async (query: string, limit: number = 30): Promise<ProductsResponse> => {
  const response = await apiClient.get<ProductsResponse>(
    `/products/search?q=${encodeURIComponent(query)}&limit=${limit}`
  );
  return response.data;
};

