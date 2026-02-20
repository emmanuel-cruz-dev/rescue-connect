export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T> {
  status: string;
  message?: string;
  data: T;
  error?: string;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T> {
  pagination: Pagination;
}
