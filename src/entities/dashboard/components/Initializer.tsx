import { SuspenseFallback } from "@components/SuspenseFallback";
import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import { useAnnounceErrors } from "@utils/use-announce-errors";
import { useIsInitialFetch } from "@utils/use-is-initial-fetch";
import { useEffect } from "react";
import { dashboardQueryKeys } from "../constants.ts";
import { useDashboardQuery } from "../queries.ts";
import { dashboardPermissionsStore, dashboardProfileStore } from "../stores.ts";
import type { DashboardData } from "../types.ts";

export const Initializer: React.FC<React.PropsWithChildren> = props => {
  const { children } = props;

  const queryResult = useDashboardQuery({});

  const qc = useQueryClient();

  const { error } = queryResult;

  useAnnounceErrors([error]);

  const isInitialFetch = useIsInitialFetch(queryResult);

  /**
   * Sync dashboard query data to global stores.
   * This effect subscribes to query cache updates and automatically
   * populates `Dashboard.stores` when data changes.
   *
   * This pattern allows:
   * - Single source of truth (React Query cache)
   * - Global access to dashboard data without prop drilling
   * - Automatic updates when query refetches
   */
  useEffect(() => {
    const unsubscribe = qc.getQueryCache().subscribe(event => {
      const initQueryKey = dashboardQueryKeys.init({});

      const queryKey = event.query.queryKey as QueryKey;

      if (
        (event.type === "added" ||
          event.type === "updated" ||
          event.type === "observerAdded" ||
          event.type === "observerResultsUpdated" ||
          event.type === "observerOptionsUpdated") &&
        queryKey.join(",") === initQueryKey.join(",")
      ) {
        const data = event.query.state.data as DashboardData | undefined;

        if (data) {
          const { permissions, profile } = data.user;

          // Update dashboard stores with fresh data
          void Promise.all([
            dashboardProfileStore.setValue(profile),
            dashboardPermissionsStore.setValue(permissions),
          ]);
        } else {
          // Reset stores when data is cleared
          void Promise.all([
            dashboardProfileStore.reset(),
            dashboardPermissionsStore.reset(),
          ]);
        }
      }
    });

    return unsubscribe;
  }, [qc]);

  if (isInitialFetch) return <SuspenseFallback />;

  return <>{children}</>;
};
