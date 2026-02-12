/**
 * Successful API response wrapper.
 * @template T - The type of data returned
 */
export interface ApiResponse<T> {
    success: true;
    data: T;
}

/**
 * Error details returned when an API request fails.
 */
export interface ApiError {
    code: string;
    message: string;
    details?: unknown;
}

/**
 * Failed API response wrapper.
 */
export interface ApiErrorResponse {
    success: false;
    error: ApiError;
}

/**
 * Union type for both possible API responses.
 */
export type ApiResult<T> = ApiResponse<T> | ApiErrorResponse;

/**
 * Pagination metadata for list endpoints.
 */
export interface Pagination {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

/**
 * Paginated data structure containing items and pagination metadata.
 * @template T - The type of items in the list
 */
export interface PaginatedData<T> {
    items: T[];
    pagination: Pagination;
}

/**
 * Successful API response containing paginated data.
 * @template T - The type of items in the paginated list
 */
export type PaginatedResponse<T> = ApiResponse<PaginatedData<T>>;