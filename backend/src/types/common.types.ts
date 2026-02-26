interface IPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: IPagination;
}
