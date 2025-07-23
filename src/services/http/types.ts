export type RequestOptions = Omit<RequestInit, "body"> & {
  data?: Record<string, unknown> | FormData | string;
};

export type ApiResponse<T> = {
  success: true;
  data: T;
  status: number;
  statusText: string;
};

export type ApiError = {
  success: false;
  message: string;
  status?: number;
  statusText?: string;
  error?: unknown;
};

export type ApiResult<T> = ApiResponse<T> | ApiError;

export type RequestInterceptor = (
  config: RequestInit,
) => RequestInit | Promise<RequestInit>;

export type ResponseInterceptorSuccess = (
  response: Response,
) => Response | Promise<Response>;

export type ResponseInterceptorError = (
  error: unknown,
) => Promise<ApiResult<unknown>> | ApiResult<unknown>;
