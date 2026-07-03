import type { Product, ProductsApiResponse } from '../types/product';

const API_BASE_URL = 'https://dummyjson.com';

export async function getProducts(): Promise<ProductsApiResponse> {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error('Failed to load products.');
  }

  return response.json();
}

export async function getProductById(productId: number): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`);

  if (!response.ok) {
    throw new Error('Failed to load product details.');
  }

  return response.json();
}