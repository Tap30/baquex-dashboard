import type { AuthenticatedUser } from "@services/auth";

export type Permission = "dashboard:view";

export type AccessControlUser = Pick<
  AuthenticatedUser,
  "email" | "id" | "name"
> & {
  permissions: [Permission, ...Permission[]];
};

export type AccessControlContextValue = {
  user: AccessControlUser | null;
  hasPermission: (action: Permission) => boolean;
  hasAnyPermission: (actions: Permission[]) => boolean;
};
