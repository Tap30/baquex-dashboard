import { useQuery } from "@tanstack/react-query";
import type { UseDomainQuery } from "@types";
import {
  DASHBOARD_USER_PERMISSIONS_INIT,
  DASHBOARD_USER_PROFILE_INIT,
  dashboardQueryKeys,
} from "./constants.ts";
import type { InitDashboardInput, InitDashboardOutput } from "./types.ts";

/**
 * Query hook for initializing dashboard data.
 * Used by `Dashboard.components.Initializer` to fetch all required data in parallel.
 *
 * @param params Dashboard initialization parameters
 * @param options React Query options
 *
 * @returns Query result with user profile and permissions
 */
export const useDashboardQuery: UseDomainQuery<
  InitDashboardInput,
  InitDashboardOutput
> = (params, options) => {
  const queryResult = useQuery({
    ...(options ?? {}),
    queryKey: dashboardQueryKeys.init(params),

    // Preserve previous data during refetch to prevent UI flicker
    placeholderData: prevData => prevData,

    queryFn: async () => {
      // TODO: Replace with actual API calls for dashboard initialization
      // Fetch all required data in parallel using `Promise.all()`
      // Must include user profile and permissions in the result

      return await Promise.resolve({
        user: {
          profile: DASHBOARD_USER_PROFILE_INIT,
          permissions: DASHBOARD_USER_PERMISSIONS_INIT,
        },
      } satisfies InitDashboardOutput);
    },
  });

  return queryResult;
};
