import type {
  ApiResult,
  RequestInterceptor,
  RequestOptions,
  ResponseInterceptorError,
  ResponseInterceptorSuccess,
} from "./types.ts";

class HttpService {
  private _requestInterceptors: Set<RequestInterceptor> = new Set();
  private _responseInterceptorsSuccess: Set<ResponseInterceptorSuccess> =
    new Set();
  private _responseInterceptorsError: Set<ResponseInterceptorError> = new Set();

  /**
   * Adds a request interceptor.
   *
   * @param interceptor The function to intercept the request configuration.
   * @returns A function to unregister this interceptor.
   */
  public addRequestInterceptor(interceptor: RequestInterceptor): () => void {
    this._requestInterceptors.add(interceptor);

    return () => {
      this._requestInterceptors.delete(interceptor);
    };
  }

  /**
   * Adds a response interceptor for successful responses.
   *
   * @param interceptor The function to intercept the successful response.
   * @returns A function to unregister this interceptor.
   */
  public addResponseInterceptorSuccess(
    interceptor: ResponseInterceptorSuccess,
  ): () => void {
    this._responseInterceptorsSuccess.add(interceptor);

    return () => {
      this._responseInterceptorsSuccess.delete(interceptor);
    };
  }

  /**
   * Adds a response interceptor for error responses.
   *
   * @param interceptor The function to intercept the error response.
   * @returns A function to unregister this interceptor.
   */
  public addResponseInterceptorError(
    interceptor: ResponseInterceptorError,
  ): () => void {
    this._responseInterceptorsError.add(interceptor);

    return () => {
      this._responseInterceptorsError.delete(interceptor);
    };
  }

  public async request<T>(
    url: string,
    options: RequestOptions = {},
  ): Promise<ApiResult<T>> {
    const { headers, data, ...rest } = options;

    let config: RequestInit = {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
    };

    // Handle request body based on the 'data' provided
    if (data) {
      if (data instanceof FormData) {
        config.body = data;

        // When FormData is used, 'Content-Type' header should not be set manually,
        // as the browser will set it correctly (e.g., multipart/form-data)
        delete (config.headers as Record<string, string>)["Content-Type"];
      } else if (typeof data === "object") {
        config.body = JSON.stringify(data);
      } else if (typeof data === "string") {
        config.body = data;
      }
    }

    try {
      for (const interceptor of this._requestInterceptors) {
        config = await Promise.resolve(interceptor(config));
      }
    } catch (interceptorError) {
      // If a request interceptor throws an error, the request should not proceed.
      return {
        success: false,
        message:
          interceptorError instanceof Error
            ? interceptorError.message
            : "Request interceptor failed",
        error: interceptorError,
      };
    }

    try {
      let response = await fetch(url, config);

      for (const interceptor of this._responseInterceptorsSuccess) {
        response = await Promise.resolve(interceptor(response));
      }

      if (!response.ok) {
        type PotentialResponseBody =
          | {
              message?: string;
            }
          | string;

        let errorMessage = `HTTP error! Status: ${response.status}`;
        let errorDetails: PotentialResponseBody;

        try {
          errorDetails = (await response.json()) as PotentialResponseBody;
          errorMessage =
            (typeof errorDetails === "object" && errorDetails.message) ||
            errorMessage;
        } catch {
          errorDetails = await response.text();
          errorMessage = `HTTP error! Status: ${response.status}. Details: ${errorDetails || response.statusText}`;
        }

        const apiError: ApiResult<T> = {
          success: false,
          message: errorMessage,
          status: response.status,
          statusText: response.statusText,
          error: errorDetails,
        };

        try {
          for (const interceptor of this._responseInterceptorsError) {
            // Interceptors can transform or re-throw the error
            const handledError = await Promise.resolve(interceptor(apiError));

            if (handledError.success) {
              // If an error interceptor successfully handles the error (e.g., retries),
              // it might return a success result.
              return handledError as ApiResult<T>;
            } else {
              // If it still returns an error, continue or return it
              return handledError as ApiResult<T>;
            }
          }
        } catch (interceptorError) {
          // If an error interceptor itself throws an error
          return {
            success: false,
            message:
              interceptorError instanceof Error
                ? interceptorError.message
                : "Response error interceptor failed",
            error: interceptorError,
          };
        }

        // If no error interceptor handles it, return the original API error
        return apiError;
      }

      // Attempt to parse response as JSON. If it fails, return text or null
      let responseData: T;

      try {
        responseData = (await response.json()) as T;
      } catch {
        responseData = (await response.text()) as T;

        if (response.status === 204) responseData = null as T;
      }

      return {
        success: true,
        data: responseData,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      // Network errors or issues before the request is even sent
      const networkError: ApiResult<T> = {
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
        error,
      };

      try {
        for (const interceptor of this._responseInterceptorsError) {
          const handledError = await Promise.resolve(interceptor(networkError));

          if (handledError.success) {
            return handledError as ApiResult<T>;
          } else {
            return handledError as ApiResult<T>;
          }
        }
      } catch (interceptorError) {
        return {
          success: false,
          message:
            interceptorError instanceof Error
              ? interceptorError.message
              : "Response error interceptor failed",
          error: interceptorError,
        };
      }

      // If no error interceptor handles it, return the original network error
      return networkError;
    }
  }

  public get<T>(url: string, options?: RequestOptions): Promise<ApiResult<T>> {
    return this.request<T>(url, { ...options, method: "GET" });
  }

  public post<T>(
    url: string,
    data?: Record<string, unknown> | FormData | string,
    options?: RequestOptions,
  ): Promise<ApiResult<T>> {
    return this.request<T>(url, { ...options, method: "POST", data });
  }

  public put<T>(
    url: string,
    data?: Record<string, unknown> | FormData | string,
    options?: RequestOptions,
  ): Promise<ApiResult<T>> {
    return this.request<T>(url, { ...options, method: "PUT", data });
  }

  public del<T>(url: string, options?: RequestOptions): Promise<ApiResult<T>> {
    return this.request<T>(url, { ...options, method: "DELETE" });
  }
}

export const http = new HttpService();
