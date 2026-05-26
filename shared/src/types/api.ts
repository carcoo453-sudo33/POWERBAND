// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    statusCode: number;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    statusCode: number;
    stack?: string;
  };
}

// Pagination Types
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// Auth Types
export interface AuthPayload {
  id: string;
  email: string;
  role: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
    role: string;
  };
  token: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  inStock: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  products: Product[];
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  productIds: string[];
  total: number;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface CreateReviewRequest {
  productId: string;
  rating: number;
  comment?: string;
}
