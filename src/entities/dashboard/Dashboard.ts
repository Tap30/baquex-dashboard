import { dashboardQueryKeys } from "./constants.ts";
import { useDashboardQuery } from "./queries.ts";

export class Dashboard {
  public static queries = {
    useDashboardQuery,
  };

  public static queryKeys = {
    dashboardQueryKeys,
  };
}
