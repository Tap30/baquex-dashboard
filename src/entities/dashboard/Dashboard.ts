import { Initializer } from "./components/index.internal.ts";
import { dashboardQueryKeys } from "./constants.ts";
import { useDashboardQuery } from "./queries.ts";
import {
  dashboardPermissionsStore,
  dashboardProfileStore,
  usePermissions,
  useUserProfile,
} from "./stores.ts";

/**
 * Dashboard entity - manages user profile, permissions, and initialization.
 *
 * Usage:
 * - Wrap app with `Dashboard.components.Initializer` to fetch and sync data
 * - Access data in components via `Dashboard.hooks` (i.e. `useUserProfile`, `usePermissions`)
 * - Stores are automatically synced when query cache updates
 */
export class Dashboard {
  /**
   * Query hooks for fetching dashboard data.
   */
  public static queries = {
    useDashboardQuery,
  };

  /**
   * Query keys for cache management.
   */
  public static queryKeys = dashboardQueryKeys;

  /**
   * Hooks for accessing dashboard data in components.
   */
  public static hooks = {
    usePermissions,
    useUserProfile,
  };

  /**
   * Global stores.
   */
  public static stores = {
    permissions: dashboardPermissionsStore,
    profile: dashboardProfileStore,
  };

  /**
   * Dashboard-related components.
   */
  public static components = {
    Initializer,
  };
}
