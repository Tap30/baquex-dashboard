import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";

const config: QueryClientConfig = {};

export const queryClient = new QueryClient(config);
