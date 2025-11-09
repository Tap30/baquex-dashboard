import type { UseQueryResult } from "@tanstack/react-query";
import { useRef } from "react";

export const useIsInitialFetch = (
  queryResult: UseQueryResult<unknown, Error>,
) => {
  const { isLoading, isSuccess, isError } = queryResult;
  const hasCompletedRef = useRef(false);

  if (!hasCompletedRef.current && (isSuccess || isError)) {
    hasCompletedRef.current = true;
  }

  return isLoading && !hasCompletedRef.current;
};
