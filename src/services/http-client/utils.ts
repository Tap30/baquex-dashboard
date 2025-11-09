import type { ApiError } from "./types.ts";

export const isApiError = (error: unknown): error is ApiError => {
  return (
    !!error &&
    typeof error === "object" &&
    "success" in error &&
    (error as ApiError).success === false &&
    "message" in error &&
    typeof (error as ApiError).message === "string"
  );
};

export const createApiError = (error: unknown): ApiError => {
  // If the error is already a standardized ApiError, return it directly.
  if (isApiError(error)) return error;

  // Handle Fetch API's Response object for non-ok status.
  if (error instanceof Response) {
    return {
      success: false,
      message: `HTTP error! Status: ${error.status}`,
      status: error.status,
      statusText: error.statusText,
      error,
    };
  }

  // Handle standard JavaScript Error objects.
  if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
      error,
    };
  }

  // Handle cases where the error is a string.
  if (typeof error === "string") {
    return {
      success: false,
      message: error,
      error,
    };
  }

  // Handle generic unknown error types.
  return {
    success: false,
    message: "An unknown error occurred.",
    error,
  };
};
