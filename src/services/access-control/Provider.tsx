import { useAuth } from "@services/auth";
import { useCallback, useMemo, type ReactNode } from "react";
import { PERMISSIONS } from "./constants.ts";
import { AccessControlContext } from "./Context.ts";
import type { AccessControlContextValue, AccessControlUser } from "./types.ts";

export type AccessControlProviderProps = {
  children: ReactNode;
};

export const AccessControlProvider: React.FC<
  AccessControlProviderProps
> = props => {
  const { children } = props;

  const { user: authUser, isAuthenticated } = useAuth();

  const accessControlUser = useMemo(() => {
    if (!isAuthenticated || !authUser) return null;

    return {
      id: authUser.id,
      email: authUser.email,
      name: authUser.name,
      permissions: PERMISSIONS,
    } satisfies AccessControlUser;
  }, [authUser, isAuthenticated]);

  const hasPermission: AccessControlContextValue["hasPermission"] = useCallback(
    (permission): boolean => {
      return (
        accessControlUser?.permissions?.some(p => p === permission) ?? false
      );
    },
    [accessControlUser],
  );

  const hasAnyPermission: AccessControlContextValue["hasAnyPermission"] =
    useCallback(
      (permissions): boolean => {
        return permissions.some(permission => hasPermission(permission));
      },
      [hasPermission],
    );

  const context: AccessControlContextValue = useMemo(
    () =>
      ({
        user: accessControlUser,
        hasPermission,
        hasAnyPermission,
      }) satisfies AccessControlContextValue,
    [accessControlUser, hasPermission, hasAnyPermission],
  );

  return (
    <AccessControlContext.Provider value={context}>
      {children}
    </AccessControlContext.Provider>
  );
};
