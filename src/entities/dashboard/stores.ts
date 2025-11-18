import { Container, useValue } from "react-containerized-state";
import {
  DASHBOARD_USER_PERMISSIONS_INIT,
  DASHBOARD_USER_PROFILE_INIT,
} from "./constants.ts";
import type { DashboardUserPermission, DashboardUserProfile } from "./types.ts";

export const dashboardPermissionsStore = Container.create<
  DashboardUserPermission[]
>(DASHBOARD_USER_PERMISSIONS_INIT);

export const dashboardProfileStore = Container.create<DashboardUserProfile>(
  DASHBOARD_USER_PROFILE_INIT,
);

export const useUserProfile = (): DashboardUserProfile => {
  return useValue(dashboardProfileStore);
};

export const usePermissions = (): DashboardUserPermission[] => {
  return useValue(dashboardPermissionsStore);
};
