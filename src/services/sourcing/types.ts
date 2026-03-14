export interface SourcingRequest {
  productName: string;
  quantity: number;
  unit: string;
  expectedPrice: number | null;
  deadline: string;
  requirements: string | null;
}

export interface SourcingRequestResponse {
  id: string;
  productName: string;
  quantity: number;
  unit: string;
  expectedPrice: number | null;
  deadline: string;
  requirements: string | null;
  status: 'OPEN' | 'CLOSED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface SearchParams {
  productName?: string;
  status?: 'OPEN' | 'CLOSED' | 'CANCELLED';
  page?: number;
  size?: number;
  sortBy?: 'createdAt' | 'deadline' | 'quantity';
  sortDirection?: 'ASC' | 'DESC';
}

export interface FilterParams {
  page?: number;
  size?: number;
  productName?: string;
  status?: string;
  createdBy?: string;
}

export interface UpdateStatusRequest {
  status: 'OPEN' | 'CLOSED' | 'CANCELLED';
}

export interface ApiError {
  error: string;
  message: string;
  timestamp: string;
  path: string;
}

export interface CreateSourcingRequestForm {
  productName: string;
  quantity: string;
  unit: string;
  expectedPrice: string;
  deadline: string;
  requirements: string;
}

export interface SimpleResponse {
  message: string;
  status: string;
}
