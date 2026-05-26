// Export all types from the shared package
export * from './types/api';

// Constants
export const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001';
export const API_ROUTES = {
  AUTH: '/api/auth',
  PRODUCTS: '/api/products',
  USERS: '/api/users',
  ORDERS: '/api/orders',
  REVIEWS: '/api/reviews',
};
