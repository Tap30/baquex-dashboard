import type {
  ApiResult,
  DownloadOptions,
  DownloadProgressCallback,
  RequestInterceptor,
  RequestOptions,
  ResponseInterceptorError,
  ResponseInterceptorSuccess,
} from "./types.ts";

class HttpClient {
  public static requestInterceptors: Set<RequestInterceptor> = new Set();
  public static responseInterceptorsSuccess: Set<ResponseInterceptorSuccess> =
    new Set();
  public static responseInterceptorsError: Set<ResponseInterceptorError> =
    new Set();

  /**
   * Adds a request interceptor.
   *
   * @param interceptor The function to intercept the request configuration.
   * @returns A function to unregister this interceptor.
   */
  public addRequestInterceptor(interceptor: RequestInterceptor): () => void {
    HttpClient.requestInterceptors.add(interceptor);

    return () => {
      HttpClient.requestInterceptors.delete(interceptor);
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
    HttpClient.responseInterceptorsSuccess.add(interceptor);

    return () => {
      HttpClient.responseInterceptorsSuccess.delete(interceptor);
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
    HttpClient.responseInterceptorsError.add(interceptor);

    return () => {
      HttpClient.responseInterceptorsError.delete(interceptor);
    };
  }

  private async _extractErrorDetails(response: Response) {
    type PotentialResponseBody =
      | {
          message?: string;
        }
      | string;

    let errorMessage = `HTTP error! Status: ${response.status}`;
    let errorDetails: PotentialResponseBody;

    const resRef = response.clone();

    try {
      errorDetails = (await response.json()) as PotentialResponseBody;
      errorMessage =
        (typeof errorDetails === "object" && errorDetails.message) ||
        errorMessage;
    } catch {
      errorDetails = await resRef.text();
      errorMessage = `HTTP error! Status: ${response.status}. Details: ${errorDetails || response.statusText || "Something terrible happened!"}`;
    }

    return { message: errorMessage, details: errorDetails };
  }

  private async _handleFileStream(
    response: Response,
    onDownloadProgress?: DownloadProgressCallback,
  ): Promise<Blob | null> {
    const contentLength = response.headers.get("content-length");
    const total = contentLength ? parseInt(contentLength, 10) : 0;

    const reader = response.body?.getReader();
    const chunks: Uint8Array[] = [];

    let loaded = 0;

    if (!reader) return null;

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      chunks.push(value);
      loaded += value.length;

      onDownloadProgress?.({ loaded, total });
    }

    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const combined = new Uint8Array(totalLength);

    let offset = 0;

    for (const chunk of chunks) {
      combined.set(chunk, offset);
      offset += chunk.length;
    }

    return new Blob([combined], {
      type: response.headers.get("Content-Type") || "application/octet-stream",
    });
  }

  /**
   * Downloads a file from a URL.
   *
   * @param url The URL of the file to download.
   * @param options The download options, including headers and progress callback.
   * @returns A Promise that resolves with a success result containing the Blob, or an error result.
   */
  public async download(
    url: string,
    options: DownloadOptions = {},
  ): Promise<ApiResult<Blob>> {
    const { headers, onDownloadProgress, ...rest } = options;

    let config: RequestInit = {
      ...rest,
      headers,
      method: "GET",
    };

    try {
      for (const interceptor of HttpClient.requestInterceptors) {
        config = await Promise.resolve(interceptor(config));
      }
    } catch (interceptorError) {
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

      for (const interceptor of HttpClient.responseInterceptorsSuccess) {
        response = await Promise.resolve(interceptor(response));
      }

      if (!response.ok) {
        const errorDetails = await this._extractErrorDetails(response);

        const apiError: ApiResult<Blob> = {
          success: false,
          message: errorDetails.message,
          status: response.status,
          statusText: response.statusText,
          error: errorDetails.details,
        };

        for (const interceptor of HttpClient.responseInterceptorsError) {
          const handledError = await Promise.resolve(interceptor(apiError));

          if (handledError.success) {
            return handledError as ApiResult<Blob>;
          } else {
            return handledError as ApiResult<Blob>;
          }
        }

        return apiError;
      }

      const blob = await this._handleFileStream(response, onDownloadProgress);

      if (!blob) {
        return {
          success: false,
          message: "ReadableStream not available.",
        } satisfies ApiResult<Blob>;
      }

      return {
        success: true,
        data: blob,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      const networkError: ApiResult<Blob> = {
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
        error,
      };

      for (const interceptor of HttpClient.responseInterceptorsError) {
        const handledError = await Promise.resolve(interceptor(networkError));

        if (handledError.success) {
          return handledError as ApiResult<Blob>;
        } else {
          return handledError as ApiResult<Blob>;
        }
      }

      return networkError;
    }
  }

  /**
   * The core method for making HTTP requests.
   *
   * @param url The URL to send the request to.
   * @param options The request options.
   * @returns A Promise that resolves with a success result containing the data, or an error result.
   */
  protected async request<T>(
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
      for (const interceptor of HttpClient.requestInterceptors) {
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

      for (const interceptor of HttpClient.responseInterceptorsSuccess) {
        response = await Promise.resolve(interceptor(response));
      }

      if (!response.ok) {
        const errorDetails = await this._extractErrorDetails(response);

        const apiError: ApiResult<T> = {
          success: false,
          message: errorDetails.message,
          status: response.status,
          statusText: response.statusText,
          error: errorDetails,
        };

        try {
          for (const interceptor of HttpClient.responseInterceptorsError) {
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

      let responseData: T;
      const responseRef = response.clone();

      try {
        responseData = (await response.json()) as T;
      } catch {
        responseData = (await responseRef.text()) as T;

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
        for (const interceptor of HttpClient.responseInterceptorsError) {
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
    data?: Record<string, unknown> | FormData | string | File | Blob,
    options?: RequestOptions,
  ): Promise<ApiResult<T>> {
    return this.request<T>(url, { ...options, method: "POST", data });
  }

  public put<T>(
    url: string,
    data?: Record<string, unknown> | FormData | string | File | Blob,
    options?: RequestOptions,
  ): Promise<ApiResult<T>> {
    return this.request<T>(url, { ...options, method: "PUT", data });
  }

  public del<T>(url: string, options?: RequestOptions): Promise<ApiResult<T>> {
    return this.request<T>(url, { ...options, method: "DELETE" });
  }
}

export const client = Object.freeze(new HttpClient());
