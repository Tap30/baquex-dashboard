import type { DashboardUserPermission } from "@entities/dashboard";

export type Permission = DashboardUserPermission;

export type AccessControlContextValue = {
  permissions: Permission[];
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
};
