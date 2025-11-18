import { strings } from "@static-content";
import { defineQueryKeys } from "@utils/define-query-keys";
import type {
  DashboardUserPermission,
  DashboardUserProfile,
  InitDashboardInput,
} from "./types.ts";

export const dashboardQueryKeys = defineQueryKeys("/dashboard", {
  init: (params: InitDashboardInput) => [
    Object.entries(params)
      .map(([k, v]) => k + String(v))
      .join("-"),
  ],
});

export const DASHBOARD_USER_PROFILE_INIT: DashboardUserProfile = {
  name: strings.unknownUser,
  id: "UNSPECIFIED",
  email: "unknown@baquex.com",
};

export const DASHBOARD_USER_PERMISSIONS_INIT: DashboardUserPermission[] = [
  "dashboard:view",
];
