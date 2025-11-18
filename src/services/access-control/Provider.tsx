import { Dashboard } from "@entities/dashboard";
import { useCallback, useMemo, type ReactNode } from "react";
import { AccessControlContext } from "./Context.ts";
import type { AccessControlContextValue } from "./types.ts";

export type AccessControlProviderProps = {
  children: ReactNode;
};

export const AccessControlProvider: React.FC<
  AccessControlProviderProps
> = props => {
  const { children } = props;

  const permissions = Dashboard.hooks.usePermissions();

  const hasPermission: AccessControlContextValue["hasPermission"] = useCallback(
    (permission): boolean => {
      return permissions?.some(p => p === permission) ?? false;
    },
    [permissions],
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
        permissions,
        hasPermission,
        hasAnyPermission,
      }) satisfies AccessControlContextValue,
    [permissions, hasPermission, hasAnyPermission],
  );

  return (
    <AccessControlContext.Provider value={context}>
      {children}
    </AccessControlContext.Provider>
  );
};
