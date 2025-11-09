import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";

const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
      gcTime: 1 * 60 * 1000,
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  },
};

export const queryClient = new QueryClient(config);
