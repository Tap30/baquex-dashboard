import { useQuery } from "@tanstack/react-query";
import type { UseDomainQuery } from "@types";
import { dashboardQueryKeys } from "./constants.ts";
import type { InitDashboardInput, InitDashboardOutput } from "./types.ts";

export const useDashboardQuery: UseDomainQuery<
  InitDashboardInput,
  InitDashboardOutput
> = (params, options) => {
  const queryResult = useQuery({
    ...(options ?? {}),
    queryKey: dashboardQueryKeys.init(params),
    placeholderData: prevData => prevData,
    queryFn: async () => {
      return await Promise.resolve({});
    },
  });

  return queryResult;
};
