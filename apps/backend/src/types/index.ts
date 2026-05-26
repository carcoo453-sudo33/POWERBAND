export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    statusCode: number;
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  skip?: number;
}

export interface AuthPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export type UserRole = 'admin' | 'user' | 'vendor';
