import { defineQueryKeys } from "@utils/define-query-keys";
import type { InitDashboardInput } from "./types.ts";

export const dashboardQueryKeys = defineQueryKeys("/dashboard", {
  init: (params: InitDashboardInput) => [
    Object.entries(params)
      .map(([k, v]) => k + String(v))
      .join("-"),
  ],
});
